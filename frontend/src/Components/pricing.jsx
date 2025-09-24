import React from 'react';
import Mainpage from './header';
import Footer from './Footer';

function Pricing() {
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
        color: '#333',
        marginTop:"-80px"
    };

    const pricingContainer = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
        maxWidth: '1000px',
    };

    const cardStyle = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        width: '280px',
        textAlign: 'center',
    };

    const planTitle = {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#222',
    };

    const priceStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        color: 'green',
        marginBottom: '10px',
    };

    const featuresList = {
        listStyleType: 'none',
        padding: '0',
        margin: '10px 0',
    };

    const featureItem = {
        fontSize: '14px',
        color: '#555',
        padding: '5px 0',
    };

    const buttonStyle = {
        backgroundColor: 'green',
        color: 'white',
        padding: '10px 15px',
        borderRadius: '5px',
        textDecoration: 'none',
        display: 'inline-block',
        marginTop: '10px',
        cursor: 'pointer',
        border: 'none',
        fontSize: '14px',
    };

    const pricingPlans = [
        { 
            title: 'Basic Plan', 
            price: '$19/month', 
            features: ['List up to 10 properties', 'Basic analytics', 'Email support'] 
        },
        { 
            title: 'Pro Plan', 
            price: '$49/month', 
            features: ['List unlimited properties', 'Advanced analytics', 'Priority support', 'Online payment integration'] 
        },
        { 
            title: 'Enterprise Plan', 
            price: 'Custom Pricing', 
            features: ['All Pro features', 'Custom integrations', 'Dedicated account manager', '24/7 support'] 
        },
    ];

    return (
        <div>
            <Mainpage/>
        <div style={containerStyle}>
            <h2 style={headingStyle}>Pricing Plans</h2>
            <div style={pricingContainer}>
                {pricingPlans.map((plan, index) => (
                    <div key={index} style={cardStyle}>
                        <h3 style={planTitle}>{plan.title}</h3>
                        <p style={priceStyle}>{plan.price}</p>
                        <ul style={featuresList}>
                            {plan.features.map((feature, i) => (
                                <li key={i} style={featureItem}>{feature}</li>
                            ))}
                        </ul>
                        <button style={buttonStyle}>Get Started</button>
                    </div>
                ))}
            </div>
        </div>
        <Footer/>
        </div>
    );
}

export default Pricing;
