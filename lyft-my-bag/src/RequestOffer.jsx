import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import gatorBlur2 from "./public/gator-blur-2.png";
import "./style.css";


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
    const [time, setTime] = useState('');
    const handleTimeChange = (event) => {
      setTime(event.target.value);
    };

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { reset } = useForm();
    const [formData, setFormData] = useState({
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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        // Handle form submission logic here
        e.preventDefault();

        const url = "http://localhost:5000/offer";
        const payload = {
            date: formData.date,
            time: formData.time,  
            duration: formData.duration,
            durationType: formData.durationType,
            destinationType: formData.destinationType,
            destinationName: formData.destinationName,
            address: formData.address,
            compensation: formData.compensation,
            seatsAvailable: formData.seatsAvailable,
            additionalNotes: formData.additionalNotes  
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
  
            if (response.ok) {
              // Login successful
              setSuccessMessage(result.message);
              setErrorMessage('');
                localStorage.setItem("user", JSON.stringify(result.user)); // Store user data
                navigate("/offer-board"); // Redirect to dashboard

            } else {
              // Error handling
              setErrorMessage(result.error || 'An unknown error occurred');
              setSuccessMessage('');
            }
          } catch (error) {
            setErrorMessage('Failed to connect to the server');
            setSuccessMessage('');
          }
    }



    return (

        <div>
            <div>          
                <Link to="/login">Login</Link><br />
                <Link to="/profile">Profile</Link><br />
                <Link to="/request">Request</Link><br />
            </div>
             {user ? (
                <>
                <form onSubmit={handleSubmit}>
                    <h2>Create New Trip</h2>
                    <label>Date:</label><br />
                        <input type="text" id="date" name="date" placeholder="MM/DD/YYYY"  onChange={handleChange} required/><br />
                    <label>Time:</label><br />
                        <input type="time" id="time" name="time" value={time} onChange={handleTimeChange} required/><br />
                    <label>Expected Duration:</label><br />
                    <input type="number" id="duration" name="duration" placeholder="2"  onChange={handleChange} required/>
                        <select id="myDropdown" name="durationType"  onChange={handleChange} required>
                            <option value="">Select...</option>
                            <option value="time1">Minutes</option>
                            <option value="time2">Hours</option>
                        </select><br />
                    <label htmlFor="fname">Destination Type:</label><br />
                    <select id="myDropdown" name="destinationType"  onChange={handleChange} required>
                        <option value="">Select...</option>
                        <option value="grocery">Grocery</option>
                        <option value="library">Library</option>
                        <option value="gym">Gym</option>
                        <option value="airport">Airport</option>
                        <option value="hostpital">Hospital/Doctor</option>
                        <option value="school">School</option>
                        <option value="downtown">Downtown</option>
                        <option value="option5">Other</option>
                    </select><br />
                    <label htmlFor="fname">Destination Name:</label><br />
                        <input type="text" id="destinationName" name="destinationName" onChange={handleChange} required/><br />
                    <label htmlFor="lname">Address:</label><br />
                        <input type="text" id="address" name="address" placeholder="EX) 123 Main St., Gainesville" onChange={handleChange} required/><br />
                    <label htmlFor="lname">How much would you like to be compensated for gas ($)</label><br />
                        <input type="text" id="compensation" name="compensation"  onChange={handleChange} required /><br />
                    <label htmlFor="lname">How many seats are available:</label><br />
                        <input type="number" id="seatsAvailable" name="seatsAvailable" placeholder="2"  onChange={handleChange} required/><br />
                    <label htmlFor="lname">Additional Notes:</label><br />
                        <input type="text" id="additionalNotes" name="additionalNotes" placeholder="Optional Text"  onChange={handleChange}/><br />
                    <button type="submit">Submit</button>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                </form>
                </>
            ) : (
                <>
                    <h2>You are not logged in</h2>
                    <a href="/login">Go to Login</a>
                </>
            )}


        </div>
    );
};
export default RequestOffer