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
                    right: 0,
                    width: '100%',
                    backgroundColor: '#f1f1f1',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <button className="tablinks" onClick={() => tabClick('Request Ride')}>Request Ride</button>
                <button className="tablinks" onClick={() => tabClick('Offer Ride')}>Offer Ride</button>
            </div>
            <img src="https://www.shutterstock.com/image-vector/cute-crocodile-business-holding-suitcase-600nw-2223279211.jpg"
                width="200"
                height="200"
                style={{ width: 100, height: 100, position: 'fixed', left: 0, top: 0 }} />


            <div style={{ marginTop: "50px", padding: "20px" }}>
                {activeTab === "Request Ride" && <div><form>
                    <label htmlFor="fname">Name:</label><br />
                    <input type="text" id="fname" name="fname" /><br />
                    <label htmlFor="lname">Destination:</label><br />
                    <input type="text" id="lname" name="lname" /><br />
                    <label htmlFor="lname">Duration be gone:</label><br />
                    <input type="text" id="lname" name="lname" /><br />
                    <input type="submit" value="Request" />
                </form></div>}
                {activeTab === "Offer Ride" && <div><form>
                    <label htmlFor="fname">Name:</label><br />
                    <input type="text" id="fname" name="fname" /><br />
                    <label htmlFor="lname">Destination:</label><br />
                    <input type="text" id="lname" name="lname" /><br />
                    <label htmlFor="lname">Duration be gone:</label><br />
                    <input type="text" id="lname" name="lname" /><br />
                    <label htmlFor="lname">Seats Available:</label><br />
                    <input type="text" id="lname" name="lname" /><br />
                    <input type="submit" value="Offer" />
                </form></div>}
            </div>
        </div>
    );
};
export default RequestOffer