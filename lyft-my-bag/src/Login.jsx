import React, {useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { TextLink } from "./TextLink";
import gatorBlur2 from "./public/gator-blur-2.png";
import "./style.css";

export const LoginPage = () => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        registeredEmail: "",
        registeredPassword: "",
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const toggleForm = () => setIsRegistering(!isRegistering);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the form is for registration or login
        const url = isRegistering ? "http://localhost:5000/register" : "http://localhost:5000/login";
        const payload = isRegistering
            ? { firstName: formData.firstName, lastName: formData.lastName, registeredEmail: formData.registeredEmail, registeredPassword: formData.registeredPassword }
            : { email: formData.email, password: formData.password };

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
              if (!isRegistering) {
                localStorage.setItem("user", JSON.stringify(result.user)); // Store user data
                navigate("/profile"); // Redirect to dashboard
              }
            } else {
              // Error handling
              setErrorMessage(result.error || 'An unknown error occurred');
              setSuccessMessage('');
            }
          } catch (error) {
            setErrorMessage('Failed to connect to the server');
            setSuccessMessage('');
          }
    };

    return (
        <div className ="login-page">
          <div className="form-log-in">
            <img className="gator-blur" alt="Gator blur" src={gatorBlur2} />
            <Link to="/">Go to Home Page </Link>
            <h2>{isRegistering ? "Welcome Back!" : "Create an Account"}</h2>
            <div className="p">Please enter your information below:</div>
            <form onSubmit={handleSubmit}>
                {isRegistering ? (
                    <>
                    <div className="input-field">
                      <label>First Name</label>
                      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
                      <label>Last Name</label>
                      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
                      <label>Email</label>
                      <input type="text" name="registeredEmail" placeholder="example@ufl.edu" onChange={handleChange} required />
                      <label>Password</label>
                      <input type="text" name="registeredPassword" placeholder="Password" onChange={handleChange} required />
                    </div>
                    </>
                ) : (
                    <>
                    <div className="input-field">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="example@ufl.edu" onChange={handleChange} required />
                        <label>Password</label>
                        <input type="text" name="password" placeholder="Password" onChange={handleChange} required />
                    </div>
                    </>
                )}
                    <button type="submit">{isRegistering ? "Register" : "Login"}
                        <Link to="/profile">Profile</Link>
                    </button>
                    
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <button onClick={toggleForm}>
                {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
            </button>
          </div>
        </div>
    );
};

export default LoginPage;
