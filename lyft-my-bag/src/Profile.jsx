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
                const updatedTrips = await fetch("http://localhost:5000/api/trips");
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
    

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    }
    

    return(
        <div className="dashboard">
            {user ? (
                <>
                    {/* <h2>Welcome, {user.firstName} {user.lastName}!</h2>
                    <p>Email: {user.email}</p>
                    <Link to="/request" className="login-button">
                        <div className="text-wrapper-4">Request a Ride</div>
                    </Link> */}

                    <header>
                        <div className="text-wrapper-2">LMB</div>

                        <button className="button-logout" onClick={handleLogout}>Log Out</button>
                    </header>

                    <div className="profile-display">
                        <div className="div-2">
                            <div className="profile-block">
                                <div className="text-wrapper-3">Profile</div>
                                <p>{user.firstName} {user.lastName}</p>
                                <a href="#">Profile Settings</a>
                            </div>

                            <div className="messages-block">
                                <div className="text-wrapper-3">Messages</div>
                            </div>
                        </div>

                        <div className="div-2">
                            <div className="div-3">
                                <div className="text-wrapper-3">Upcoming Trips (Driver)</div>
                                <div className="trips">
                                    {trips.length === 0 ? (
                                        <p>No upcoming trips</p>
                                    ) : (
                                        trips.map((trip) => (
                                            <div key={trip._id}>
                                                <h2>{trip.destinationName}</h2>
                                                <p><strong>Date:</strong> {trip.date}</p>
                                            </div>
                                        ))
                                    )
                                    } 
                                </div>
                                
                    
                                <a href="\request" className="button-instance">Create New Trip</a>
                            </div>

                            <div className="div-3">
                                <div className="text-wrapper-3">Upcoming Trips (Passenger)</div>
                                <div className="trips">
                                    {joinedTrips.length === 0 ? (
                                        <p>You haven’t joined any trips yet.</p>
                                    ) : (
                                        <ul className="space-y-4">
                                            {joinedTrips.map(trip => (
                                                <li key={trip._id}>
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
                                </div>
                                
                                <a href="/offer-board" className="button-instance">Find A Ride</a>
                            </div>

                            <div className="recent-trips-block">
                                <div className="text-wrapper-3">Recent Trips</div>
                                <p>No recent trips</p>
                            </div>
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