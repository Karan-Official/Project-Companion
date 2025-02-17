const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();
const AuthRoute = require("./Routes/AuthRoute");
const ChatRoute = require("./Routes/ChatRoute");
const MoodRoute = require("./Routes/MoodRoute");

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;

app.use("/Auth", AuthRoute);
app.use("/Chat", ChatRoute);
app.use("/Mood", MoodRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);    
});
