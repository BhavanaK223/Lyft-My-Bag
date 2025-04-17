import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import figure6 from "./figure-6.png";
import "./style.css";


export const Navbar = ({ className = "" }) => {
    return (
        <div className={`overlap-4 ${className}`}>
            <img className="header-img" alt="green wavy header" src={figure6} />

            <div className="text-wrapper-6">LMB</div>

            <div className="header-buttons">
                        {/*Profile button class*/}
                        <Link to="/profile" className="login-button">
                            <div className="text-wrapper-4">Profile</div>
                        </Link>

                        {/* Login Page*/}
                        <Link to="/login" className="login-button">
                            <div className="text-wrapper-4">Login</div>
                        </Link>

                        {/*request a trip page*/}
                        <Link to="/request" className="login-button">
                            <div className="text-wrapper-4">Request</div>
                        </Link>
                        {/*offer board page*/}
                        <Link to="/offer-board" className="login-button">
                            <div className="text-wrapper-4">Offer Board</div>
                        </Link>
                        {/*home page
                        Link to="/offer-board" className="login-button">
                            <div className="text-wrapper-4">Chat</div>
                        </Link>
                        
                        */}
            </div>
        </div>
    )
};
