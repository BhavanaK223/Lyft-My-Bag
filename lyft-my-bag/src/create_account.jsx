import React from "react";
import { TextLink } from "./TextLink";
import gatorBlur2 from "./gator-blur-2.png";
import "./style.css";

export const SignUpPage = () => {
    return (
        <div className="sign-up-page">
            <div className="form-log-in">
                <img className="gator-blur" alt="Gator blur" src={gatorBlur2} />

                <div className="div">Create An Account</div>

                <p className="p">Please enter your information below:</p>

                <div className="input-field">
                    <div className="label">First Name</div>

                    <div className="input">
                        <div className="text-wrapper-2">Value</div>
                    </div>
                </div>

                <div className="input-field">
                    <div className="label">Last Name</div>

                    <div className="input">
                        <div className="text-wrapper-2">Value</div>
                    </div>
                </div>

                <div className="input-field">
                    <div className="label">Email</div>

                    <div className="input">
                        <div className="text-wrapper-2">Value</div>
                    </div>
                </div>

                <div className="input-field">
                    <div className="label">Create a Password</div>

                    <div className="input">
                        <div className="text-wrapper-2">Value</div>
                    </div>
                </div>

                <div className="input-field">
                    <div className="label">Re-Enter Password</div>

                    <div className="input">
                        <div className="text-wrapper-2">Value</div>
                    </div>
                </div>

                <button className="button-group">
                    <button className="button">
                        <button className="button-2">Sign Up</button>
                    </button>
                </button>



                <TextLink
                    className="text-link-instance"
                    text="Already have an account?"
                />
            </div>
        </div>
    );
};
