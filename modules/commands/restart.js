module.exports.config = {
	name: "res",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "𝙼𝙰𝚁𝙹𝙷𝚄𝙽 𝙱𝙰𝚈𝙻𝙾𝙽",
	description: "Restart Bot",
  usePrefix: false,
	commandCategory: "system",
	usages: "",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
	const { threadID, messageID } = event;
	return api.sendMessage(`${global.config.BOTNAME}ʙᴏᴛ ᴡɪʟʟ ʀᴇsᴛᴀʀᴛ ᴛʜᴇsᴇ ᴡɪʟʟ ᴛᴀᴋᴇ ғᴇᴡ ᴍɪɴᴜᴛᴇs/sᴇᴄᴏɴᴅs`, threadID, () => process.exit(1));
}