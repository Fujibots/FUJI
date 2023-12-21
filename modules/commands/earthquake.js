const axios = require('axios');

module.exports.config = {
  name: 'earthquake',
  hasPermission: 0,
  version: '1.0.1',
  commandCategory: 'info',
  credits: 'Marjhun Baylon',
  usePrefix: false,
  cooldowns: 15,
  description: 'Get real-time earthquake information',
  usages: '',
};

module.exports.run = async function ({ api, event, args }) {
  const { messageID, threadID } = event;

  const timeRange = args.join(' ').toLowerCase() || 'last hour';

  // Ensure a valid time range is provided
  if (!['past hour', 'past day', 'past month', 'last hour', 'hour', 'now', 'last day', 'day', 'last month', 'month'].includes(timeRange)) {
    api.sendMessage('Invalid time range. Please use: past hour, past day, past month', threadID, messageID);
    return;
  }

  try {
    const apiUrl = `https://replhome.codebox4chan.repl.co/api/geologic?query=${encodeURIComponent(timeRange)}`;
    const response = await axios.get(apiUrl);
    const earthquakeData = response.data.earthquakeData || [];
    const source = response.data.source || 'Trust Me Bro!';

    const earthquakeInfo = earthquakeData.map((quake) => {
      const { mag = 'No Data', place = 'Unknown Location', time } = quake;
      return `𝗠𝗔𝗚𝗡𝗜𝗧𝗨𝗗𝗘: ${mag}\n𝗣𝗟𝗔𝗖𝗘: ${place}\n𝗧𝗜𝗠𝗘: ${formatTime(new Date(time))}\n`;
    });

    const message = earthquakeInfo.length > 0
      ? `𝗥𝗘𝗔𝗟-𝗧𝗜𝗠𝗘 𝗘𝗔𝗥𝗧𝗛𝗤𝗨𝗔𝗞𝗘 𝗗𝗔𝗧𝗔 [${timeRange}]:\n\n${earthquakeInfo.join('\n')}\n\n𝗦𝗢𝗨𝗥𝗖𝗘: ${source}\n\n𝗕𝗔𝗦𝗘𝗗 𝗧𝗜𝗠𝗘 𝗭𝗢𝗡𝗘: PH🇵🇭`
      : `𝗥𝗘𝗔𝗟-𝗧𝗜𝗠𝗘 𝗘𝗔𝗥𝗧𝗛𝗤𝗨𝗔𝗞𝗘 𝗗𝗔𝗧𝗔 [${timeRange}]:\n\nNo earthquake data available at the moment.\n\n𝗦𝗢𝗨𝗥𝗖𝗘: ${source}\n\n𝗕𝗔𝗦𝗘𝗗 𝗧𝗜𝗠𝗘 𝗭𝗢𝗡𝗘: PH🇵🇭`;

    api.sendMessage(message, threadID, messageID);
  } catch (error) {
    console.error('Error fetching earthquake information:', error);
    api.sendMessage('Sorry, there was an error fetching earthquake information.', threadID, messageID);
  }
};

function formatTime(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${ampm}`;
}
