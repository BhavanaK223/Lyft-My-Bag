import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import "./style.css";
import { TextLink } from "./TextLink";
import { set } from "react-hook-form";

export const Profile = () => {
    //const [activeTab, setActiveTab] = useState('Profile');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const storedUser = localStorage.getItem('user');
    //     if(storedUser) {
    //         setUser(JSON.parse(storedUser));
    //     }
    //     setLoading(false);
    // }, []);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const email = JSON.parse(storedUser).email;
    
            fetch("http://localhost:5000/profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    console.error(data.error);
                    setUser(null);
                } else {
                    setUser(data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching profile:', err);
                setLoading(false);
            });
        }else{
            setLoading(false);
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
                    {/* <h2>Welcome, {user.firstName} {user.lastName}!</h2>
                    <p>Email: {user.email}</p>
                    <Link to="/request" className="login-button">
                        <div className="text-wrapper-4">Request a Ride</div>
                    </Link> */}

                    <button onClick={handleLogout}>Logout</button>
                    <div className="dashboard">
                        <div className="dashboard-left">
                            <div className="card profile-card">Profile
                                <p>{user.firstName} {user.lastName}</p>
                                <a href="#">Profile Settings</a>
                            </div>
                            <div className="card messages-card">Messages</div>
                        </div>
                        <div className="dashboard-right">
                            <div className="card trips-driver-card">Upcoming Trips (Driver)
                                <Link to="/request" className="login-button">
                                    <div className="text-wrapper-4">Create New Trip</div>
                                </Link>
                            </div>
                            <div className="card trips-passenger-card">Upcoming Trips (Passenger)
                                <Link to="/offer-board" className="login-button">
                                    <div className="text-wrapper-4">Find a Ride</div>
                                </Link>
                            </div>
                            <div className="card recent-trips-card">Recent Trips</div>
                        </div>
                    </div>

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