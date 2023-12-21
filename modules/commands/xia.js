module['exports']['config'] = {
    name: "xia",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Marjhun Baylon",
    usePrefix: false,
    description: "AI powered by Blackbox",
    commandCategory: "ai",
    usages: "[ask]",
    cooldowns: 0
};

const axios = require("axios");

module['exports']['run'] = async function ({ api, event, args }) {
    let { messageID, threadID } = event;
    let tid = threadID,
        mid = messageID;
    const query = encodeURIComponent(args.join(" "));

    if (!query) return api.sendMessage("🌸 | ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ǫᴜᴇsᴛɪᴏɴ ᴛᴏ ʙᴇ ᴀɴsᴡᴇʀᴇᴅ ʙʏ xɪᴀ", tid, mid);

    try {
        api.setMessageReaction("🔍", mid, (err) => {}, true);
        api.sendMessage("🔍 | sᴇᴀʀᴄʜɪɴɢ ᴀɴsᴡᴇʀ ғʀᴏᴍ ʏᴏᴜʀ ǫᴜᴇsᴛɪᴏɴ", tid, mid);

        const url = 'https://useblackbox.io/chat-request-v4';
        const data = {
            textInput: query,
            allMessages: [{ user: query }],
            stream: '',
            clickedContinue: false,
        };

        const response = await axios.post(url, data);
        const message = response.data.response[0][0];
        const formattedAnswer = formatFont(message);

        api.setMessageReaction("✅", mid, (err) => {}, true);
        api.sendMessage(`💬 | xɪᴀ ᴀɴsᴡᴇʀ\n\n📝: ${formattedAnswer}`, tid, mid);
    } catch (e) {
        console.error(e); // Log the error for debugging
        api.sendMessage("🔴 An error occurred while processing your request.", tid, mid);
    }
};

function formatFont(text) {
    const fontMapping = {
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
        Z: "𝖹",
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
        z: "𝗓"
    };

    let formattedText = "";
    for (const char of text) {
        if (char in fontMapping) {
            formattedText += fontMapping[char];
        } else {
            formattedText += char;
        }
    }

    return formattedText;
}
