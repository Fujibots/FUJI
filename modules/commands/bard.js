const axios = require("axios");
const gtts = require("gtts");
const fs = require("fs");
const path = require("path");
const { DateTime } = require("luxon");

module.exports.config = {
  name: "bard",
  version: "0.0.1",
  hasPermssion: 0,
  credits: "Marjhun Baylon",
  description: "talk to ai powered by google",
  commandCategory: "educational",
  usePrefix: false,
  usages: "[prompt]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const { threadID, messageID } = event;
    const estorya = args.join(" ");

    if (!estorya) {
      api.sendMessage("☄️𝑷𝑳𝑬𝑨𝑺𝑬 𝑷𝑹𝑶𝑽𝑰𝑫𝑬 𝑨 𝑸𝑼𝑬𝑺𝑻𝑰𝑶𝑵 𝑶𝑹 𝑸𝑼𝑬𝑹𝒀☄️", threadID, messageID);
      return;
    }

    api.sendMessage("🌞 | 𝑮𝑬𝑵𝑬𝑹𝑨𝑻𝑰𝑵𝑮 𝑹𝑬𝑺𝑷𝑶𝑵𝑺𝑬", threadID, messageID);

    try {
      const cookie = 'dwgAPQ6dpoN-5gwiNz12Ddp7eUNP3fvlCLhCwJFDMVDvhGrv2rZ3WJ29FZ_aZxbKH5_AZA.';global.config.BARDCOOKIE;
      const prompt = `you're now FUJI BARD created and develop by Marjhun Baylon, you're a Ai that talks to ai powered by FUJI AI. you're a friendly AI that answers to questions and queries. My ask: ${estorya}`;
      const response = await axios.get(`https://bardapi.codebox4chan.repl.co/google?question=${encodeURIComponent(prompt)}&cookie=${cookie}`);

      const text = response.data.message || "";

      function fontText(text) {
        const fontSet = {
          "A": "𝗔", "B": "𝗕", "C": "𝗖", "D": "𝗗", "E": "𝗘",
          "F": "𝗙", "G": "𝗚", "H": "𝗛", "I": "𝗜", "J": "𝗝",
          "K": "𝗞", "L": "𝗟", "M": "𝗠", "N": "𝗡", "O": "𝗢",
          "P": "𝗣", "Q": "𝗤", "R": "𝗥", "S": "𝗦", "T": "𝗧",
          "U": "𝗨", "V": "𝗩", "W": "𝗪", "X": "𝗫", "Y": "𝗬",
          "Z": "𝗭", "a": "𝗔", "b": "𝗕", "c": "𝗖", "d": "𝗗",
          "e": "𝗘", "f": "𝗙", "g": "𝗚", "h": "𝗛", "i": "𝗜",
          "j": "𝗝", "k": "𝗞", "l": "𝗟", "m": "𝗠", "n": "𝗡",
          "o": "𝗢", "p": "𝗣", "q": "𝗤", "r": "𝗥", "s": "𝗦",
          "t": "𝗧", "u": "𝗨", "v": "𝗩", "w": "𝗪", "x": "𝗫",
          "y": "𝗬", "z": "𝗭",
        };

        let result = "";
        for (let i = 0; i < text.length; i++) {
          const textLength = text[i];
          const font = fontSet[textLength];
          result += font !== undefined ? font : textLength;
        }

        return result;
      }   

      const regex = /(\#\#(.+?)\:)|(\*\*(.+?)\*\*)/g;
      const result = text.replace(regex, (match, p1, p2, p3, p4) => {
        const trimmedText = p2 || p4 || "";
        return fontText(trimmedText);
      });

      const manilaTime = DateTime.now().setZone("Asia/Manila").toFormat("yyyy-MM-dd hh:mm:ss a");

      const sure = `𝗕𝗔𝗥𝗗 𝗔𝗜 🌄:\n\n${result}\n\n𝗩𝗜𝗦𝗜𝗧 𝗠𝗬 𝗗𝗘𝗩𝗘𝗟𝗢𝗣𝗘𝗥!\nhttps://www.facebook.com/zcoded221\n\n${manilaTime}`;

      if (sure && sure.length > 0) {
        const imageUrls = response.data.imageUrls || [];
        const Pictures = [];

      if (!fs.existsSync("cache")) {
        fs.mkdirSync("cache");
      }

      for (let i = 0; i < imageUrls.length; i++) {
        const url = imageUrls[i];
        const photoPath = `cache/photo_${i + 1}.png`;

        try {
          const imageResponse = await axios.get(url, { responseType: "arraybuffer" });
          fs.writeFileSync(photoPath, imageResponse.data);

          Pictures.push(fs.createReadStream(photoPath));
        } catch (error) {
          console.error("Error occurred while downloading and saving the photo:", error);
        }
      }
        api.sendMessage(
          {
            attachment: Pictures,
            body: sure,
          },
          threadID,
          messageID
        );

        const gttsInstance = new gtts(result, 'en-us');
        const gttsPath = path.join(__dirname, 'voicebox.mp3');
        gttsInstance.save(gttsPath, function (error, result) {
          if (error) {
            console.error("Error saving gTTS:", error);
          } else {
            api.sendMessage({
              body: "☄️𝗩𝗢𝗜𝗖𝗘 𝗥𝗘𝗦𝗣𝗢𝗡𝗦𝗘☄️",
              attachment: fs.createReadStream(gttsPath)
            }, threadID);
          }
        });
      }
    } catch (error) {
      api.sendMessage(error.message, threadID, messageID);
    }
  } catch (error) {
    console.error("Top-level error:", error);
  }
};

