import "../CSS/ForgotPassword.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Gmail from "../../IMAGES/gmail.png";
import Password from "../../IMAGES/password.png";
import { SendOtp } from "../FUNTIONS/SendOTP";

function ForgotPassword() {

    const navigate = useNavigate();

    const ChangePassword = async function() {
        const email = document.getElementById("Email_Input").value.trim();
        const newpassword = document.getElementById("Password_Input").value.trim();
        const confirmpassword = document.getElementById("Confirm_Password_Input").value.trim();
        const otp = document.getElementById("LS_Otp_Input").value.trim();

        if(!email || !newpassword || !confirmpassword || !otp) {
            alert("Please fill in all the fields");
            return;
        }

        if(newpassword !== confirmpassword) {
            alert("Confirm Password doesn't match");
            return;
        }

        const OTPInfo = {
            email: email,
            otp: otp,
        }

        try {
            const response = await axios.post("https://project-companion-backend.onrender.com/Auth/VerifyOTP", OTPInfo);

            if(!response.data.success) {
                alert(response.data.message);
                return;
            }
        } catch(err) {
            alert(response.data.message);
            return;
        }

        const NewInfo = {
            email: email,
            NewPassword: newpassword,
        }

        try  {
            const response = await axios.post("https://project-companion-backend.onrender.com/Auth/UpdatePassword", NewInfo);

            if(response.data.success) {
                alert(response.data.message);
                navigate("/Login");
            } else {
                alert(response.data.message);
                navigate("/ForgotPassword");
            }
        } catch(err) {
            alert("Server error, Please try again later");
            return;
        }
    };

    return (
        <div id="LS_Background">
            <div id="LS_Box">

                <div id="LS_Heading">
                    <span id="LS_Heading_Text">Modify Password</span>
                </div>

                <div id="LS_Input">

                    <div className="LS_Input_Box">
                        <div className="LS_Input_Group1">
                            <img src={Gmail} alt="Email" className="LS_Input_Image"></img>
                            <label htmlFor="Email_Input">Email</label>
                        </div>
                        <input type="email" className="LS_Input_Field" id="Email_Input" required></input>
                    </div>

                    <div className="LS_Input_Box">
                        <div className="LS_Input_Group1">
                            <img src={Password} alt="Password" className="LS_Input_Image"></img>
                            <label htmlFor="Password_Input">New-Password</label>
                        </div>
                        <input type="password" className="LS_Input_Field" id="Password_Input" required></input>
                    </div>

                    <div className="LS_Input_Box">
                        <div className="LS_Input_Group1">
                            <img src={Password} alt="Password" className="LS_Input_Image"></img>
                            <label htmlFor="Confirm_Password_Input">Confirm-Password</label>
                        </div>
                        <input type="password" className="LS_Input_Field" id="Confirm_Password_Input" required></input>
                    </div>

                    <div id="LS_Otp">
                        <div className="LS_Otp_Box">
                            <span className="LS_Otp_Text" onClick={SendOtp}>Send OTP</span>
                        </div>
                        <input type="text" placeholder="Enter OTP" className="LS_Otp_Field" id="LS_Otp_Input" required autoComplete="off"></input>
                    </div>

                    <div id="FP_Buttons">
                        <div className="LS_Otp_Box">
                            <span className="LS_Otp_Text" onClick={ChangePassword}>Submit</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default ForgotPassword;