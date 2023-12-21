const axios = require('axios');
const fs = require('fs-extra');

module.exports.config = {
  name: "remini",
  version: "1.0.",
  hasPermssion: 0,
  credits: "Marjhun Baylon",
  description: "enhance your photo ",
  commandCategory: "filter",
  usePrefix: false,
  usages: "[reply image]",
  cooldowns: 2,
};

module.exports.run = async ({ api, event, args }) => {
  let pathie = __dirname + `/cache/zombie.jpg`;
  const { threadID, messageID } = event;

  var james = event.messageReply.attachments[0].url || args.join(" ");

  try {
    api.sendMessage("⏳ | 𝗀𝖾𝗇𝖾𝗋𝖺𝗍𝗂𝗇𝗀...", threadID, messageID);
    const response = await axios.get(`https://remeni.hayih59124.repl.co/remeni?url=${encodeURIComponent(james)}`);
    const processedImageURL = response.data.image_data;

    const img = (await axios.get(processedImageURL, { responseType: "arraybuffer"})).data;

    fs.writeFileSync(pathie, Buffer.from(img, 'utf-8'));

    api.sendMessage({
      body: "✅ | 𝖧𝖾𝗋𝖾'𝗌 𝗒𝗈𝗎𝗋 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝖾𝖽 𝖨𝗆𝖺𝗀𝖾",
      attachment: fs.createReadStream(pathie)
    }, threadID, () => fs.unlinkSync(pathie), messageID);
  } catch (error) {
    api.sendMessage(`❎ | 𝖤𝗋𝗋𝗈𝗋 𝗉𝗋𝗈𝖼𝖾𝗌𝗌𝗂𝗇𝗀 𝗂𝗆𝖺𝗀𝖾: ${error}`, threadID, messageID);
  };
};