module.exports.config = {
  name: "upt",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "𝙼𝙰𝚁𝙹𝙷𝚄𝙽 𝙱𝙰𝚈𝙻𝙾𝙽",
  description: "",
  commandCategory: "system",
  usePrefix: false,
  cooldowns: 5,
  dependencies: {
    "pidusage": ""
  }
};

function byte2mb(bytes) {
  const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let l = 0, n = parseInt(bytes, 10) || 0;
  while (n >= 1024 && ++l) n = n / 1024;
  return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}

module.exports.languages = {
  "en": {
    "returnResult": "🌸|•𝙱𝙾𝚃 𝙷𝙰𝚂 𝙱𝙴𝙴𝙽 𝚆𝙾𝚁𝙺𝙸𝙽𝙶 𝙵𝙾𝚁 %1 𝙷𝙾𝚄𝚁(s) %2 𝙼𝙸𝙽𝚄𝚃𝙴(s) %3 𝚂𝙴𝙲𝙾𝙽𝙳𝚂(s).\n\n🌸|•𝚃𝙾𝚃𝙰𝙻 𝚄𝚂𝙰𝙶𝙴: %4\n🌸|•𝚃𝙾𝚃𝙰𝙻 𝚃𝙷𝚁𝙴𝙰𝙳𝚂: %5\n🌸|•𝙲𝙿𝚄 𝚄𝚂𝙰𝙶𝙴: %6%\n🌸|•𝚁𝙰𝙼 𝚄𝚂𝙰𝙶𝙴: %7\n🌸|•𝙿𝙸𝙽𝙶: %8ms"
  }
};

module.exports.run = async ({ api, event, getText }) => {
  const time = process.uptime(),
    hours = Math.floor(time / (60 * 60)),
    minutes = Math.floor((time % (60 * 60)) / 60),
    seconds = Math.floor(time % 60);

  const pidusage = await global.nodemodule["pidusage"](process.pid);

  api.setMessageReaction('🌸', event.messageID, (err) => {
    if (err) {
      console.error('[ERROR]', err);
    }
  }, true);

  const timeStart = Date.now();
  return api.sendMessage("", event.threadID, () => api.sendMessage(getText("returnResult", hours, minutes, seconds, global.data.allUserID.length, global.data.allThreadID.length, pidusage.cpu.toFixed(1), byte2mb(pidusage.memory), Date.now() - timeStart), event.threadID, event.messageID));
};
