const axios = require('axios');
const xml2js = require('xml2js');

module.exports.config = {
  name: 'arxiv',
  version: '1.0.0',
  hasPermssion: 0,
  credits: 'Marjhun Baylon',
  description: 'Search for research articles on Arxiv.',
  commandCategory: 'searches',
  usePrefix: false,
  usages: '[query]',
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const query = args.join(' ');

  if (!query) {
    api.sendMessage('ℹ️ | 𝖯𝗅𝖾𝖺𝗌𝖾 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝗌𝖾𝖺𝗋𝖼𝗁 𝗊𝗎𝖾𝗋𝗒 𝖿𝗈𝗋 𝖠𝗋𝗑𝗂𝗏.', threadID, messageID);
    return;
  }

  try {
    const response = await axios.get(`http://export.arxiv.org/api/query?search_query=all:${encodeURIComponent(query)}`);
    const xmlData = response.data;

    const parser = new xml2js.Parser();
    parser.parseString(xmlData, (error, result) => {
      if (error) {
        api.sendMessage('❎ | 𝖲𝗈𝗋𝗋𝗒, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝗉𝖺𝗋𝗌𝗂𝗇𝗀 𝖠𝗋𝗑𝗂𝗏 𝖽𝖺𝗍𝖺.', threadID, messageID);
        console.error(error);
        return;
      }

      const entries = result.feed.entry;

      if (!entries || entries.length === 0) {
        api.sendMessage('❎ | 𝖲𝗈𝗋𝗋𝗒, 𝖻𝗎𝗍 𝗇𝗈 𝗋𝖾𝗌𝖾𝖺𝗋𝖼𝗁 𝖺𝗋𝗍𝗂𝖼𝗅𝖾𝗌 𝖿𝗈𝗎𝗇𝖽 𝗈𝗇 𝖠𝗋𝗑𝗂𝗏 𝖿𝗈𝗋 𝗍𝗁𝖾 𝗀𝗂𝗏𝖾𝗇 𝗊𝗎𝖾𝗋𝗒.', threadID, messageID);
        return;
      }

      const article = entries[0];
      const title = article.title[0];
      const summary = article.summary[0];
      const authors = article.author.map((author) => author.name[0]);
      const published = article.published[0];

      const responseMessage = `📚 | 𝗔𝗿𝘅𝗶𝘃 𝗥𝗲𝘀𝗲𝗮𝗿𝗰𝗵 𝗔𝗿𝘁𝗶𝗰𝗹𝗲\n\n📝 | 𝗧𝗶𝘁𝗹𝗲: ${title}\n\n👥 | 𝗔𝘂𝘁𝗵𝗼𝗿𝘀: ${authors.join(', ')}\n\n🗓️ | 𝗣𝘂𝗯𝗹𝗶𝘀𝗵𝗲𝗱 𝗗𝗮𝘁𝗲: ${published}\n\n📖 | 𝗦𝘂𝗺𝗺𝗮𝗿𝘆: ${summary}`;

      api.sendMessage(responseMessage, threadID, messageID);
    });
  } catch (error) {
    console.error(error);
    api.sendMessage('❎ | 𝖲𝗈𝗋𝗋𝗒, 𝖻𝗎𝗍 𝖺𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖠𝗋𝗑𝗂𝗏 𝖽𝖺𝗍𝖺.', threadID, messageID);
  }
};