const axios = require("axios");
module.exports.config = {
  name: "fuji",
  version: "1.2.0",
  hasPermission: 0,
  credits: "Marjhun Baylon",
  description: "Ask to python ai",
  commandCategory: "ai",
  usePrefix: false,
  usages: "[Ask]",
  cooldowns: 3,
};

let lastQuery = "";

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;

  if (!args[0]) {
    api.sendMessage("𝙿𝙻𝙴𝙰𝚂𝙴 𝙿𝚁𝙾𝚅𝙸𝙳𝙴 𝚀𝚄𝙴𝚂𝚃𝙸𝙾𝙽 𝚃𝙾 𝙱𝙴 𝙰𝙽𝚂𝚆𝙴𝚁𝙴𝙳 \n\n𝙳𝙾𝙽𝚃 𝙵𝙾𝚁𝙶𝙴𝚃 𝚃𝙾 𝙵𝙾𝙻𝙻𝙾𝚆 𝙼𝚈 𝙳𝙴𝚅𝙴𝙻𝙾𝙿𝙴𝚁 : https://www.facebook.com/zcoded221\n\n", threadID, messageID);
    return;
  }

  const query = args.join(" ");

  if (query === lastQuery) {
    api.sendMessage("🌸 𝗬𝗢𝗨𝗥 𝗤𝗨𝗘𝗦𝗧𝗜𝗢𝗡 𝗜𝗦 𝗗𝗢𝗡𝗘 𝗧𝗢 𝗔𝗡𝗦𝗪𝗘𝗥 𝗣𝗟𝗘𝗔𝗦𝗘 𝗕𝗔𝗖𝗞 𝗥𝗘𝗔𝗗 🌸", threadID, messageID);
    return;
  } else {
    lastQuery = query;
  }

  api.sendMessage("🌸 𝙶𝙴𝙽𝙴𝚁𝙰𝚃𝙸𝙽𝙶 𝙰𝙽𝚂𝚆𝙴𝚁 𝙿𝙻𝙴𝙰𝚂𝙴 𝚆𝙰𝙸𝚃. 🌸 \n\n\n 𝚆𝙷𝙸𝙻𝙴 𝚆𝙰𝙸𝚃𝙸𝙽𝙶 𝚅𝙸𝚂𝙸𝚃 𝙼𝚈 𝙳𝙴𝚅𝙴𝙻𝙾𝙿𝙴𝚁 𝙵𝙱 : https://www.facebook.com/zcoded221", threadID, messageID);

  try {
    const response = await axios.get(`https://hazeyy-api-blackbox.kyrinwu.repl.co/ask?q=${encodeURIComponent(query)}`);

    if (response.status === 200 && response.data && response.data.message) {
      const answer = response.data.message;
      const formattedAnswer = formatFont(answer); // Apply font formatting
      api.sendMessage(formattedAnswer, threadID, messageID);
    } else {
      api.sendMessage("❎ | 𝖲𝗈𝗋𝗋𝗒, 𝖻𝗎𝗍 𝗇𝗈 𝗋𝖾𝗅𝖾𝗏𝖺𝗇𝗍 𝖺𝗇𝗌𝗐𝖾𝗋𝗌 𝖿𝗈𝗎𝗇𝖽..", threadID, messageID);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage("❎ | 𝖲𝗈𝗋𝗋𝗒, 𝖻𝗎𝗍 𝖺𝗇 𝗎𝗇𝖾𝗑𝗉𝖾𝖼𝗍𝖾𝖽 𝖾𝗋𝗋𝗈𝗋 𝗐𝗁𝗂𝗅𝖾 𝗌𝖾𝖺𝗋𝖼𝗁𝗂𝗇𝗀 𝖺𝗇𝗌𝗐𝖾𝗋...", threadID, messageID);
    return;
  }
};

function formatFont(text) {
    const fontMapping = {
    a: "𝚊",
    b: "𝚋",
    c: "𝚌",
    d: "𝚍",
    e: "𝚎",
    f: "𝚏",
    g: "𝚐",
    h: "𝚑",
    i: "𝚒",
    j: "𝚓",
    k: "𝚔",
    l: "𝚕",
    m: "𝚖",
    n: "𝚗",
    o: "𝚘",
    p: "𝚙",
    q: "𝚚",
    r: "𝚛",
    s: "𝚜",
    t: "𝚝",
    u: "𝚞",
    v: "𝚟",
    w: "𝚠",
    x: "𝚡",
    y: "𝚢",
    z: "𝚣",
    A: "𝙰",
    B: "𝙱",
    C: "𝙲",
    D: "𝙳",
    E: "𝙴",
    F: "𝙵",
    G: "𝙶",
    H: "𝙷",
    I: "𝙸",
    J: "𝙹",
    K: "𝙺",
    L: "𝙻",
    M: "𝙼",
    N: "𝙽",
    O: "𝙾",
    P: "𝙿",
    Q: "𝚀",
    R: "𝚁",
    S: "𝚂",
    T: "𝚃",
    U: "𝚄",
    V: "𝚅",
    W: "𝚆",
    X: "𝚇",
    Y: "𝚈",
    Z: "𝚉"
  };

  let formattedText = "";
  for (const char of text) {
    if (char in fontMapping) {
      formattedText += fontMapping[char];
    } else {
      formattedText += char;
    }
  }
  return formattedText;
}
