import React, {useState} from "react";
import { Link } from "react-router-dom";
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

    const toggleForm = () => setIsRegistering(!isRegistering);

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

            const data = await response.json();
            alert(data.message || data.error);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className ="login-page">
          <div className="form-log-in">
            <img className="gator-blur" alt="Gator blur" src={gatorBlur2} />
            <div className="div">Welcome Back!</div>
            <Link to="/">Go to Home Page</Link>
            <h2>{isRegistering ? "Register" : "Login"}</h2>
            <div className="p">Please enter your information below:</div>
            <div className = "input-field">
            <form onSubmit={handleSubmit}>
                {isRegistering ? (
                    <>
                      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
                      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
                      <input type="text" name="registeredEmail" placeholder="example@ufl.edu" onChange={handleChange} required />
                      <input type="text" name="registeredPassword" placeholder="Password" onChange={handleChange} required />
                    </>
                ) : (
                    <>
                      <input type="text" name="email" placeholder="example@ufl.edu" onChange={handleChange} required />
                      <input type="text" name="password" placeholder="Password" onChange={handleChange} required />
                    </>
                )}
                <button type="submit">{isRegistering ? "Register" : "Login"}</button>
            </form>
            <button onClick={toggleForm}>
                {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
            </button>
            </div>
          </div>
        </div>
    );
};

export default LoginPage;
