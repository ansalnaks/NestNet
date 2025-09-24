import React from 'react';
import Mainpage from './header';
import Footer from './Footer';

function Services() {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f4f4f4',
        padding: '20px',
    };

    const headingStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: 'green',
        marginTop:"-70px"
    };

    const servicesContainer = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        maxWidth: '1000px',
    };

    const cardStyle = {
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        width: '270px',
        textAlign: 'center',
    };

    const serviceTitle = {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#222',
    };

    const serviceDescription = {
        fontSize: '14px',
        color: '#555',
    };

    const services = [
        { title: 'Property Listings', description: 'Manage and showcase properties with details and images.' },
        { title: 'Tenant Management', description: 'Track tenant details, lease agreements, and rent payments.' },
        { title: 'Agent Management', description: 'Assign and monitor agents handling property deals.' },
        { title: 'Online Booking', description: 'Allow users to book property visits and appointments.' },
        { title: 'Rental Payments', description: 'Secure online rent payment system with reminders.' },
        { title: 'Maintenance Requests', description: 'Manage and resolve property maintenance requests.' },
        { title: 'Reports & Analytics', description: 'Generate reports on properties, tenants, and revenue.' },
        { title: 'Admin Dashboard', description: 'Centralized admin panel to control and manage the system.' },
    ];

    return (
        <div >
            <Mainpage/>
        <div style={containerStyle}>
            
            <h2 style={headingStyle}>Real Estate Management Services</h2>
            <div style={servicesContainer}>
                {services.map((service, index) => (
                    <div key={index} style={cardStyle}>
                        <h3 style={serviceTitle}>{service.title}</h3>
                        <p style={serviceDescription}>{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
        <Footer/>
        </div>
    );
}

export default Services;
