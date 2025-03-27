import React, {useState, useEffect} from "react";
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

                <p>Please enter your information below:</p>
                

                <form action="" method="post">
                <div class="form-group">
                        <label for="Fullname">Full name</label>
                        <input name="fullname" class="form-control" id="inputFullName" aria-describedby="emailHelp" placeholder="Enter full name"/>
                </div>
                <div class="form-group">
                        <label for="InputEmail">Email address</label>
                        <input name="email" class="form-control" id="InputEmail"  placeholder="Enter email"/>
                </div>
                <div class="form-group">
                    <label for="InputPassword">Password</label>
                    <input type="password" name="password1" class="form-control" id="InputPassword" placeholder="Password"/>
                </div>

                    <div class="form-group">
                    <label for="InputPassword2">Repeat Password</label>
                    <input type="password" name="password2" class="form-control" id="InputPassword2" placeholder="Repeat Password"/>

                    </div>
                <button type="submit" class="btn btn-primary">Submit</button>
                </form>
{/* 
                <div className="input-field">
                    <label for="username">Username</label>
                    <input type="text" id="username" placeholder="example@gmail.com"></input>
                    <label for="password">Password</label>
                    <input type="text" id="password" placeholder="Password"></input>
                    <div>
                    <button type= "submit" id="sign_in">Sign in</button>

                    </div>
                </div> */}

                <TextLink className="text-link-instance" text="Forgot password?" />
            </div>
        </div>
    );
};
export default LoginPage;
