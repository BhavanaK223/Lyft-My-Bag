import React from "react";
import { Link } from "react-router-dom";
import { Card } from "./Card";
import conditions from "./conditions.png";
import eco from "./eco.png";
import figure2 from "./figure-2.png";
import figure6 from "./figure-6.png";
import gatorBlur2 from "./gator-blur-2.png";
import editsquare from "./edit_square.png"
import "./style.css";

export const HomePage = () => {
    console.log("HomePage is rendering");
    return (
        <div className="home-page">
            <div className="div">
                <footer className="footer">
                    <div className="overlap-group">
                        <p className="dev-team-cindy">
                            Dev Team:
                            <br />
                            Cindy, Valentina, Savannah, Bhavana
                        </p>
                    </div>
                </footer>

                <div className="overlap">
                    <div className="instructions">
                        <div className="overlap-2">
                            <img className="figure" alt="Figure" src={figure2} />

                            <div className="passenger-info">
                                <div className="text-wrapper">Looking for a ride?</div>

                                <div className="cards">
                                    <div className="overlap-group-2">
                                        <Card
                                            className="card-instance"
                                            text="meet new people and reduce your carbon footprint!"
                                        />
                                        <img className="eco" alt="Eco" src={eco} />
                                    </div>

                                    <div className="overlap-3">
                                        <Card
                                            className="card-instance"
                                            editSquare="./edit_square.png"
                                            text="request to ride with a driver"
                                        />
                                        <img
                                            className="conditions"
                                            alt="Conditions"
                                            src={conditions}
                                        />
                                    </div>

                                    <div className="overlap-9">
                                        <Card
                                            className="trip-form"
                                            editSquare="edit-square-4.png"
                                            text="look at posted trips"
                                        />
                                        <img
                                            className="edit"
                                            alt="edit"
                                            src={editsquare}
                                        />
                                    </div>
                                </div>

                                <button className="button">
                                    <div className="text-wrapper-2">Become A Passenger</div>
                                </button>
                            </div>

                            <div className="driver-info">
                                <div className="text-wrapper">Looking for passengers?</div>

                                <div className="cards">
                                    <div className="overlap-group-2">
                                        <Card
                                            className="card-instance"
                                            editSquare="edit-square-3.png"
                                            text="meet new people and reduce your carbon footprint!"
                                        />
                                        <img className="eco" alt="Eco" src={eco} />
                                    </div>

                                    <div className="overlap-3">
                                        <Card
                                            className="card-instance"
                                            editSquare="edit-square-2.png"
                                            text="find people with the same destination"
                                        />
                                        <img
                                            className="conditions"
                                            alt="Conditions"
                                            src={conditions}
                                        />
                                    </div>

                                    <div className="overlap-9">
                                        <Card
                                            className="trip-form"
                                            editSquare="edit-square-4.png"
                                            text="fill out a trip form"
                                        />
                                        <img
                                            className="edit"
                                            alt="edit"
                                            src={editsquare}
                                        />
                                    </div>
                              
                                </div>

                                <button className="button">
                                    <div className="text-wrapper-2">Become A Driver</div>
                                </button>
                            </div>
                        </div>

                        <div className="text-wrapper-3">HOW IT WORKS</div>
                    </div>

                    <div className="landing">
                        <div className="overlap-4">
                            <img className="img" alt="Figure" src={figure6} />

                            <div className="header-buttons">
                                <button className="get-started-button">
                                    <div className="text-wrapper-4">Get Started</div>
                                </button>

                                <button className="login-button">
                                    <Link to="/login">Login</Link>
                                </button>
                            </div>

                            <div className="text-wrapper-5">LMB</div>
                        </div>

                        <img className="gator-blur" alt="Gator blur" src={gatorBlur2} />

                        <div className="frame">
                            <p className="p">Welcome to Lyft My Bag</p>

                            <div className="text-wrapper-6">mission statement here</div>

                            <button className="get-started-button">
                                <div className="text-wrapper-4">Get Started</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HomePage;