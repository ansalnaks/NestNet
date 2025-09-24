import React, { useState } from 'react'
import { footer } from './data/data'
import './footer.css'



function Footer({handlesubscribe}) {
const [email,setemail]=useState('')
const [isSubscribed,setIsSubscribed]=useState(true)
    return (
        <div>
            <section className='footerContact'>
                <div className='container'>
                    <div className='send flex'>
                        <div className='text'>
                            <h1>Do You Have Questions?</h1>
                            <p>We'll help you to grow your career and growth.</p>
                        </div>
                        <button className='btn5'>Contact Us Today</button>
                    </div>
                </div>
            </section>
            <footer>
                <div className='container'>
                    <div className='box'>
                        <div className='logo'>
                            <img src="https://logo-suggestion.renderforest.com/suggestions-images/9d38/111d/9d38111d7d007bc7e9eec7e09f4891ca.png" alt="" />
                            <h2>Do You Need Help With Anything?</h2>
                            <p>Receive updates,hot deals,tutorials,discounts sent straight in your inbox every month</p>
                            <div className='input flex'>
                                <input type="email" value={email} placeholder='Email Address' onChange={(e)=>setemail(e.target.value)}  />
                                <button onClick={handlesubscribe}>{isSubscribed ? "Subscribed" : "Subscribe"}</button>
                            </div>
                        </div>

                        {
                            footer.map((val) => (
                                <div className='box'>
                                    <h3>{val.title}</h3><br />
                                    <ul>
                                        {val.text.map((items) => (
                                            <li>{items.list}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='follow'>
                    <h3>Follow Us On</h3>
                    <a href="https://www.linkedin.com" aria-label="LinkedIn" target="blank" rel="noopener noreferrer">
                        <i class="fab fa-linkedin"></i>
                    </a>
                    <a href="" aria-label='facebook' target='blank'>
                        <i class='fab fa-facebook'></i>
                    </a>
                    <a href="" aria-label='twitter' target='blank'>
                        <i class='fab fa-twitter'></i>
                    </a>
                    <a href="" aria-label='youtube' target='blank'>
                        <i class='fab fa-youtube'></i>
                    </a>
                    <a href="" aria-label='instagram' target='blank'>
                        <i class='fab fa-instagram'></i>
                    </a>
                </div>
            </footer>
            <div className='legal'>
                <span>©️ 2025 Nestnet. Designed By Ansalna</span>
            </div>
        </div>
    )
}

export default Footer