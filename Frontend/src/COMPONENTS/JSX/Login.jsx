import "../CSS/Login.css";
import User from "../../IMAGES/user.png";
import Password from "../../IMAGES/password.png";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Login() {

    const navigate = useNavigate();

    const SignUpPageOpen = function() {
        navigate("/SignUp");
    };

    const SubmitLogin = async () => {

        const Username = document.getElementById("Username_Input").value.trim();
        const Password = document.getElementById("Password_Input").value.trim();

        if(!Username || !Password) {
            alert("Please fill in all the fields.");
            return;
        }

        const UserInfo = {
            name: Username,
            password: Password,
        };

        try {
            const response = await axios.post("https://project-companion-backend.onrender.com/Auth/Login", UserInfo);
            if(response.data.success) {
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("email", response.data.email);
                navigate("/");
            } else {
                alert("Login Failed. Invalid Credentials.");
            }
        } catch(err) {
            alert("Error fetching data. Please try again later.");
        }

    };

    return(
        <div id="LS_Background">

            <div id="LS_Box">

                <div id="LS_Heading">
                    <span id="LS_Heading_Text">Login</span>
                </div>

                <div id="LS_Input">

                    <div className="LS_Input_Box">
                        <div className="LS_Input_Group1">
                            <img src={User} alt="Username" className="LS_Input_Image"></img>
                            <label htmlFor="Username_Input">Username</label>
                        </div>
                        <input type="text" className="LS_Input_Field" id="Username_Input" required></input>
                    </div>

                    <div className="LS_Input_Box">
                        <div className="LS_Input_Group1">
                            <img src={Password} alt="Password" className="LS_Input_Image"></img>
                            <label htmlFor="Password_Input">Password</label>
                        </div>
                        <input type="password" className="LS_Input_Field" id="Password_Input" required></input>
                    </div>

                    <span className="LS_Forgot">Forgot Password? <Link to="/ForgotPassword" id="LS_Forgot_Link">Click Here!!</Link></span>

                    <div id="LS_Buttons">
                        <div className="LS_Button_Box">
                            <span className="LS_Button_Text" onClick={SignUpPageOpen}>Sign Up</span>
                        </div>
                        <div className="LS_Button_Box">
                            <span className="LS_Button_Text" onClick={SubmitLogin}>Login</span>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;