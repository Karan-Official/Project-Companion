const express = require('express');
const router = express.Router();
const User = require("../Models/User");
const Mood = require("../Models/Mood");
const OTP = require("../Models/OTP");
const nodemailer = require('nodemailer');

require('dotenv').config();

router.post("/Login", async(req, res) => {
    const {name, password} = req.body;

    try {
        const exists = await User.findOne({name, password});
        if(exists) {
            res.status(200).json({success: true, username: exists.name, email: exists.email});
        } else {
            res.status(200).json({success: false, username: null});
        }
    } catch(err) {
        res.status(500).json({success: false, username: null});
    }
});

router.post("/OTP", async(req,res) => {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OTP.deleteMany({email});

    const NewOTPEntry = new OTP({email, otp});
    await NewOTPEntry.save();

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.Email,
          pass: process.env.EmailPassword
        }
    });

    let mailOptions = {
        from: process.env.Email,
        to: email,
        subject: 'OTP Code for SignUp',
        text: `Your OTP code is: ${otp}. Do not share the OTP. It will expire in 5 minutes.`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({success: true});
    } catch(err) {
        res.status(500).json({success: false});
    }
});

router.post("/VerifyOTP", async(req,res) => {
    const {email, otp} = req.body;

    try {
        const OTPRecord = await OTP.findOne({email, otp});

        if(!OTPRecord) {
            return res.status(200).json({success: false, message: "Invalid or Expired OTP."});
        }

        const OTPAge = Date.now() - OTPRecord.createdAt.getTime();
        if(OTPAge > 300000) {
            await OTP.deleteOne({email, otp});
            return res.status(200).json({success: false, message: "OTP expired."});
        }

        await OTP.deleteMany({email});

        return res.status(200).json({success: true, message: "OTP verified Successfully."});
    } catch(err) {
        return res.status(500).json({success: false, message: "Error verifying OTP."});
    }
});

router.post("/SignUp", async(req,res) => {
    const {name, email, password} = req.body;

    try {
        const exists = await User.findOne({email});

        if(exists) {
            return res.status(200).json({success: true, new: "No"});
        } 

        const NewUserEntry = new User({name, email, password});
        await NewUserEntry.save();

        const MoodEntry = new Mood({email, moodlevel: 5});
        await MoodEntry.save();

        res.status(200).json({success: true, new: "Yes"});
    } catch(err) {
        res.status(500).json({success: false, new: null});
    }
});

router.post("/UpdatePassword", async(req,res) => {
    const {email, NewPassword} = req.body;

    try {
        const FetchUser = await User.findOne({email});
        
        if(!FetchUser) {
            return res.status(200).json({success: false, message: "User not found"});
        }

        FetchUser.password = NewPassword;
        await FetchUser.save();

        return res.status(200).json({success: true, message: "Password changed successfully, Please login"});
    } catch(err) {
        console.log(err);
        return res.status(500).json({success: false, message: "Server error, Please try again later"});
    }
});

module.exports = router;