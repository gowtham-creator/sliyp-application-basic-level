import React from 'react';
import '../css/LandingScreen.css';
import {useNavigate} from "react-router-dom"; // Import your CSS file for styling

const LandingScreen = () => {
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/Home');
    };

    return (
        <div className="landing-screen">
            <div className="landing-content">
                <h1 className="company-name">
                    <span className="logo-text" onClick={handleLogoClick}>S</span>
                    <span className="logo-text" onClick={handleLogoClick}>L</span>
                    <span className="logo-text" onClick={handleLogoClick}>i</span>
                    <span className="logo-text" onClick={handleLogoClick}>Y</span>
                    <span className="logo-text" onClick={handleLogoClick}>P</span>
                </h1>
                <p className="company-slogan">One App For All Students</p>
            </div>
        </div>
    );
};

export default LandingScreen;
