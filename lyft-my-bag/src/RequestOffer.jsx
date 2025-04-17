import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { Navbar } from "./Navbar";
import gatorBlur2 from "./public/gator-blur-2.png";
import "./RequestOffer.css";


const RequestOffer = () => {
    //user information
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if(storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
  

    //Handle Time Change
    // const [time, setTime] = useState('');
    // const handleTimeChange = (event) => {
    //   setTime(event.target.value);
    // };

    const { reset } = useForm();
    const [tripData, setTripData] = useState({
        date: "",
        time: "",
        duration: "",
        durationType: "",
        destinationType: "",
        destinationName: "",
        address: "",
        compensation: "",
        seatsAvailable: "", 
        additionalNotes: ""
    });

    const handleChange = (e) => {
        setTripData({ ...tripData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = "http://localhost:5000/requests";
        const payload = {
            email: user.email,
            date: tripData.date,
            time: tripData.time,
            duration: tripData.duration,
            durationType: tripData.durationType,
            destinationType: tripData.destinationType,
            destinationName: tripData.destinationName,
            address: tripData.address,
            compensation: tripData.compensation,
            seatsAvailable: tripData.seatsAvailable,
            additionalNotes: tripData.additionalNotes
        };

        try{
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (response.ok) {
              alert("Trip created!");
              reset();
            } else {
              console.error(data);
            }
        }catch (error) {
            console.error("Error:", error);
        }  
        reset(); // Reset the form fields after submission   
    };


    return (

        <div>
            {/* <div>          
                <Link to="/login">Login</Link><br />
                <Link to="/profile">Profile</Link><br />
                <Link to="/request">Request</Link><br />
            </div> */}
             {user ? (
                <>
                <div className="create-new-trip">
                    <div className="trip-form">
                        <h2 className="legend div">Create New Trip</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="frame">
                                <div className="div-2">
                                    <label className="text-wrapper-2">Date:</label>
                                    <input className="input" type="text" id="date" name="date" placeholder="MM/DD/YYYY"  onChange={handleChange} required/>
                                </div>

                                <div className="div-2">
                                    <label className="text-wrapper-2">Time:</label>
                                    <input className="select" type="time" id="time" name="time" onChange={handleChange} required/>
                                </div>

                                <div className="div-2">
                                    <label className="text-wrapper-2">Expected Duration (hrs):</label>
                                    <input className="input" type="number" id="duration" name="duration" placeholder="2"  onChange={handleChange} required/>
                                    {/* <select id="myDropdown" name="durationType"  onChange={handleChange} required>
                                        <option value="">Select...</option>
                                        <option value="time1">Minutes</option>
                                        <option value="time2">Hours</option>
                                    </select> */}
                                </div>
                            </div>
                            
                            <div className="frame">
                                <div className="div-3">
                                    <label htmlFor="fname">Destination Type:</label>
                                    <select className="select-2" id="myDropdown" name="destinationType"  onChange={handleChange} required>
                                        <option value="">Select...</option>
                                        <option value="grocery">Grocery</option>
                                        <option value="library">Library</option>
                                        <option value="gym">Gym</option>
                                        <option value="airport">Airport</option>
                                        <option value="hostpital">Hospital/Doctor</option>
                                        <option value="school">School</option>
                                        <option value="downtown">Downtown</option>
                                        <option value="option5">Other</option>
                                    </select>
                                </div>

                                <div className="div-3">
                                    <label htmlFor="fname">Destination Name:</label>
                                    <input type="text" id="destinationName" name="destinationName" onChange={handleChange} required/>
                                </div>
                            </div>
                            
                            <div className="div-4">
                                <label htmlFor="lname">Address:</label>
                                <input type="text" id="address" name="address" placeholder="EX) 123 Main St., Gainesville" onChange={handleChange} required/>
                            </div>

                            <div className="frame">
                                <div className="div-3">
                                    <label htmlFor="lname">Gas Compensation ($)</label>
                                    <input type="text" id="compensation" name="compensation" placeholder="0+"  onChange={handleChange} required />
                                </div>

                                <div className="div-3">
                                    <label htmlFor="lname">How many seats are available:</label>
                                    <input type="number" id="seatsAvailable" name="seatsAvailable" placeholder="2"  onChange={handleChange} required/>
                                </div>
                            </div>

                            <div className="div-4">
                                <label htmlFor="lname">Additional Notes:</label>
                                <input type="text" id="additionalNotes" name="additionalNotes" placeholder="Optional Text"  onChange={handleChange}/>
                            </div>
                            
                            <div className="button-group">
                                <Link to="/profile" className="button">
                                    <button className="button-2">Cancel</button>
                                </Link>
                                
                                <div className="button-wrapper">
                                    <button className="button-3" type="submit">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                </div>
                
                </>
            ) : (
                <>
                    <h2>You are not logged in</h2>
                        <Link to="/login" className="login-button">
                            <div className="text-wrapper-4">Login</div>
                        </Link>
                        {/*<a href="/login">Go to Login</a>*/}
                </>
            )}

        </div>
    );
};
export default RequestOffer