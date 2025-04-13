import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";


export const Navbar = ({ className = "" }) => {
    return (
        <div className={`header-buttons ${className}`}>

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

        </div>
    )
};
