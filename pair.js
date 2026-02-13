// router.js — DARK_MD-146 Pair Site Updated
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const { Storage } = require("megajs");
const {
    default: DARK_Tech,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("@whiskeysockets/baileys");

// === Custom ID generator (using your name) ===
function darkId(length = 4) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return `xdarkprince146_${result}`; // custom prefix + random chars
}

// Upload session to Mega
async function uploadCredsToMega(credsPath) {
    try {
        const storage = await new Storage({
            email: 'darkmd146@gmail.com',
            password: 'darkmd146xdarkrajpoot'
        }).ready;

        if (!fs.existsSync(credsPath)) throw new Error(`File not found: ${credsPath}`);

        const fileSize = fs.statSync(credsPath).size;
        const uploadResult = await storage.upload({
            name: `${darkId()}.json`,
            size: fileSize
        }, fs.createReadStream(credsPath)).complete;

        const fileNode = storage.files[uploadResult.nodeId];
        const megaUrl = await fileNode.link();
        return megaUrl;
    } catch (error) {
        console.error('Error uploading to Mega:', error);
        throw error;
    }
}

// Remove a file
function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

// Router — generate pairing code
router.get('/', async (req, res) => {
    const id = darkId(); // use custom ID everywhere
    let num = req.query.number;

    async function DARK_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);

        try {
            let DARK = DARK_Tech({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: Browsers.macOS("Safari")
            });

            if (!DARK.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await DARK.requestPairingCode(num);
                console.log(`Your Code: ${code}`);
                if (!res.headersSent) res.send({ code });
            }

            DARK.ev.on('creds.update', saveCreds);

            DARK.ev.on("connection.update", async (s) => {
                const { connection, lastDisconnect } = s;

                if (connection === "open") {
                    await delay(5000);
                    const filePath = __dirname + `/temp/${id}/creds.json`;
                    if (!fs.existsSync(filePath)) return console.error("File not found:", filePath);

                    const megaUrl = await uploadCredsToMega(filePath);
                    const sid = megaUrl.includes("https://mega.nz/file/")
                        ? 'DARK-MD~' + megaUrl.split("https://mega.nz/file/")[1]
                        : 'Error: Invalid URL';

                    console.log(`Session ID: ${sid}`);

                    const session = await DARK.sendMessage(DARK.user.id, { text: sid });

                    const DARK_TEXT = `
🎀 *Welcome to DARK_MD-146!* 🖤 

🔒 *Your Session ID* is ready! Keep it private and secure.  

🔑 *Copy & Paste the SESSION_ID Above* into your environment variable: *SESSION_ID*  

💡 Enjoy WhatsApp automation! 🤖  

🔗 *Support Channel:* [Click Here](https://whatsapp.com/channel/0029VbC1YPcBPzjPQpndDO0Z)  

⭐ *GitHub:* [☠︎︎𓆩ᴰᵃʳᴋ᭄🖤𓆩𝗥𝗔𝗝𝗣𝗢𝗢𝗧¹⁴⁶࿐](https://github.com/xdarkprince146/)`;

                    await DARK.sendMessage(DARK.user.id, { text: DARK_TEXT }, { quoted: session });

                    await delay(100);
                    await DARK.ws.close();
                    return removeFile('./temp/' + id);
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode !== 401) {
                    await delay(10000);
                    DARK_PAIR_CODE();
                }
            });
        } catch (err) {
            console.error("Service Has Been Restarted:", err);
            removeFile('./temp/' + id);
            if (!res.headersSent) res.send({ code: "Service is Currently Unavailable" });
        }
    }

    await DARK_PAIR_CODE();
});

module.exports = router;
