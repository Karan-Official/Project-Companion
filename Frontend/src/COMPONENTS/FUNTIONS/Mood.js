import axios from "axios";

async function fetchMood() {
    try {
        const email = localStorage.getItem("email");

        if(!email) {
            return 5;
        }

        const response = await axios.post("https://project-companion-backend.onrender.com/Mood/FetchMoodValue", {email});

        if(response.data.success && response.data.MoodData !== null) {
            return response.data.MoodData;
        } else if(response.data.success && response.data.MoodData === null) {
            alert("No mood data found");
            return 5;
        }
    } catch(err) {
        alert("Error fetching mood data");
        return 5;
    }
};

export async function UpdateImages() {
    const MoodData = await fetchMood();
    const MoodImages = document.getElementsByClassName("Mood_Analysis_Image");
    const MoodText = document.getElementById("MoodLevel_Text");
    const values = ["Worst", "Bad", "Neutral", "Good", "Best"];

    let index = 1;
    for(let obj of MoodImages) {
        if(index <= MoodData) {
            obj.classList.remove("Grayscale");
        } else {
            obj.classList.add("Grayscale");
        }
        index++;
    }

    MoodText.textContent = values[MoodData-1];
};