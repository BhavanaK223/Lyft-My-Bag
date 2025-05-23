import React from "react";
import { Link } from "react-router-dom";
import { Card } from "./Card";
import { Navbar } from "./Navbar";
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
                    <Navbar />
                </header>

                <img className="gator-blur" alt="Gator blur" src={gatorBlur2} />

                <div className="frame">
                    <p className="p">Welcome to Lyft My Bag</p>
                    <div className="text-wrapper-7">Making it easier for students to get around Gainesville</div>
                        <Link to="/login" className="get-started-button">
                            <div className="text-wrapper-5">Get Started</div>
                        </Link>
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

                        <Link to="/login" className="button">
                            <div className="text-wrapper-2">Become A Passenger</div>
                        </Link>
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

                        <Link to="/login" className="button">
                            <div className="text-wrapper-2">Become A Driver</div>
                        </Link>
                    </div>
                </div>
            </div>
            
            <footer className="footer">
                <div className="overlap-group">
                    <p className="footer-text">
                        Group 2: <br/>
                        Bhavana Kavarthapu <br/>
                        Cindy Jiang <br/>
                        Savannah Ogletree <br/>
                        Valentina Esteban <br/>
                    </p>
                    {/* <a href="https://github.com/BhavanaK223/Lyft-My-Bag" className="footer-text">Github</a> */}
                </div>
            </footer>
        </div>
    );
};
export default HomePage;