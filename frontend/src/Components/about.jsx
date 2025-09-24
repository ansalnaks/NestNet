import React from 'react'
import Mainpage from './header'
import Footer from './Footer'
import '../sec.css'

function About() {
  return (
    <div>
      <Mainpage />
      <section className='aboutsec'>
        <h4 style={{ color: "black" }}>About Us</h4>
        <h1 style={{ color: "black" }}>About Us - Who We Are?</h1>
        <div className='descri'>
        <h2 style={{fontSize:'18px',fontWeight:"lighter",fontFamily:"poppines"}}>At <span style={{ color: "green" }}>Nestnet</span>, we are dedicated to simplifying the real estate experience through technology. Our platform seamlessly connects buyers, sellers, and renters, offering a user-friendly interface to explore properties, manage listings, and streamline transactions.
          With a commitment to innovation and customer satisfaction, we provide a secure and transparent environment for real estate management. Whether you're looking for your dream home or aiming to sell/rent your property hassle-free, our system ensures efficiency, accuracy, and convenience.
          Join us in revolutionizing the real estate industry—one smart solution at a time!</h2>
          </div>
      </section>
      <Footer />
    </div>
  )
}

export default About