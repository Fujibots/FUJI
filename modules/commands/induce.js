const axios = require('axios');

module.exports.config = {
  name: 'induce',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Clark',
  description: 'Get content based on a number.',
  commandCategory: 'information',
  usePrefix: false,
  usages: '[number]',
  cooldowns: 5,
};

const tBold = {
    A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜",
    J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥",
    S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭", a: "𝗔", b: "𝗕", c: "𝗖", d: "𝗗", e: "𝗘", f: "𝗙", g: "𝗚", h: "𝗛", i: "𝗜",
    j: "𝗝", k: "𝗞", l: "𝗟", m: "𝗠", n: "𝗡", o: "𝗢", p: "𝗣", q: "𝗤", r: "𝗥",
    s: "𝗦", t: "𝗧", u: "𝗨", v: "𝗩", w: "𝗪", x: "𝗫", y: "𝗬", z: "𝗭",
    " ": " "
};

const typewriter = {
    a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒",
    j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖", n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛",
    s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
    A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸",
    J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼", N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁",
    S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉",
    " ": " "
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const number = parseInt(args[0]);

  if (!args[0]) {
    api.sendMessage('🌟 | 𝗜𝗡𝗧𝗥𝗢𝗗𝗨𝗖𝗧𝗜𝗢𝗡\n\n𝖨𝗇𝖽𝗎𝖼𝖾 𝗂𝗌 𝖺 𝖼𝗈𝗆𝗆𝖺𝗇𝖽 𝗍𝗁𝖺𝗍 𝖼𝖺𝗇 𝖻𝖾 𝗎𝗌𝖾𝖽 𝗍𝗈 𝗆𝗈𝗍𝗂𝗏𝖺𝗍𝖾 𝗒𝗈𝗎𝗋𝗌𝖾𝗅𝖿 𝗈𝗋 𝗈𝗍𝗁𝖾𝗋𝗌. 𝖨𝗍 𝗍𝖺𝗄𝖾𝗌 𝖺 𝗇𝗎𝗆𝖻𝖾𝗋 𝖻𝖾𝗍𝗐𝖾𝖾𝗇 𝟣 𝖺𝗇𝖽 𝟣𝟢𝟢 𝖺𝗌 𝗂𝗇𝗉𝗎𝗍.\n\n𝖳𝗈 𝗎𝗌𝖾 𝖨𝗇𝖽𝗎𝖼𝖾, 𝗌𝗂𝗆𝗉𝗅𝗒 𝗍𝗒𝗉𝖾 [𝖨𝗇𝖽𝗎𝖼𝖾 [𝗇𝗎𝗆𝖻𝖾𝗋]. 𝖥𝗈𝗋 𝖾𝗑𝖺𝗆𝗉𝗅𝖾, [𝖨𝗇𝖽𝗎𝖼𝖾 𝟨𝟢].', threadID, messageID);
    return;
  }

  if (isNaN(number) || number < 1 || number > 100) {
    api.sendMessage('❎ | 𝖲𝗈𝗋𝗋𝗒, 𝗍𝗁𝖺𝗍 𝗂𝗌 𝗂𝗇𝗏𝖺𝗅𝗂𝖽 𝗂𝗇𝗉𝗎𝗍. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗇𝗎𝗆𝖻𝖾𝗋 𝖻𝖾𝗍𝗐𝖾𝖾𝗇 𝟣 𝖺𝗇𝖽 𝟣𝟢𝟢.', threadID, messageID);
    return;
  }

  try {
    const response = await axios.get('https://raw.githubusercontent.com/Augustquinn/JSONify/main/Induce.json');
    const data = response.data.induce[number];

    if (data) {
      const { title, content } = data;
      const formattedTitle = title.split('').map(char => tBold[char] || char).join('');
      const formattedContent = content.split('').map(char => typewriter[char] || char).join('');

      const message = `✨ | 𝗧𝗜𝗧𝗟𝗘: ${formattedTitle}\n\n – ${formattedContent}`;
      api.sendMessage(message, threadID, messageID);
    } else {
      api.sendMessage('❎ | 𝖲𝗈𝗋𝗋𝗒, 𝖻𝗎𝗍 𝗍𝗁𝖾 𝖾𝗇𝗍𝗋𝗒 𝗇𝗈𝗍 𝖿𝗈𝗎𝗇𝖽. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗏𝖺𝗅𝗂𝖽 𝗇𝗎𝗆𝖻𝖾𝗋.', threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage('❎ | 𝖲𝗈𝗋𝗋𝗒, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖽𝖺𝗍𝖺.', threadID, messageID);
  }
};