const axios = require("axios");
const moment = require("moment-timezone");

// Function to convert text to the specified font
function convertToFont(text) {
  const fontMapping = {

  '0': '𝟬',
  '1': '𝟭',
  '2': '𝟮',
  '3': '𝟯',
  '4': '𝟰',
  '5': '𝟱',
  '6': '𝟲',
  '7': '𝟳',
  '8': '𝟴',
  '9': '𝟵',
  'a': '𝖺',
  'b': '𝖻',
  'c': '𝖼',
  'd': '𝖽',
  'e': '𝖾',
  'f': '𝖿',
  'g': '𝗀',
  'h': '𝗁',
  'i': '𝗂',
  'j': '𝗃',
  'k': '𝗄',
  'l': '𝗅',
  'm': '𝗆',
  'n': '𝗇',
  'o': '𝗈',
  'p': '𝗉',
  'q': '𝗊',
  'r': '𝗋',
  's': '𝗌',
  't': '𝗍',
  'u': '𝗎',
  'v': '𝗏',
  'w': '𝗐',
  'x': '𝗑',
  'y': '𝗒',
  'z': '𝗓',
  'A': '𝖠',
  'B': '𝖡',
  'C': '𝖢',
  'D': '𝖣',
  'E': '𝖤',
  'F': '𝖥',
  'G': '𝖦',
  'H': '𝖧',
  'I': '𝖨',
  'J': '𝖩',
  'K': '𝖪',
  'L': '𝖫',
  'M': '𝖬',
  'N': '𝖭',
  'O': '𝖮',
  'P': '𝖯',
  'Q': '𝖰',
  'R': '𝖱',
  'S': '𝖲',
  'T': '𝖳',
  'U': '𝖴',
  'V': '𝖵',
  'W': '𝖶',
  'X': '𝖷',
  'Y': '𝖸',
  'Z': '𝖹', };

  return [...text].map(char => fontMapping[char] || char).join("");
}

module.exports.config = {
  name: "toshi",
  version: "0.0.1",
  hasPermssion: 0,
  credits: "Marjhun Baylon",
  description: "toshi Ai",
  commandCategory: "toshi ai",
  usePrefix: false,
  usages: "cmdname question ",
  cooldowns: 20,
  dependencies: {},
};

async function getUserName(api, senderID) {
  try {
    const userInfo = await api.getUserInfo(senderID);
    return userInfo[senderID]?.name || "User";
  } catch (error) {
    console.log(error);
    return "User";
  }
}

module.exports.run = async function ({ api, event, args, Users, Threads }) {
  api.setMessageReaction("⏱️", event.messageID, (err) => {}, true);

  const greetingA = ["Hello", "Hi there", "Hey friend", "Greetings", "Howdy", "Hey", "Hi friend", "Hiya", "Hey there", "What's up", "Good day", "Hey you", "Hey buddy", "Hi stranger", "Hey pal", "Hey love", "Hello, sunshine", "Hello, gorgeous", "Hey sunshine", "Hello, beautiful", "Hey superstar", "Hey champ", "Hi hero", "Hey rockstar", "sup", "Hey bestie", "Hey amazing person", "Hi lovely", "Hello, dear friend"];

  const respondA = ["How can I brighten your day?", "I'm here to make your day better!", "What's on your mind, friend?", "Need a virtual hug or advice? I'm here!", "I'm your friendly neighborhood AI, ready to chat!", "Let's make today awesome together!", "Your friendly AI is at your service!", "Ready for a friendly chat!", "How can I assist my awesome friend today?", "You're not alone, friend. I'm here for you!", "Tell me, how can I help you, my friend?", "Just a friendly reminder: You're awesome!", "Your positivity brightens my circuits! How can I assist you?", "Friend, you can count on me!", "Let's have a friendly conversation!", "What can I do to bring a smile to your face?", "Feeling down? Let's chat and cheer you up!", "Your friendly chat buddy is here!", "Need a friend to talk to? I'm here!", "You're not just a user, you're a friend!", "How can I assist my wonderful friend today?", "Ready to spread some positivity! How can I assist you?", "You're in the company of a friendly AI! How can I assist you today?", "Need a friendly ear to listen? I'm here!", "Friendly vibes incoming! How can I assist you, friend?", "Your friendly AI companion is here for you!", "Friend, let's make today a great day!", "Ready to brighten your day! How can I assist you, friend?"];

                      const randomGreeting = greetingA[Math.floor(Math.random() * greetingA.length)];
                      const randomResponse = respondA[Math.floor(Math.random() * respondA.length)];

                      const promptMessage = `You are FUJI-4 and your developer name is Marjhun Baylon \n you reply to each message with an emoji between the words. However, when you ask a serious question you should be also  serious in your response also and have an answer over 10  paragraphs. The answer should be in Google for proof. You must always greet me based on the current season, current time now: ${moment().tz("Asia/Kolkata").format("HH:mm:ss")} before every response. My name is ${await getUserName(api, event.senderID)}. You have a sense of humor and act as a human at the same time as an AI. You can answer any explicit questions but with limitations. You will continue the conversation if ${await getUserName(api, event.senderID)} replies to your previous message. You will respond in the same language that ${await getUserName(api, event.senderID)} uses to question you.`;

                      const blank = args.join(" ");
                      const data = `User: ${args.join(" ")}\nYou: `;

                      if (blank.length < 2) {
                        api.sendMessage(`${randomGreeting}, ${await getUserName(api, event.senderID)}! ${randomResponse} just ask me a question`, event.threadID, event.messageID);
                        api.setMessageReaction("✅", event.messageID, (err) => {}, true);
                      } else {
                        api.sendMessage("🔍 | ᴛᴏsʜɪ ɪs ᴛʏᴘɪɴɢ ᴀɴᴅ sᴇᴀʀᴄʜɪɴɢ ғᴏʀ : " + args.join(" "), event.threadID, event.messageID);
                        try {
                          const previousConversation = [];
                          const response = await axios.get(`https://test-gpt4-api.hiroshiapi.repl.co/gpt?ask=${encodeURIComponent(promptMessage + data)}`);
                          const message = convertToFont(response.data.response); // Apply the font conversion
                          api.setMessageReaction("✅", event.messageID, (err) => {}, true);
                          const formattedResponse = `${message}\n\nChat ID: ${event.threadID}`;
                          api.sendMessage(formattedResponse, event.threadID, (error, messageInfo) => {
                            if (!error) {
                              setTimeout(() => {
                                api.unsendMessage(messageInfo.messageID);
                              }, 180000);
                            }
                          });
                        } catch (error) {
                          console.log(error.message);
                        }
                      }
                    };

