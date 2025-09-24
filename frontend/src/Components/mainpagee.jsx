import React from 'react'
import Mainpage from './header'

import '../sec.css';
import Features from './features';
import Footer from './Footer';
import { motion } from 'framer-motion';

import Partnership from './partnership';

function Mainpagee() {
    const handlesearch = () => {
        alert("Please Login")
    }

    return (
        <div>
            <Mainpage />
            <section className='sec'>
                <div className='containers'>
                    <heading className='heading'>
                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 3, y: 5 }}
                            transition={{ duration: 2.5 }}
                        >
                            <h1 style={{textShadow:"1px 2px gray"}}>The Best Way to Find Your Dream Home</h1>
                            <p >Your journey to the perfect home starts here. Explore, discover, and settle into your ideal space effortlessly.</p>
                        </motion.div>
                    </heading>
                    <form action="" className='flex' >
                        <div className='box'>
                            <span>City/Street &nbsp;</span><br />
                            <input type="text" placeholder='Location' />
                        </div>
                        <div className='box'>
                            <span>Property Type &nbsp;</span><br />
                            <input type="text" placeholder='Property Type' />
                        </div>
                        <div className='box'>
                            <span>Price Range &nbsp;</span><br />
                            <input type="text" placeholder='Price Range' />
                        </div>
                        {/* <div className='box'>
                            <h4>Advance Range</h4>
                        </div> */}
                        <button className='btn' onClick={() => handlesearch()}>
                            <i className='fa fa-search'></i>
                        </button>
                    </form>
                </div>

            </section>
            <Features />
            <Partnership/>
            <Footer />
        </div>
    )
}

export default Mainpagee


