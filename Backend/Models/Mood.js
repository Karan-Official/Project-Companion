const mongoose = require('mongoose');

const moodLevelSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    moodlevel: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        default: 5,
    },
});

const MoodLevel = mongoose.model('MoodLevel', moodLevelSchema);

module.exports = MoodLevel;