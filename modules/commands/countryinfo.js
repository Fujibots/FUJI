const axios = require("axios");

module.exports.config = {
  name: "countryinfo",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Clark",
  description: "Get information about a country",
  commandCategory: "information",
  usePrefix: false,
  usages: "[country name]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  if (!args[0]) {
    api.sendMessage("ℹ️ | 𝖪𝗂𝗇𝖽𝗅𝗒 𝗉𝗋𝗈𝗏𝗂𝖽𝖾 𝖺 𝖼𝗈𝗎𝗇𝗍𝗋𝗒 𝗇𝖺𝗆𝖾.", event.threadID, event.messageID);
    return;
  }

  const countryName = encodeURIComponent(args.join(" "));
  const apiEndpoint = `https://restcountries.com/v3.1/name/${countryName}`;

  try {
    const response = await axios.get(apiEndpoint);
    const countryData = response.data;

    if (!countryData.length) {
      api.sendMessage(`❎ | 𝖭𝗈 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇 𝖿𝗈𝗎𝗇𝖽 𝖿𝗈𝗋 𝗍𝗁𝖾 𝖼𝗈𝗎𝗇𝗍𝗋𝗒 "${args.join(" ")}".`, event.threadID, event.messageID);
      return;
    }

    const countryInfo = countryData[0];
    const name = countryInfo.name.common;
    const officialName = countryInfo.name.official;
    const capital = countryInfo.capital?.[0];
    const region = countryInfo.region;
    const population = countryInfo.population;
    const languages = Object.values(countryInfo.languages).join(", ");
    const timezones = countryInfo.timezones.join(", ");
    const continents = countryInfo.continents.join(", ");
    const googleMaps = countryInfo.maps.googleMaps;
    const openStreetMaps = countryInfo.maps.openStreetMaps;
    const flagsPNG = countryInfo.flags.png;
    const flagsSVG = countryInfo.flags.svg;

    const message = `🌟 𝗙𝗨𝗝𝗜 𝗔𝗜 𝗣𝗥𝗢𝗝𝗘𝗖𝗧\n\n
𝗖𝗢𝗨𝗡𝗧𝗥𝗬: ${name} (${officialName})\n𝗖𝗔𝗣𝗜𝗧𝗔𝗟: ${capital || "N/A"}\n𝗥𝗘𝗚𝗜𝗢𝗡: ${region}\n𝗣𝗢𝗣𝗨𝗟𝗔𝗧𝗜𝗢𝗡: ${population}\n𝗟𝗔𝗡𝗚𝗨𝗔𝗚𝗘𝗦: ${languages}\n𝗧𝗜𝗠𝗘𝗭𝗢𝗡𝗘𝗦: ${timezones}\n𝗖𝗢𝗡𝗧𝗜𝗡𝗘𝗡𝗧𝗦: ${continents}\n𝗚𝗢𝗢𝗚𝗟𝗘 𝗠𝗔𝗣𝗦: ${googleMaps}\n𝗢𝗣𝗘𝗡𝗦𝗧𝗥𝗘𝗘𝗧 𝗠𝗔𝗣𝗦: ${openStreetMaps}\n\n𝗙𝗟𝗔𝗚𝗦:\n[𝗣𝗡𝗚](${flagsPNG})\n[𝗦𝗩𝗚](${flagsSVG})
    `;

    api.sendMessage(message, event.threadID, event.messageID);
  } catch (error) {
    api.sendMessage("❎ | 𝖠𝗇 𝖾𝗋𝗋𝗈𝗋 𝗈𝖼𝖼𝗎𝗋𝗋𝖾𝖽 𝗐𝗁𝗂𝗅𝖾 𝖿𝖾𝗍𝖼𝗁𝗂𝗇𝗀 𝖼𝗈𝗎𝗇𝗍𝗋𝗒 𝗂𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇. 𝖯𝗅𝖾𝖺𝗌𝖾 𝗍𝗋𝗒 𝖺𝗀𝖺𝗂𝗇 𝗅𝖺𝗍𝖾𝗋.", event.threadID, event.messageID);
    console.error("Restcountries API Error:", error.message);
  }
};
