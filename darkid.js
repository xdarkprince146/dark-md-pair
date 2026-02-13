// Function to generate random code with your username + full fancy name
function darkid(num = 8) {
  let result = "";
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;

  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  // Format: Username + Fancy Full Name + Random Code
  return `xdarkprince146-☠︎︎𓆩ᴰᵃʳᴷ᭄🖤𓆩𝗥𝗔𝗝𝗣𝗢𝗢𝗧¹⁴⁶࿐-${result}`;
}

module.exports = { darkid };
