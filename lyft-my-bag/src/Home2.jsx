import React from "react";
import { Link } from "react-router-dom";
import { Card } from "./Card";
import conditions from "./conditions.png";
import eco from "./eco.png";
import figure2 from "./figure-2.png";
import figure6 from "./figure-6.png";
import gatorBlur2 from "./gator-blur-2.png";
import editsquare from "./edit_square.png"
import "./Home.css";
import "./styleguide.css";

export const HomePage = () => {
    console.log("HomePage is rendering");
    return (
        <div className="home-page">
            <div className="landing">
                <header className="header">
                    <div className="overlap-group-3">
                        <img className="header-img" alt="green wavy header" src={figure6} />

                        <div className="text-wrapper-6">LMB</div>

                        <div className="header-buttons">
                            <button className="get-started-button">
                                <div className="text-wrapper-5">Get Started</div>
                            </button>

                            <button className="login-button">
                                <div className="text-wrapper-2">Login</div>
                            </button>
                        </div>
                    </div>
                </header>

                <img className="gator-blur" alt="Gator blur" src={gatorBlur2} />

                <div className="frame">
                    <p className="p">Welcome to Lyft My Bag</p>
                    <div className="text-wrapper-4">mission statement here</div>
                    <button className="get-started-button">
                        <div className="text-wrapper-5">Get Started</div>
                    </button>
                </div>
            </div>
            
            <div className="instructions">
                <div className="text-wrapper-3">HOW IT WORKS</div>

                <div className="overlap-2">
                    <img className="figure" alt="green wavy box" src={figure2} />

                    <div className="passenger-info">
                        <div className="text-wrapper">Looking for a ride?</div>

                        <div className="cards">
                            <div className="overlap-group-2">
                                <Card className="card-instance" editSquare={eco} text="meet new people and reduce your carbon footprint!" />
                            </div>
                            <div className="overlap-3">
                                <Card className="card-instance" editSquare={conditions} text="request to ride with a driver" />
                            </div>
                            <Card className="trip-form" editSquare={editsquare} text="look at posted trips" />
                        </div>

                        <button className="button">
                            <div className="text-wrapper-2">Become A Passenger</div>
                        </button>
                    </div>

                    <div className="driver-info">
                        <div className="text-wrapper">Looking for passengers?</div>

                        <div className="cards">
                            <div className="overlap-group-2">
                                <Card className="card-instance" editSquare={eco} text="meet new people and reduce your carbon footprint!" />
                            </div>
                            <div className="overlap-3">
                                <Card className="card-instance" editSquare={conditions} text="find people with the same destination" />
                            </div>
                            <Card className="trip-form" editSquare={editsquare} text="fill out a trip form" />
                        </div>

                        <button className="button">
                            <div className="text-wrapper-2">Become A Driver</div>
                        </button>
                    </div>
                </div>
            </div>
            
            <footer className="footer">
                <div className="overlap-group">
                    <p className="footer-text">
                        footer placeholder
                    </p>
                </div>
            </footer>
        </div>
    );
};
export default HomePage;