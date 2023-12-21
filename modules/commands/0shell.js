module.exports.config = {
  name: "shell",
  version: "7.3.1",
  hasPermssion: 0,
  credits: "𝙼𝙰𝚁𝙹𝙷𝚄𝙽 𝙱𝙰𝚈𝙻𝙾𝙽",
  description: "running shell",
  usePrefix: false,
  commandCategory: "System",
  usages: "[shell]",
  cooldowns: 0,
  dependencies: {
    "child_process": ""
  }
};
module.exports.run = async function({ api, event, args, Threads, Users, Currencies, models }) {    
const { exec } = require("child_process");
const god = ["100085656551427"];
  if (!god.includes(event.senderID)) 
return api.sendMessage("Look oh may tangang gusto gumamit sakin bobo si Marjhun lang susundin ko pak youu!", event.threadID, event.messageID);
let text = args.join(" ")
exec(`${text}`, (error, stdout, stderr) => {
    if (error) {
        api.sendMessage(`error: \n${error.message}`, event.threadID, event.messageID);
        return;
    }
    if (stderr) {
        api.sendMessage(`stderr:\n ${stderr}`, event.threadID, event.messageID);
        return;
    }
    api.sendMessage(`stdout:\n ${stdout}`, event.threadID, event.messageID);
});
}
