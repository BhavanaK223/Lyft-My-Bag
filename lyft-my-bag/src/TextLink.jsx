import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const TextLink = ({ text = "Text Link", className }) => {
    return (
        <div className={`text-link ${className}`}>
            <div className="text-wrapper">{text}</div>
        </div>
    );
};

TextLink.propTypes = {
    text: PropTypes.string,
};

