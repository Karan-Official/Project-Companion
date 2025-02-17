import "../CSS/Terms.css";
import { ThemeVerify } from "../FUNTIONS/Theme";
import {useEffect} from "react";

function Terms() {

    useEffect(() => {
        ThemeVerify();
    }, []);

    return (
        <div id="Terms_Box" className="BW_Text">
            <span id="Terms_Heading">Terms & Conditions</span>
            <div id="All_Terms">
                <span className="Terms_Head">Last Updated: [21/10/2024]</span>
                <span className="Terms_Para">Welcome to Project Comapnion! These Terms and Conditions govern your use of our chatbot service and mood analysis platform. By accessing or using our Service, you agree to these Terms and Conditions. Please read them carefully.</span>
                <span className="Terms_Head">Acceptance of Terms</span>
                <span className="Terms_Para">By using Project Comapnion, you agree to comply with and be bound by these Terms. If you do not agree with any part of these terms, you must not use our Service.    </span>
                <span className="Terms_Head">Service Description</span>
                <span className="Terms_Para">Project Comapnion is an interactive chatbot platform that engages users in conversation, analyzes their mood based on chat interactions, and provides responses or suggestions tailored to the detected mood. The Service is intended for informational and entertainment purposes only and should not be used as a substitute for professional advice.</span>
                <span className="Terms_Head">User Responsibilities</span>
                <span className="Terms_Para">You must provide accurate information while interacting with our chatbot. You agree not to misuse our Service for any unlawful or harmful activities, including but not limited to harassment, abusive language, or spreading misinformation. You must be at least 18 years of age or have parental/guardian consent if you are younger.</span>
                <span className="Terms_Head">Privacy and Data Collection</span>
                <span className="Terms_Para">We collect chat data to provide personalized responses and mood analysis. We take privacy seriously and use industry-standard practices to protect your information. Chat data is stored securely and is used only to enhance your experience. We do not sell or share your data with third parties without your consent, except as required by law.</span>
                <span className="Terms_Head">Use of Cookies and Tracking Technologies</span>
                <span className="Terms_Para">Our platform may use cookies and other tracking technologies to enhance your experience. You can manage these settings in your browser, but some features may not work correctly if cookies are disabled.</span>
                <span className="Terms_Head">Limitation of Liability</span>
                <span className="Terms_Para">Project Comapnion provides mood analysis based on the chatbot's understanding of the conversation. It is not a medical tool, and the mood insights are not guaranteed to be accurate. The Service is not liable for any consequences, actions, or decisions users make based on the chatbot's responses. Users are advised to seek professional help for mental health issues or other concerns. </span>
                <span className="Terms_Head">Intellectual Property</span>
                <span className="Terms_Para">All content provided by Project Comapnion, including the chatbot interface, responses, and mood analysis features, are the intellectual property of Project Comapnion. You may not reproduce, distribute, or modify any part of our Service without our permission.</span>
                <span className="Terms_Head">Changes to Terms</span>
                <span className="Terms_Para">We reserve the right to modify or update these Terms at any time. Changes will be effective upon posting. Continued use of our Service after any changes indicates acceptance of the new Terms.</span>
                <span className="Terms_Head">Termination</span>
                <span className="Terms_Para">We reserve the right to suspend or terminate your access to the Service if you violate these Terms. We may also terminate the Service at any time without notice.</span>
                <span className="Terms_Head">Contact Us</span>
                <span className="Terms_Para">If you have any questions or concerns about these Terms, please contact us at [karan.p1@ahduni.edu.in].</span>
            </div>
        </div>
    );
}

export default Terms;