import axios from 'axios';

export async function SendOtp() {
    const email = document.getElementById("Email_Input").value.trim();

    if(!email) {
        alert("Please enter email to get OTP.");
        return;
    }

    try {
        const response = await axios.post("https://project-companion-backend.onrender.com/Auth/OTP", {email});
        if(response.data.success) {
            alert("OTP sent to your Email ID");
            document.getElementById("Email_Input").disabled = true;
        } else {
            alert("Failed to send OTP. Try again later.");
        }
    } catch(err) {
        alert("Failed to send OTP. Please try again.20");
    }
};