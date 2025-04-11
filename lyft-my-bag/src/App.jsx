import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Home";
import LoginPage from "./Login";
import Profile from "./Profile";
import RequestOffer from "./RequestOffer";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/request" element={<RequestOffer />} />
            </Routes>
        </Router>
    );
};

export default App;