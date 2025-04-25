import React from "react";
import "./style.css";

export const TripDisplay = () => {
    return (
        <div className="trip-display">
            <div className="avatar-block">
                {/* <Avatar
                    className="avatar-instance"
                    shape="circle"
                    size="large"
                    type="image"
                /> */}
                <div className="info">
                    <div className="title">Cindy J</div>
                </div>
            </div>

            <div className="frame">
                <div className="div">
                    <div className="destination">Trader Joe’s</div>

                    <div className="address">123 Main St</div>
                </div>

                <div className="div">
                    <div className="text-wrapper">03/27/2025</div>

                    <div className="text-wrapper">Afternoon</div>

                    <div className="text-wrapper">2 hours</div>
                </div>

                <div className="div">
                    <div className="text-wrapper">Gas($): 2</div>

                    <div className="text-wrapper">Seats Open: 4/4</div>
                </div>
            </div>

            <button className="button-instance">Join Trip</button>
        </div>
    );
};