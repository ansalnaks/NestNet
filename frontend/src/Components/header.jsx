import React, { useState } from 'react'
import { nav } from './data/data'
import {Link} from 'react-router-dom'

function Mainpage() {
  const [navlist,setnavlist]=useState(false)
  return (
    
    <div>
        <header>
          <div className='container-flex'>
            <div className='logo'>
              <img src="https://logo-suggestion.renderforest.com/suggestions-images/9d38/111d/9d38111d7d007bc7e9eec7e09f4891ca.png" alt="" style={{width:"70px"}}/>
              </div>
            <div className='nav'>
              <ul className={navlist?"small":'flex'}>
                {
                  nav.map((list,index)=>(
                    <li style={{justifyItems:"baseline"}} key={index}>
                        <Link to={list.path}>{list.text}</Link>
                    </li>
                  ))
                }
              </ul>
              </div>
            <div className='button flex'>
              <h4>my list</h4>
              <button className='btn1'>
                <a style={{color:"white"}} href="/login"><i className='fa fa-sign-out'></i>Sign In</a>
              </button>
            </div>
            <div className='toggle'>
                <button onClick={()=>setnavlist(!navlist)}>
                 {navlist?<i className='fa fa-times'></i>:<i className='fa fa-bars'></i>} 
                </button>
            </div>
          </div>
        </header>
    </div>
  )
}

export default Mainpage