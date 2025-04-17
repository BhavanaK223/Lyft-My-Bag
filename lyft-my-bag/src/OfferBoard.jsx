import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import "./style.css";
import { TextLink } from "./TextLink";

export const OfferBoard = () => {
    const [trips, setTrips] = useState([]);
    useEffect(() => {
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
    

    return(
        <div className="page">
            {/*<div><Navbar /></div>*/}
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Offer Board</h1>
                {trips.length === 0 ? (
                    <p>No trips available yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trips.map((trip) => (
                        <div key={trip._id} className="card profile-card">
                        <h2 className="text-lg font-semibold mb-1">{trip.destinationName}</h2>
                        <p>{trip.address}</p>
                        <p><strong>{trip.email}</strong></p>
                        {/* <p><strong>Type:</strong> {trip.destinationType}</p> */}
                        <p><strong>Date:</strong> {trip.date} @ {trip.time}</p>
                        <p><strong>Duration:</strong> {trip.duration} {trip.durationType}</p>
                        
                        <p><strong>Seats:</strong> {trip.seatsAvailable}</p>
                        <p><strong>Compensation:</strong> ${trip.compensation}</p>
                        {trip.additionalNotes && (
                            <p className="italic mt-2 text-gray-600">Note: {trip.additionalNotes}</p>
                        )}
                        </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
        

    );
};