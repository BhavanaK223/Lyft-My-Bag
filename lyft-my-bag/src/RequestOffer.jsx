import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { TextLink } from "./TextLink";


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

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        // Handle form submission logic here
        console.log(data);
        // Reset the form after submission
        //navigate('/profile'); // Redirect to profile page after submission
    }

    //const resetForm = () => {
    //    reset();
    //};

    return (

        <div>
            <div>          
                <Link to="/login">Login</Link><br />
                <Link to="/profile">Profile</Link><br />
                <Link to="/request">Request</Link><br />
            </div>

            {/* <img src="https://www.shutterstock.com/image-vector/cute-crocodile-business-holding-suitcase-600nw-2223279211.jpg"
                width="200"
                height="200"
            /> */}
             {user ? (
                <>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Create New Trip</h2>
                    <label>Date:</label><br />
                        <input type="text" id="date" name="date" placeholder="MM/DD/YYYY"/><br />
                    <label>Time:</label><br />
                        <input type="time" id="time" value={time} onChange={handleTimeChange} /><br />
                    <label>Expected Duration:</label><br />
                    <input type="number" id="duration" name="duration" placeholder="2"/>
                        <select id="myDropdown">
                            <option value="">Select...</option>
                            <option value="time1">Minutes</option>
                            <option value="time2">Hours</option>
                        </select><br />
                    <label htmlFor="fname">Destination Type:</label><br />
                    <select id="myDropdown">
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
                        <input type="text" id="destinationName" name="destinationName" /><br />
                    <label htmlFor="lname">Address:</label><br />
                        <input type="text" id="address" name="address" placeholder="EX) 123 Main St., Gainesville"/><br />
                    <label htmlFor="lname">How much would you like to be compensated for gas ($)</label><br />
                        <input type="text" id="compensation" name="compensation" /><br />
                    <label htmlFor="lname">How many seats are available:</label><br />
                        <input type="number" id="seatsAvailable" name="seatsAvailable" placeholder="2"/><br />
                    <label htmlFor="lname">Additional Notes:</label><br />
                        <input type="text" id="additionalNotes" name="additionalNotes" placeholder="Optional Text"/><br />
                        <button type="button" onClick={() => reset()}>Cancel x</button>
                        <button type="submit">Submit Form</button>
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