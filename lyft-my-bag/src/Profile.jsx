import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import "./Profile.css";
import { TextLink } from "./TextLink";
import { set } from "react-hook-form";

export const Profile = () => {
    //const [activeTab, setActiveTab] = useState('Profile');
    const [user, setUser] = useState(null);
    const [trips, setTrips] = useState([]);
    const [joinedTrips, setJoinedTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const storedUser = localStorage.getItem('user');

    useEffect(() => {
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
                    fetch(`http://localhost:5000/api/user-trips?email=${email}`)
                    .then(res => res.json())
                    .then(tripData => {
                        setTrips(tripData);
                    })
                    .catch(err => {
                        console.error("Error fetching user trips:", err);
                    });
                     // Fetch trips the user joined
                    fetch("http://localhost:5000/api/joined-trips", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({email})
                    })
                    .then(res => res.json())
                    .then(joined => {
                        setJoinedTrips(joined);
                    })
                    .catch(err => {
                        console.error("Error fetching joined trips:", err);
                    });
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

    const handleLeaveTrip = async (tripId) => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            alert("You must be logged in to leave a trip");
            return;
        }
        const userEmail = JSON.parse(storedUser).email;
    
        try {
            const res = await fetch("http://localhost:5000/leave-trip", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ trip_id: tripId, rider_email: userEmail })
            });
    
            const data = await res.json();
    
            if (res.ok) {
                alert("Successfully left trip!");
                // Refresh trip data to update seat count
                const updatedTrips = await fetch("http://localhost:5000/api/joined-trips");
                const updatedData = await updatedTrips.json();
                setTrips(updatedData);
                navigate(0);
            } else {
                alert(data.error || "Something went wrong");
            }
        } catch (err) {
            console.error("Error leaving trip:", err);
            alert("Could not leave trip");
        }
    };
    
    const handleRemoveTrip = async (tripId) => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            alert("You must be logged in to remove a trip");
            return;
        }
        const userEmail = JSON.parse(storedUser).email;

        try {
            const res = await fetch("http://localhost:5000/api/remove-trip", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ trip_id: tripId, email: userEmail})
            });
    
            const data = await res.json();
    
            if (res.ok) {
                alert("Successfully deleted trip!");
                // Refresh trip data to update seat count
                const updatedTrips = await fetch("http://localhost:5000/api/user-trips?email=" + userEmail);
                const updatedData = await updatedTrips.json();
                setTrips(updatedData);
            } else {
                alert(data.error || "Something went wrong");
            }
        } catch (err) {
            console.error("Error deleting trip:", err);
            alert("Could not delete trip");
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    }
    

    return(
        <div className="page">
            {user ? (
                <>
                    <button onClick={handleLogout}>Logout</button>
                    <div className="dashboard">
                        <div className="dashboard-left">
                            <div className="card profile-card">Profile
                                <p>{user.firstName} {user.lastName}</p>
                                <a href="#">Profile Settings</a>
                            </div>
                        </div>
                        <div className="dashboard-right">
                            <div className="card trips-driver-card">Upcoming Trips (Driver)
                                {/*list the upcoming trips*/}
                                {trips.length === 0 ? (
                                    <p>No upcoming trips</p>
                                ) : (
                                    trips.map((trip) => (
                                        <div key={trip._id} className="card trip-card">
                                            <h2>{trip.destinationName}</h2>
                                            <p><strong>Date:</strong> {trip.date}</p>
                                            <button onClick={() => handleRemoveTrip(trip._id)} className="login-button">
                                                   Delete Trip
                                             </button>
                                            
                                        </div>
                                    ))
                                )
                                }
                                <Link to="/request" className="login-button">
                                    <div className="text-wrapper-4">Create New Trip</div>
                                </Link>
                            </div>
                            <div className="card trips-passenger-card">Upcoming Trips (Passenger)
                            {joinedTrips.length === 0 ? (
                                    <p>You haven’t joined any trips yet.</p>
                                ) : (
                                    <ul className="space-y-4">
                                        {joinedTrips.map(trip => (
                                            <li key={trip._id} className="card trip-card">
                                                <h2>{trip.destinationName}</h2>
                                                <p><strong>Date:</strong> {trip.date}</p>
                                                <p><strong>Time:</strong> {trip.time}</p>
                                                <p><strong>Driver:</strong> {trip.email}</p>
                                                <div>
                                                <button onClick={() => handleLeaveTrip(trip._id)} className="login-button">
                                                    Leave Trip
                                                </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
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