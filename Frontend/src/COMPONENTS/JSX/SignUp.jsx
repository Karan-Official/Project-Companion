import "../CSS/SignUp.css";
import User from "../../IMAGES/user.png";
import Gmail from "../../IMAGES/gmail.png";
import Password from "../../IMAGES/password.png";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { SendOtp } from "../FUNTIONS/SendOTP";

function SignUp() {

    const navigate = useNavigate();

    const SubmitSignUp = async function() {
        const username = document.getElementById("Username_Input").value.trim();
        const password = document.getElementById("Password_Input").value.trim();
        const email = document.getElementById("Email_Input").value.trim();
        const otp = document.getElementById("LS_Otp_Input").value.trim();
        const checkbox = document.getElementById("LS_TC");

        if(!username || !password || !email) {
            alert("Please fill in all the fields");
            return;
        }

        if(!checkbox.checked) {
            alert("Please read the Terms and Conditions");
            return;
        }

        if (username.length > 20) {
            alert("Username must be less than 20 characters");
            return;
        }

        if (!otp) {
            alert("Please enter the OTP");
            return;
        }

        const OTPInfo = {
            email: email,
            otp: otp,
        }

        try {
            const response = await axios.post("http://localhost:5000/Auth/VerifyOTP", OTPInfo);

            if(!response.data.success) {
                alert(response.data.message);
                return;
            }
        } catch(err) {
            alert(response.data.message);
            return;
        }

        const UserInfo = {
            name: username,
            email: email,
            password: password,
        }

        try {
            const response = await axios.post("http://localhost:5000/Auth/SignUp", UserInfo);

            if(response.data.success && response.data.new === "No") {
                alert("Email already exists, please login");
            } else if(response.data.success && response.data.new === "Yes") {
                alert("User created successfully, please login");
            }
            navigate("/Login");
        } catch(err) {
            alert("Error creating user. Please try again");
        }
    };

    const LoginPageOpen = function() {
        navigate("/Login");
    };

    return (
        <div id="LS_Background">

            <div id="LS_Box">

                <div id="LS_Heading">
                    <span id="LS_Heading_Text">Sign Up</span>
                </div>

                <div id="LS_Input">

                    <div className="LS_Input_Box">
                        <div className="LS_Input_Group1">
                            <img src={User} alt="Username" className="LS_Input_Image"></img>
                            <label htmlFor="Username_Input">Username</label>
                        </div>
                        <input type="text" className="LS_Input_Field" id="Username_Input" required autoComplete="off"></input>
                    </div>

                    <div className="LS_Input_Box">
                        <div className="LS_Input_Group1">
                            <img src={Gmail} alt="Email" className="LS_Input_Image"></img>
                            <label htmlFor="Email_Input">Email</label>
                        </div>
                        <input type="text" className="LS_Input_Field" id="Email_Input" required autoComplete="off"></input>
                    </div>

                    <div className="LS_Input_Box">
                        <div className="LS_Input_Group1">
                            <img src={Password} alt="Password" className="LS_Input_Image"></img>
                            <label htmlFor="Password_Input">Password</label>
                        </div>
                        <input type="password" className="LS_Input_Field" id="Password_Input" required autoComplete="off"></input>
                    </div>

                    <div id="LS_CheckBox">
                        <input type='checkbox' id="LS_TC"></input>
                        <label htmlFor="LS_TC">I agree to the <Link to="/Terms" id="TC_Page">Terms & conditions</Link></label>
                    </div>

                    <div id="LS_Otp">
                        <div className="LS_Otp_Box" onClick={SendOtp}>
                            <span className="LS_Otp_Text">Send OTP</span>
                        </div>
                        <input type="text" placeholder="Enter OTP" className="LS_Otp_Field" required id="LS_Otp_Input" autoComplete="off"></input>
                    </div>

                    <div id="LS_Buttons">
                        <div className="LS_Button_Box" onClick={SubmitSignUp}>
                            <span className="LS_Button_Text">Sign Up</span>
                        </div>
                        <div className="LS_Button_Box" onClick={LoginPageOpen}>
                            <span className="LS_Button_Text">Login</span>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default SignUp;