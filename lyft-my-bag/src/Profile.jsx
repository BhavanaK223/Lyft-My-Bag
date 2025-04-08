import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
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
            <div> {/* Create Navbar jsx file to make nav bar consistent => call function each page */}
                <Link to="/">Go to Home Page </Link>
                <Link to="/login">Login </Link>
                <Link to="/profile">Profile </Link>
            </div>
            {user ? (
                <>
                    <h2>Welcome, {user.firstName} {user.lastName}!</h2>
                    <p>Email: {user.email}</p>
                    <button onClick={handleLogout}>Logout</button>
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

export default Profile;