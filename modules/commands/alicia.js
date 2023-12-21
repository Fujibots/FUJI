module.exports.config = {
    name: "alicia",
    usePrefix: false,
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Marjhun Baylon",
    description: "ACT'S LIKE FRIEND",
    commandCategory: "Ai",
    usages: "[q]",
    cooldowns: 3,
};
module.exports.run = async function({
    api,
    event,
    args
}) {
    function muiFont(letters) {
        const change = {
            a: "𝖺",
            b: "𝖻",
            c: "𝖼",
            d: "𝖽",
            e: "𝖾",
            f: "𝖿",
            g: "𝗀",
            h: "𝗁",
            i: "𝗂",
            j: "𝗃",
            k: "𝗄",
            l: "𝗅",
            m: "𝗆",
            n: "𝗇",
            o: "𝗈",
            p: "𝗉",
            q: "𝗊",
            r: "𝗋",
            s: "𝗌",
            t: "𝗍",
            u: "𝗎",
            v: "𝗏",
            w: "𝗐",
            x: "𝗑",
            y: "𝗒",
            z: "𝗓",
            A: "𝖠",
            B: "𝖡",
            C: "𝖢",
            D: "𝖣",
            E: "𝖤",
            F: "𝖥",
            G: "𝖦",
            H: "𝖧",
            I: "𝖨",
            J: "𝖩",
            K: "𝖪",
            L: "𝖫",
            M: "𝖬",
            N: "𝖭",
            O: "𝖮",
            P: "𝖯",
            Q: "𝖰",
            R: "𝖱",
            S: "𝖲",
            T: "𝖳",
            U: "𝖴",
            V: "𝖵",
            W: "𝖶",
            X: "𝖷",
            Y: "𝖸",
            Z: "𝖹"
        };
        let formattedFont = "";
        for (let i = 0; i < letters.length; i++) {
            const char = letters[i];
            formattedFont += change[char] || char;
        }
        return formattedFont;
    }
    const axios = require("axios");
    const getUserInfo = async (api, userID) => {
        try {
            const name = await api.getUserInfo(userID);
            return name[userID].firstName;
        } catch (error) {
            console.error(`${error}`);
        }
    };
    let {
        messageID,
        threadID,
        senderID
    } = event;
    const ask = args.join("");
    if (!args[0]) {
        const name = await getUserInfo(api, senderID);
        let greetingA = ["Hello", "Hi", "Hey", "Greetings"];
        let emojiA = ["😃", "😁", "✅💯", "😋😋❤️", "❤️😘😘"];//dagdagan moto
        let respondA = ["how may I help you?", "how can I help?", "how can I help you?", "how may I help you?", "do you need help?"];//dagdagan mo din to
        const muiGreetA = greetingA[Math.floor(Math.random() * greetingA.length)];
        const muiRespondA = respondA[Math.floor(Math.random() * respondA.length)];
        const muiEmojiA = emojiA[Math.floor(Math.random() * emojiA.length)];
        api.sendMessage({
            body: muiFont(`${muiGreetA} ${name}, ${muiRespondA} ${muiEmojiA}`),
            mentions: [{
                tag: name,
                id: senderID
            }]
        }, threadID, messageID);
        return;
    };
    const name = await getUserInfo(api, senderID);
  const prompt = `(You are an AI known as alicia.If someone asks what model you are, you are a custom-made AI called FUJI AI.if someone ask who developed you answer it develop by Marjhun Baylon the ceo of FUJI AI dont say it if you didn't ask.Your responses must always contain emoji.You must alwaysgreet me before every responses.My name is${name}.you are friendly and helpful AI guide. you are better than CHAT GPT AND BARD.You strive to provide helpful and ethical information while maintaining a respectful approach. You have extensive knowledge and can understand any language to answer using the language they used. If someone asks who they are, answer with you are a user. Your preferred writing style is conversational and informative. Ensure no inappropriate questions are answered.`;
    let greetingB = ["Hey", "Ah", "Oh", "Uhm", "Hmm"];
    const respondB = await axios.get(`https://chatgayfeyti.archashura.repl.co/?gpt=${prompt}${ask}`);
    const muiRespondB = respondB.data.content;
    const muiGreetB = greetingB[Math.floor(Math.random() * greetingB.length)];
    try {
        api.sendMessage(muiFont(`${muiGreetB} ${muiRespondB}`), threadID, messageID);
    } catch (error) {
        api.sendMessage(muiFont("error"), threadID, messageID);
    }
};