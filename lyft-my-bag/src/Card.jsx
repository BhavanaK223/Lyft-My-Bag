import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const Card = ({
    className,
    editSquare = "edit-square.png",
    text = "fill out a trip form",
}) => {
    return (
        <div className={`card ${className}`}>
            <img className="edit-square" alt="Edit square" src={editSquare} />

            <p className="fill-out-a-trip-form">{text}</p>
        </div>
    );
};

Card.propTypes = {
    editSquare: PropTypes.string,
    text: PropTypes.string,
};

