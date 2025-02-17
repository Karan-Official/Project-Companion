const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    messages: [
        {
            question: {
                type: String,
                required: true,
            },
            answer: {
                type: String,
                required: true,
            },
        }
    ]
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;