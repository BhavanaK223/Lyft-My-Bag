import React, {useState} from "react";
import { Link } from "react-router-dom";
import { TextLink } from "./TextLink";
import gatorBlur2 from "./public/gator-blur-2.png";
import "./style.css";

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Prepare login data
      const loginData = {
        username,
        password,
      };
  
      try {
        // Send POST request to Flask backend
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          // Login successful
          setSuccessMessage(result.message);
          setErrorMessage('');
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
        <div className="login-page">
            <div className="form-log-in">
                <img className="gator-blur" alt="Gator blur" src={gatorBlur2} />

                <div className="div">Welcome Back!</div>
                <Link to="/">Go to Home Page</Link>

                <div className="p">Please enter your information below:</div>
                <form onSubmit={handleSubmit}>
                    <div className="input-field">
                        <label for="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            placeholder="example@ufl.edu"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label for="password">Password</label>
                        <input 
                            type="text" 
                            id="password" 
                            placeholder="GLID password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            />
                        <div>
                            <button type= "submit" id="sign_in">Sign in</button>
                        </div>
                    </div> 
                </form>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                <TextLink className="text-link-instance" text="New User? Register Here!" />
            </div>
        </div>
    );
};
export default LoginPage;
