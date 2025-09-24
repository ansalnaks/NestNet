import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const [details, setDetails] = useState(null);
    const usen=useNavigate()
    const serverUrl = 'http://localhost:5000';

    useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem('user'));

        if (userdata) {
            setDetails(userdata);
            console.log("User Email Loaded:", userdata.email);
        } else {
            console.log("No user found in localStorage");
        }
        
        getDetails();
    }, []);

    const getDetails = async () => {
        try {
            const res = await axios.get(`${serverUrl}/api/regtr/profile`);
            setDetails(res.data);
            console.log("Fetched Data:", res.data);
        } catch (err) {
            console.log(err);
        }
    };

  
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
    };

    const cardStyle = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        width: '650px',
        textAlign: 'center',
    };

    const headingStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
        borderBottom: '2px solid #ddd',
        paddingBottom: '10px',
        marginBottom: '15px',
    };

    const infoStyle = {
        fontSize: '16px',
        color: '#555',
        margin: '8px 0',
    };

    const loaderStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <h3 style={headingStyle}>Account Settings</h3>

                {details ? (
                    <div>
                        <h3 style={infoStyle}><strong>{details.name}</strong></h3>
                        <p style={infoStyle}><strong>Email:</strong> {details.email}</p>
                        <p style={infoStyle}><strong>Address:</strong> {details.address}</p>
                        <p style={infoStyle}><strong>Phone:</strong> {details.ph}</p>
                        <button onClick={()=>usen('/')}>Logout</button>
                    </div>
                ) : (
                    <div style={loaderStyle}>
                        <div style={{
                            width: '20px',
                            height: '20px',
                            border: '3px solid #ccc',
                            borderTop: '3px solid blue',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }}></div>
                        <h2 style={{ marginLeft: '10px', color: '#777' }}>Loading...</h2>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
