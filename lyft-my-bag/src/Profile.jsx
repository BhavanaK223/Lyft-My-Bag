import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import "./style.css";
import { TextLink } from "./TextLink";

export const Profile = () => {
    //const [activeTab, setActiveTab] = useState('Profile');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if(storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    }
    

    return(
        <div className="page">
            <div><Navbar /></div>
            {user ? (
                <>
                    <h2>Welcome, {user.firstName} {user.lastName}!</h2>
                    <p>Email: {user.email}</p>
                    <Link to="/request" className="login-button">
                        <div className="text-wrapper-4">Request a Ride</div>
                    </Link>

                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                        <h2>You are not logged in</h2>
                    
                </>
            )}
        </div>

    );
};

export default Profile;

{/* }
import React from "react";
import { TextLink } from "./TextLink";
// import { TripDisplay } from "./TripDisplay";
import "./style.css";
//<Avatar initials="A" size="large" />

export const TripDisplay = ({ className }) => {
    return (
        <div className={`trip-display ${className}`}>
            <div className="trip-info">
                <div className="div">3/15</div>
                <div className="text-wrapper-2">Target</div>
            </div>
            <TextLink className="text-link-instance" text="View Details" />
        </div>
    )
}

export const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="div-2">
                <div className="messages-block">
                    <div className="text-wrapper-2">Messages</div>

                    <div className="avatar-block-2">
                        happy
                        <div className="div-wrapper">
                            <div className="text-wrapper-3">Latest Message</div>
                        </div>
                    </div>

                    {/* }
                    <div className="avatar-block-2">
                        <Avatar
                            initials="A"
                            initialsClassName="design-component-instance-node"
                            shape="circle"
                            size="large"
                            type="initial"
                        />
                        <div className="div-wrapper">
                            <div className="text-wrapper-3">Latest Message</div>
                        </div>
                    </div>

                    <div className="avatar-block-2">
                        <Avatar
                            initials="A"
                            initialsClassName="design-component-instance-node"
                            shape="circle"
                            size="large"
                            type="initial"
                        />
                        <div className="div-wrapper">
                            <div className="text-wrapper-3">Latest Message</div>
                        </div>
                    </div>

                    <div className="avatar-block-2">
                        <Avatar
                            initials="A"
                            initialsClassName="design-component-instance-node"
                            shape="circle"
                            size="large"
                            type="initial"
                        />
                        <div className="div-wrapper">
                            <div className="text-wrapper-3">Latest Message</div>
                        </div>
                    </div>

                    <div className="avatar-block-2">
                        <Avatar
                            initials="A"
                            initialsClassName="design-component-instance-node"
                            shape="circle"
                            size="large"
                            type="initial"
                        />
                        <div className="div-wrapper">
                            <div className="text-wrapper-3">Latest Message</div>
                        </div>
                    </div>*/}
{/* }
                </div>

                <div className="profile-block">
                        <div className="text-wrapper-4">Profile</div>
                        {/* <AvatarBlock
                        avatarInitials="A"
                        avatarInitialsClassName="design-component-instance-node"
                        avatarType="initial"
                        className="design-component-instance-node-3"
                        description="XXX lbs carbon saved"
                        infoClassName="avatar-block-instance"
                        title="Albert"
                    />*/}
{/* }
                    <TextLink
                        className="design-component-instance-node-2"
                        text="Profile Settings"
                    />
                </div>

                <div className="text-wrapper-4">LMB</div>

                <div className="right-display">
                    <div className="div-3">
                        <div className="text-wrapper-2">Upcoming Trips (Driver)</div>

                        <TripDisplay className="design-component-instance-node-3" />
                        <TripDisplay
                            className="design-component-instance-node-3"
                            text="3/22"
                            text1="Walmart"
                        />
                        <Button
                            className="button-instance"
                            labelText="Create New Trip"
                            labelTextClassName="button-2"
                            showIcon={false}
                            style="filled"
                        />
                    </div>

                    <div className="div-3">
                        <div className="text-wrapper-2">Upcoming Trips (Passenger)</div>

                        <div className="text-wrapper-5">No upcoming trips</div>
                            {/* }
                        <Button
                            className="button-instance"
                            labelText="Find a Ride"
                            labelTextClassName="button-2"
                            showIcon={false}
                            style="filled"
                        />*/}

{/* }
                    </div>

                    <div className="recent-trips-block">
                        <div className="text-wrapper-2">Recent Trips</div>

                        <TripDisplay
                            className="design-component-instance-node-3"
                            text="3/8"
                            text1="Trader Joe�s"
                            textLinkText="Rate Trip"
                        />
                    </div>
                </div>
            </div>
            </div>

    );
};
*/}