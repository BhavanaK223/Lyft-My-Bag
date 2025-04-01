import React, {useState} from "react";
import { Link } from "react-router-dom";
import { TextLink } from "./TextLink";

export const Profile = () => {

    return(

        
        <div className="page">
            <div>
                <Link to="/">Go to Home Page </Link>
                <Link to="/login">Login </Link>
                <Link to="/profile">Profile </Link>
            </div>
            <h1>My Profile</h1>
            <h2>Welcome to your profile!</h2>
            <p>Here you can view and edit your personal information.</p>
            <TextLink text="Edit Profile" link="/edit-profile" />
            <TextLink text="View Trips" link="/view-trips" />
            <TextLink text="Settings" link="/settings" />
        </div>

    );
};

export default Profile;