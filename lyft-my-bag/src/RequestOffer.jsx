import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextLink } from "./TextLink";


const RequestOffer = () => {
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
    

    //Handle Time Change
    const [time, setTime] = useState('');
    const handleTimeChange = (event) => {
      setTime(event.target.value);
    };



    return (

        <div>
            <div>          
                <Link to="/login">Login</Link><br />
                <Link to="/profile">Profile</Link><br />
                <Link to="/request">Request</Link><br />
            </div>

            <img src="https://www.shutterstock.com/image-vector/cute-crocodile-business-holding-suitcase-600nw-2223279211.jpg"
                width="200"
                height="200"
            />
             {user ? (
                <>
                <form>
                    <h2>Create New Trip</h2>
                    <label>Date:</label><br />
                        <input type="text" id="date" name="date"  placeholder="MM/DD/YYYY"/><br />
                    <label>Time:</label><br />
                        <input type="time" id="time" value={time} onChange={handleTimeChange} /><br />
                    <label>Expected Duration:</label><br />
                    <input type="number" id="duration" name="duration" placeholder="2"/>
                        <select id="myDropdown">
                            <option value="">--Please choose an option--</option>
                            <option value="option1">Minutes</option>
                            <option value="option2">Hours</option>
                        </select><br />
                    <label htmlFor="fname">Destination Name:</label><br />
                        <input type="text" id="fname" name="fname" /><br />
                    <label htmlFor="lname">Address:</label><br />
                        <input type="text" id="lname" name="lname" placeholder="EX) 123 Main St., Gainesville"/><br />
                    <label htmlFor="lname">How much would you like ot be compensated for gas ($)</label><br />
                        <input type="text" id="lname" name="lname" /><br />
                    <label htmlFor="lname">How many seats are available:</label><br />
                        <input type="number" id="lname" name="lname" placeholder="2"/><br />
                    <label htmlFor="lname">Additional Notes:</label><br />
                        <input type="text" id="lname" name="lname" placeholder="Optional Text"/><br />
                    <input type="submit" value="Cancel"/>
                    <input type="submit" value="Request" />
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