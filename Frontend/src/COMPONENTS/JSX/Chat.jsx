import "../CSS/Chat.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PartyPopper from "../../IMAGES/partypopper.png";
import ReversePartyPopper from "../../IMAGES/partypopperreverse.png";
import Worst from "../../IMAGES/Worst.png";
import Bad from "../../IMAGES/Bad.png";
import Neutral from "../../IMAGES/Neutral.png";
import Good from "../../IMAGES/Good.png";
import Best from "../../IMAGES/Best.png";
import Logo from "../../IMAGES/App_Logo.png";
import User from "../../IMAGES/user.png";
import { useState, useEffect, useCallback } from "react";
import { ThemeVerify } from "../FUNTIONS/Theme";
import {UpdateImages} from "../FUNTIONS/Mood";

function Chat() {

    useEffect(() => {
        ThemeVerify();
        UpdateImages();
    });

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [chatData, setChatData] = useState([]);

    const username = localStorage.getItem("username") || "User";
    const email = localStorage.getItem("email");

    function AutoResize() {
        const textArea = document.getElementById('Prompt_Input');
        textArea.style.height = 'auto';
        textArea.style.height = textArea.scrollHeight-20 + 'px';
    };

    const SubmitPrompt = async () => {

        if(username === "User") {
            navigate("/Login");
            return;
        }

        const prompt = document.getElementById("Prompt_Input").value;

        if(!prompt) {
            alert("Enter Prompt");
            return;
        }

        const ResponseMode = localStorage.getItem("ResponseMode");

        const Data = {
            email: email,
            prompt: prompt,
            ResponseMode: ResponseMode,
        };

        try {
            document.getElementById("Prompt_Input").value = "";
            setIsLoading(true);
            const response = await axios.post("https://project-companion-backend.onrender.com/Chat/SaveChat", Data);
            setIsLoading(false);
            if(response.data.success === true) {
                const newMessage = {
                    userPrompt: prompt,
                    aiResponse: response.data.message,
                };
                setChatData((prevChatData) => [...prevChatData, newMessage]);
            } else {
                alert("Failed to generate response");
            }
        } catch (err) {
            setIsLoading(false);
            alert('Error generating response. Please try again later');
        }

    };

    const fetchChatData = useCallback(async () => {

        const today = new Date().toISOString().split('T')[0];
        const requestData = {
            email: email,
            date: today,
        };

        try {
            const response = await axios.post("https://project-companion-backend.onrender.com/Chat/GetChat", requestData);
            if (response.data.success) {
                const messages = response.data.chat.messages.map((message) => ({
                    userPrompt: message.question,
                    aiResponse: message.answer,
                }));
                setChatData(messages);
            }
        } catch (err) {
            alert('Error fetching chat data. Please try again later');
        }
    }, [username]);

    useEffect(() => {
        fetchChatData();
    }, [fetchChatData]);

    function renderChatMessages() {
        return (
            <div>
                {isLoading && <p className="Loading_Message switchColor">Loading response...</p>}
                {chatData.length === 0 ? (
                    <p className="No_Messages switchColor">No chat messages yet.</p>
                ) : (
                    [...chatData].reverse().map((chat, index) => (
                        <div className="AI_Answer" key={index}>
                            <div className="AI_Response">
                                <p className="AI_Response_Text switchColor">{chat.aiResponse}</p>
                                <img src={Logo} alt="App Logo" className="App_Logo_Response" />
                            </div>
                            <div className="AI_Prompt">
                                <img src={User} alt="User Logo" className="User_Logo_Prompt" />
                                <p className="User_Question switchColor">{chat.userPrompt}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        );
    }

    const submitPrompt = function() {

    };

    return(
        <div id="Chat_Area">

            <div id="Greeting">
                <img src={PartyPopper} alt="Party Popper" className="Greeting_Image"></img>
                <h1 id="Greet" className="BW_Text">Hello {username}!!</h1>
                <img src={ReversePartyPopper} alt="Party Popper" className="Greeting_Image"></img>
            </div>

            <div id="Mood">
                <span className="Chat_Area_Text BW_Text">Your Current Mood Level:</span>
                <div id="Mood_Image">
                    <img src={Worst} className="Mood_Analysis_Image" alt="Worst"/>
                    <img src={Bad} className="Mood_Analysis_Image" alt="Bad"/>
                    <img src={Neutral} className="Mood_Analysis_Image" alt="Neutral"/>
                    <img src={Good} className="Mood_Analysis_Image" alt="Good"/>
                    <img src={Best} className="Mood_Analysis_Image" alt="Best"/>
                    <span className="Chat_Area_Text BW_Text" id="MoodLevel_Text"></span>
                </div>
            </div>

            <div id="Chat">

                <div id="Chat_Prompt" className="BW_chat">
                    <textarea id="Prompt_Input" placeholder="Enter Message" onInput={AutoResize} name="User_Prompt" className="BW_chat"></textarea>
                    <div id="Prompt_Button_Box">
                        <button value="Ask" id="Prompt_Button" onClick={SubmitPrompt}>Ask</button>
                    </div>
                </div>
                    
                {username !== "User" && (
                    <div id="Output" className="BW_chat">
                        {renderChatMessages()}
                    </div>
                )}

            </div>

        </div>
    );
}

export default Chat;