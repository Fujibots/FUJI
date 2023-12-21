const axios = require('axios');
const fs = require('fs');
const { DateTime } = require("luxon");

module.exports.config = {
  name: 'prefix',
  version: '1.0.2',
  hasPermission: 0,
  credits: 'Marjhun Baylon',
  description: 'prefix', 
  usePrefix: false,
  commandCategory: 'system',
  usages: '[Name module]',
  cooldowns: 1,
  envConfig: {
    autoUnsend: true,
    delayUnsend: 20,
    usePrefix: false, 
  },
};

module.exports.run = async function ({ api, event }) {
  const moment = require('moment-timezone');
  const { threadID, messageID, senderID } = event; 
  const threadInfo = await api.getThreadInfo(threadID);
  const threadName = threadInfo.threadName;

  const prefixImageURL = 'https://i.postimg.cc/tgQbFR4M/received-1073519443666560.gif';
  const prefixImage = await axios.get(prefixImageURL, { responseType: 'arraybuffer' });

  fs.writeFileSync('prefix.gif', Buffer.from(prefixImage.data));
  const name = (await api.getUserInfo(senderID))[senderID].name; 
  api.setMessageReaction('🌸', messageID, (err) => {
    if (err) console.error('[ERROR]', err);
  }, true); 

  const formattedThu = moment.tz('Asia/Manila').format('dddd');
  const manilaTime = DateTime.now().setZone("Asia/Manila").toFormat("yyyy-MM-dd hh:mm:ss a");
  const { commands } = global.client;

  const msg = `@${name}  ʏᴏᴜʀ ʀᴇǫᴜᴇsᴛ ᴘʀᴇғɪx ɪs ʜᴇʀᴇ
🌸━━━━━━━━━━━━━━━━━🌸

➥ 🌸|• ɢᴄ ɴᴀᴍᴇ : ${threadName}\n➥ 🌸|• ᴄᴏᴍᴍᴀɴᴅs : ${commands.size}\n➥ 🌸|• ᴘʀᴇғɪx : ${global.config.PREFIX}\n➥ 🌸|• ᴅᴀᴛᴇ ɴᴏᴡ : ${formattedThu}\n➥ 🌸|•ᴄᴏᴍᴍᴀɴᴅ ᴇxᴇᴄᴜᴛᴇᴅ ᴛɪᴍᴇ : ${manilaTime}

🌸━━━━━━━━━━━━━━━━━🌸`;

  api.sendMessage(
    {
      attachment: fs.createReadStream('prefix.gif'),
      body: msg,
      mentions: [
        {
          tag: `@${name}`, 
          id: senderID,
        },
      ],
    },
    threadID,
    event.messageID
  ).catch((error) => {
    console.log(error);
  });
}
