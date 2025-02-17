const express = require('express');
const Chat = require("../Models/Chat");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const MoodLevel = require("../Models/Mood");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.post('/SaveChat', async (req, res) => {
    let {email, prompt, ResponseMode} = req.body;

    try {
        const today = new Date().toISOString().split('T')[0];

        let chatEntry = await Chat.findOne({ email: email, date: today });

        let currMood = await MoodLevel.findOne({ email });

        let pastMessages = chatEntry
        ? chatEntry.messages.map(msg => `Q: ${msg.question}\nA: ${msg.answer}`).join("\n")
        : "No previous interactions.";

        let newPrompt = ``;

        // if(ResponseMode === "Normal") {
        //     newPrompt = `
        //     Here is a summary of past questions and answers:
        //     ${pastMessages}

        //     Please answer the following question based on past interactions if relevant and make sure to give answer based on user mood which is ${currMood} (1 means worst and 5 means best). give response which makes user's mood happy, enthusiast, and confident. response in such a way it should engagae user and it should feel like friend is talking with them (response should be only plain text (emojis allowed) (no bold, italics or any such things)):
        //     Q: ${prompt}
        //     `;
        // } else {
        //     newPrompt = `
        //     Here is a summary of past questions and answers:
        //     ${pastMessages}

        //     Please answer the following question based on past interactions if relevant and make sure to provide answer to roast me on basis on this and my past messages. (response should be only plain text (emojis allowed) (no bold, italics or any such things)):
        //     Q: ${prompt}
        //     `;
        // }

        if(ResponseMode === "Normal") {
            newPrompt = `
            You are now a companion who help me answer the common questions based on my mood level i.e. ${currMood} (1 is worst and 5 is best) (Do not roast me). Give engaging response in only plain text (no bold, italics or any other formatting).

            Here are past questions and answers:
            ${pastMessages}

            Current Question i am asking - ${prompt}`;
        } else {
            newPrompt = `
            You are now a companion who help me answer the common questions based on my mood level i.e. ${currMood} (1 is worst and 5 is best). Give engaging response in only plain text (no bold, italics or any other formatting) and roast me in that response.

            Here are past questions and answers:
            ${pastMessages}

            Current Question i am asking - ${prompt}`;
        }

        const aiResponse = await getGeminiChatCompletion(newPrompt);

        if(chatEntry) {
            chatEntry.messages.push({question: prompt, answer: aiResponse});
            await chatEntry.save();
        } else {
            const newChat = new Chat({
                email: email,
                date: today,
                messages: [{question: prompt, answer: aiResponse}]
            });
            await newChat.save();
        }

        const newMoodLevel = await updateMoodLevel(email, prompt, aiResponse);

        res.status(200).json({ success: true, message: aiResponse, moodLevel: newMoodLevel });

    } catch (err) {
        res.status(500).json({ success: false});
    }
});

async function getGeminiChatCompletion(newPrompt) {
    try {
        const result = await model.generateContent(newPrompt);
        return result.response.text().trim();
    } catch (error) {
        console.error("Error fetching Gemini chat completion:", error);
        return;
    }
}

async function updateMoodLevel(email, prompt, aiResponse) {
    try {
        let userMood = await MoodLevel.findOne({ email });

        const moodAnalysisPrompt = `The previous mood level is = ${userMood.moodlevel} (it is in range 1(worst mood) to 5(best mood)). 
        Analyze the below question and answer and return a new mood value between 1 (worst mood) and 5 (best mood) with respect to previous mood value (return only number in range 1 to 5 no text only number). 
        Question: ${prompt}
        Answer: ${aiResponse}`;
        const moodValueResponse = await getGeminiChatCompletion(moodAnalysisPrompt);
        const newMoodLevel = Math.min(Math.max(parseInt(moodValueResponse.trim()), 1), 5);

        userMood.moodlevel = newMoodLevel;
        await userMood.save();

        return newMoodLevel;

    } catch (error) {
        alert("Error updating mood level");
        return;
    }
}

router.post('/GetChat', async (req, res) => {
    const { email, date } = req.body;

    try {
        const chat = await Chat.findOne({ email, date });

        if (chat) {
            res.status(200).json({ success: true, chat: chat });
        } else {
            res.status(200).json({ success: false });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching chat data' });
    }
});

module.exports = router;