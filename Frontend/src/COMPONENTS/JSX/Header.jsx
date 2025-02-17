import "../CSS/Header.css";
import { useNavigate } from 'react-router-dom';
import Logo from "../../IMAGES/App_Logo.png";
import Angel from "../../IMAGES/angel.png";
import Sun from "../../IMAGES/Sun.png";
import {Roast_Toggle, Toggle, LS_Check} from "../FUNTIONS/Header"; 
import {useEffect} from "react";
import { ThemeVerify } from "../FUNTIONS/Theme";

function Header() {

    useEffect(() => {
        ThemeVerify();
        LS_Check();
    });

    const username = localStorage.getItem("username");

    const navigate = useNavigate();

    const HomePage = function() {
        navigate("/");
    };
    
    const Logout = function() {
        localStorage.clear();
        navigate("/Login");
    };
    
    const SignUpPage = function() {
        navigate("/SignUp");
    };

    return(
        <div>

            <div id="Navbar" className="BW_Background">

                <div id="Navbar_Logo" onClick={HomePage}>
                    <img src={Logo} alt="App Logo" id="Navbar_Logo_Image"></img>
                    <span id="Navbar_Appname" className="BW_Text">Companion</span>
                </div>

                <div id="Navbar_Content">
                    {username ? (
                        <div id="Content_Welcome">
                            <span id="Welcome_Username" className="BW_Text">{username}</span>
                            <button onClick={Logout} id="Welcome_Logout">Logout</button>
                        </div>
                    ) : (
                        <div id="SignUp" onClick={SignUpPage}>
                            <span id="SignUp_Text">Login/Signup</span>
                        </div>
                    )}

                    <div id="Navbar_RoastBox" className='OuterBox' onClick={Roast_Toggle}>
                        <div id="RoastBox_Icon" className='InnerBox'>
                            <img src={Angel} alt="Switch Good or Roast Mode" id="RoastBox_Img" title={localStorage.getItem("ResponseMode") === "Roast" ? "Roast response mode" : "Normal response mode"}></img>
                        </div>
                    </div>

                    <div id="Navbar_Theme" className='OuterBox' onClick={Toggle}>
                        <div id="Theme_Icon" className='InnerBox'>
                            <img src={Sun} alt="Switch Light or Dark Mode" id="Theme_Img"></img>
                        </div>
                    </div>
                </div>

            </div>

            <div id="TempNavbar"></div>
            
        </div>
    );
}

export default Header;