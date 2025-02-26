import React from "react";
import { useState } from 'react'


const RequestOffer = () => {

    const [activeTab, setActiveTab] = useState('Request Ride');

    const tabClick = (tabName) => {
        setActiveTab(tabName);
    }

    return (
        <div>
            <div
                style={{
                    position: 'fixed',
                    top: 50,
                    //left: 0,
                    width: '100%',
                    backgroundColor: '#f1f1f1',
                    justifyContent: 'center',
                }}
            >
                <button class="tablinks" onClick={() => tabClick('Request Ride')}>Request Ride</button>
                <button class="tablinks" onClick={() => tabClick('Offer Ride')}>Offer Ride</button>
            </div>
            <div style={{ marginTop: "50px", padding: "20px" }}>
                {activeTab === "Request Ride" && <div><h2>Request Ride</h2><p>Content for the request tab.</p></div>}
                {activeTab === "Offer Ride" && <div><h2>Offer Ride</h2><p>Content for the offer tab.</p></div>}
            </div>
        </div>
    );
};
export default RequestOffer