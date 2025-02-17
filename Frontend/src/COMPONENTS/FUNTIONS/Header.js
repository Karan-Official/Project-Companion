import Angel from "../../IMAGES/angel.png";
import Devil from "../../IMAGES/devil.png";
import Sun from "../../IMAGES/Sun.png";
import Moon from "../../IMAGES/Moon.png";
import User from "../../IMAGES/user.png";
import InvertedUser from "../../IMAGES/userInverted.png";

export function Roast_Toggle() {
    const Container = document.getElementById("Navbar_RoastBox");
    const Container_Img = document.getElementById("RoastBox_Img");
    const IsNormal = window.getComputedStyle(Container).justifyContent === "flex-start";

    if (IsNormal) {
        localStorage.setItem("ResponseMode", "Roast");
        Container_Img.setAttribute("src", Devil);
        Container_Img.setAttribute("title", "Roast response mode");
    } else {
        localStorage.setItem("ResponseMode", "Normal");
        Container_Img.setAttribute("src", Angel);
        Container_Img.setAttribute("title", "Normal response mode");
    }

    Container.style.justifyContent = IsNormal ? "flex-end" : "flex-start";
}

export function Toggle() {
  const slider = document.getElementById("Navbar_Theme");
  const slider_image = document.getElementById("Theme_Img");
  const navbar_border = document.getElementById("Navbar");
  const chat_prompt = document.getElementById("Chat_Prompt");
  const output = document.getElementById("Output");
  const loginsingup = document.getElementById("SignUp_Text");
  const isLight = window.getComputedStyle(slider).justifyContent === "flex-start";

  const Background = document.getElementsByClassName("BW_Background");
  const Text = document.getElementsByClassName("BW_Text");
  const chat_box = document.getElementsByClassName("BW_chat");
  const user_logo = document.getElementsByClassName("User_Logo_Prompt");

  if(isLight) {
    for (let obj of Text) {
      obj.style.color = "white";
    }

    for (let obj of chat_box) {
      obj.style.backgroundColor = "rgb(47,47,47)";
      obj.style.color = "white";
    }

    for (let obj of Background) {
      obj.style.backgroundColor = "rgb(33,33,33)";
    }

    for(let obj of user_logo) {
      obj.setAttribute("src", InvertedUser);
    }

    if(loginsingup) loginsingup.style.color = "rgb(223,217,207)";
    navbar_border.style.borderBottom = "2px solid white";
    if(chat_prompt) chat_prompt.style.border = "2px solid white";
    if(output)  output.style.border = "2px solid white";

    slider.style.justifyContent = "flex-end";
    slider_image.setAttribute("src", Moon);
  } else {
    for (let obj of Text) {
      obj.style.color = "black";
    }

    for (let obj of chat_box) {
      obj.style.backgroundColor = "white";
      obj.style.color = "black";
    }

    for (let obj of Background) {
      obj.style.backgroundColor = "white";
    }

    for(let obj of user_logo) {
      obj.setAttribute("src", User);
    }

    if(loginsingup) loginsingup.style.color = "rgb(223,217,207)";
    navbar_border.style.borderBottom = "2px solid black";
    if(chat_prompt) chat_prompt.style.border = "2px solid black";
    if(output)  output.style.border = "2px solid black";

    slider.style.justifyContent = "flex-start";
    slider_image.setAttribute("src", Sun);
  }
}

export function LS_Check() {
  const Container = document.getElementById("Navbar_RoastBox");
  const IsNormal = window.getComputedStyle(Container).justifyContent === "flex-start";

  if(localStorage.getItem("ResponseMode") === null) {
    if(IsNormal) {
      localStorage.setItem("ResponseMode", "Normal");
    } else {
      localStorage.setItem("ResponseMode", "Roast");
    }
  }
}
