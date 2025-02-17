const express = require('express');
const router = express.Router();
const MoodLevel = require('../Models/Mood');

router.post("/FetchMoodValue", async(req,res) => {
    try {
        const email = req.body;
        const data = await MoodLevel.findOne(email);

        if(data) {
            res.status(200).json({success: true, MoodData: data.moodlevel});
        } else {
            res.status(200).json({success: false, MoodData: null});
        }
    } catch(err) {
        return res.status(500).json({success: false, MoodData: null});
    }
});

module.exports = router;