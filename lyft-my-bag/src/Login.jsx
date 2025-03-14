import React from "react";
import { Link } from "react-router-dom";
import { TextLink } from "./TextLink";
import gatorBlur2 from "./public/gator-blur-2.png";
import "./style.css";

export const LoginPage = () => {
    return (
        <div className="login-page">
            <div className="form-log-in">
                <img className="gator-blur" alt="Gator blur" src={gatorBlur2} />

                <div className="div">Welcome Back!</div>
                <Link to="/">Go to Home Page</Link>

                <p className="p">Please enter your information below:</p>

                <p className="p">Please enter your information below:</p>

                {/* <div className="input-field">
                    <label for="username">Username</label>
                    <input type="text" id="username" placeholder="example@gmail.com"></input>
                    <label for="password">Password</label>
                    <input type="text" id="password" placeholder="Password"></input>
                    <div>
                    <button type= "submit" id="sign_in">Sign in</button>

                    </div>
                </div> */}

                <div className="input-field">
                    <div className="label">Email</div>

                    <div className="input">
                        <div className="text-wrapper-2">Value</div>
                    </div>
                </div>

                <div className="input-field">
                    <div className="label">Password</div>

                    <div className="input">
                        <div className="text-wrapper-2">Value</div>
                    </div>
                </div>

                <div className="button-group">
                    <button className="button">
                        <button className="button-2">Sign In</button>
                    </button>
                </div>

                <TextLink className="text-link-instance" text="Forgot password?" />
            </div>
        </div>
    );
};
export default LoginPage;
