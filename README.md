# Companion - Mood Analysis App

## Overview

**Companion** is a mood prediction app that helps predict a user's mood based on their chat history. The app uses AI (Gemini) to analyze the conversation and provides insights into the user's emotional state. It offers several features, including theme switching (light/dark), response modes (normal/roast), and user authentication (login, signup, forgot password). Additionally, the app automatically hides user chats after a day and displays the mood level based on all previous interactions.

### Technologies Used
- **Frontend:** React, HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** Email/password (App password for email service)

---

## Features
- **Mood Prediction:** Based on the chat with the AI, your mood will be analyzed and displayed.
- **Theme Switcher:** Light and Dark themes available for user preference.
- **Response Mode:** Choose between Normal or Roast response modes for fun or seriousness.
- **User Authentication:** Secure login, signup, and password recovery via email.
- **Chat Deletion:** Chats automatically disappear after 24 hours.
- **Mood Level Display:** Mood level is displayed based on your previous chats.

---

## .Env File Setup
Add .env file in Backend folder, which will be used for connecting to MongoDB server, API call to AI and sending OTP to user.

```bash
MONGO=your-mongo-url
API_KEY=your-gemini-api
Email=your-email
EmailPassowrd=your-email-password
```

---

## File Structure and How to Run
Install dependencies for both Backend and Frontend Folder.

```bash
npm install
```

Start the backend by -
``` bash
cd Backend
npm start
```

Start the frontend by -
``` bash
cd Frontend
npm run dev
```

