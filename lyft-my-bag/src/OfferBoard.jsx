import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import "./OfferBoard.css";
import { TextLink } from "./TextLink";
import { TripDisplay } from "./TripDisplay";
import figure6 from "./figure-6.png"

export const OfferBoard = () => {
    const [trips, setTrips] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            setUserEmail(parsed.email); // ✅ Store the logged-in user's email
        }

        const fetchTrips = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/trips");
                const data = await response.json();
                setTrips(data);
            } catch (error) {
                console.error("Error fetching trips:", error);
            }
        }

        fetchTrips();
    }, []);
    
    const handleJoinTrip = async (tripId) => {
        if (!userEmail) {
            alert("You must be logged in to join a trip");
            return;
        }
    
        try {
            const res = await fetch("http://localhost:5000/join-trip", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ trip_id: tripId, rider_email: userEmail })
            });
    
            const data = await res.json();
    
            if (res.ok) {
                alert("Successfully joined trip!");
                // Refresh trip data to update seat count
                const updatedTrips = await fetch("http://localhost:5000/api/trips");
                const updatedData = await updatedTrips.json();
                setTrips(updatedData);
                navigate("/profile"); 
            } else {
                alert(data.error || "Something went wrong");
            }
        } catch (err) {
            console.error("Error joining trip:", err);
            alert("Could not join trip");
        }
    };

    const handleLeaveTrip = async (tripId) => {
        if (!userEmail) {
            alert("You must be logged in to leave a trip");
            return;
        }
    
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
            } else {
                alert(data.error || "Something went wrong");
            }
        } catch (err) {
            console.error("Error leaving trip:", err);
            alert("Could not leave trip");
        }
    };
    
    return(
        <div className="available-rides">
            <div className="overlap-wrapper">
                <div className="overlap">
                    <header className="header">
                        <div className="overlap-group-3">
                            <img className="header-img" alt="green wavy header" src={figure6} />

                            <div className="text-wrapper-3">LMB</div>

                            <div className="header-buttons">
                                <button className="dashboard-button">
                                    <a href="/profile" className="text-wrapper-4">Dashboard</a>
                                </button>

                                <button className="create-button">
                                    <a href="/request" className="text-wrapper-5">Create New Trip</a>
                                </button>
                            </div>
                        </div>
                    </header>

                    <div className="sidebar">
                        <div className="search-bar">
                            <div className="state-layer-2">
                                <div className="content">
                                    <div className="supporting-text">Search available rides</div>
                                </div>

                                {/* search icon here */}
                            </div>
                        </div>

                        <div className="filters-destination">
                            Filters <br />
                            Destination Type <br />
                            Date <br />
                            Time <br />
                            Duration <br />
                            Gas Money
                        </div>
                    </div>

                    <div className="results-section">
                        <div className="text-wrapper-2">Available Rides</div>

                        {trips.length === 0 ? (
                            <div className="button-group">
                                <p className="p">No trips yet</p>
                                        <Link to="/login" className="login-button">
                                            <div className="text-wrapper-4">Create New Trip</div>
                                        </Link>
                                                                        
                                    </div>
                        ) : (
                            <div className="grid">
                            {trips.map((trip) => (
                                <div key={trip._id} className="card profile-card">
                                    <h2 className="text-lg font-semibold mb-1">{trip.destinationName}</h2>
                                    <p>{trip.address}</p>
                                    <p><strong>{trip.firstName} {trip.lastName?.charAt(0)}</strong></p>
                                    {/* <p><strong>Type:</strong> {trip.destinationType}</p> */}
                                    <p><strong>Date:</strong> {trip.date} @ {trip.time}</p>
                                    <p><strong>Duration:</strong> {trip.duration} Hours</p>
                                    
                                    <p><strong>Seats:</strong> {trip.seatsAvailable}</p>
                                    <p><strong>Compensation:</strong> ${trip.compensation}</p>
                                    
                                    {/* <Link to="/profile" className="login-button">
                                        <div className="text-wrapper-4">Request</div>
                                    </Link> */}
                                    {trip.email !== userEmail && // not the trip owner
                                    !trip.riders?.includes(userEmail) && // not already joined
                                    trip.seatsAvailable > 0 && ( // trip not full
                                        <button onClick={() => handleJoinTrip(trip._id)} className="login-button"> 
                                            Join Trip
                                        </button>
                                    )}
                                    {trip.riders?.includes(userEmail) && (
                                        <div>
                                            <p>You have joined this trip!</p>
                                        <button onClick={() => handleLeaveTrip(trip._id)} className="login-button">
                                            Leave Trip
                                        </button>
                                        </div>
                                        
                                    )}
                                    {trip.email === userEmail && (
                                        <p>You created this trip!</p>
                                    )}

                                    {trip.additionalNotes && (
                                        <p className="italic mt-2 text-gray-600">Note: {trip.additionalNotes}</p>
                                    )}
                                </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Offer Board</h1>
                {/* {trips.length === 0 ? (
                    <div className="button-group">
                        <p className="p">No trips yet</p>
                                <Link to="/login" className="login-button">
                                    <div className="text-wrapper-4">Create New Trip</div>
                                </Link>
                                                                
                            </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trips.map((trip) => (
                        <div key={trip._id} className="card profile-card">
                        <h2 className="text-lg font-semibold mb-1">{trip.destinationName}</h2>
                        <p>{trip.address}</p>
                        <p><strong>{trip.firstName} {trip.lastName?.charAt(0)}</strong></p>
                        {/* <p><strong>Type:</strong> {trip.destinationType}</p> 
                        <p><strong>Date:</strong> {trip.date} @ {trip.time}</p>
                        <p><strong>Duration:</strong> {trip.duration} Hours</p>
                        
                        <p><strong>Seats:</strong> {trip.seatsAvailable}</p>
                        <p><strong>Compensation:</strong> ${trip.compensation}</p>
                        
                        <Link to="/profile" className="login-button">
                            <div className="text-wrapper-4">Request</div>
                        </Link> 
                        {trip.email !== userEmail && // not the trip owner
                        !trip.riders?.includes(userEmail) && // not already joined
                        trip.seatsAvailable > 0 && ( // trip not full
                            <button onClick={() => handleJoinTrip(trip._id)} className="login-button"> 
                                Join Trip
                            </button>
                        )}
                        {trip.riders?.includes(userEmail) && (
                            <div>
                                <p>You have joined this trip!</p>
                            {/* <button onClick={() => handleLeaveTrip(trip._id)} className="login-button">
                                Leave Trip
                            </button> 
                            </div>
                            
                            <p><strong>Seats:</strong> {trip.seatsAvailable}</p>
                            <p><strong>Compensation:</strong> ${trip.compensation}</p>
                            
                            {/* <Link to="/profile" className="login-button">
                                <div className="text-wrapper-4">Request</div>
                            </Link> 
                            {trip.email !== userEmail && // not the trip owner
                            !trip.riders?.includes(userEmail) && // not already joined
                            trip.seatsAvailable > 0 && ( // trip not full
                                <button onClick={() => handleJoinTrip(trip._id)} className="login-button"> 
                                    Join Trip
                                </button>
                            )}
                            {trip.riders?.includes(userEmail) && (
                                <div>
                                    <p>You have joined this trip!</p>
                                <button onClick={() => handleLeaveTrip(trip._id)} className="login-button">
                                    Leave Trip
                                </button>
                                </div>
                                
                            )}
                            {trip.email === userEmail && (
                                <p>You created this trip!</p>
                            )}

                            {trip.additionalNotes && (
                                <p className="italic mt-2 text-gray-600">Note: {trip.additionalNotes}</p>
                            )}
                        </div>
                        ))}
                    </div>
                )} 
            </div>*/}
        </div>

    );
};