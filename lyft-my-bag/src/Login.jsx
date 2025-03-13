import React from "react";
import { TextLink } from "./TextLink";
import gatorBlur2 from "./public/gator-blur-2.png";
import "./style.css";

export const LoginPage = () => {
    return (
        <div className="login-page">
            <div className="form-log-in">
                <img className="gator-blur" alt="Gator blur" src={gatorBlur2} />

                <div className="div">Welcome Back!</div>

                <p className="p">Please enter your information below:</p>

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
