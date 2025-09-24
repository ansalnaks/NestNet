import React from 'react'
import { nav1 } from './data/data'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { User } from 'lucide-react'
import '../sec.css';


function Userdashheader() {
    const nav=useNavigate()
    const [navlist, setnavlist] = useState(false)
    const [userdetails, setUserdetails] = useState({})
    
     useEffect(() => {
        const userdata = JSON.parse(localStorage.getItem('user'))
    
        console.log(userdata);
    
        if (userdata) {
          setUserdetails(userdata);
        //   setemail(userdata.email);
          console.log("User Email Loaded:", userdata.email);
        }
        else {
          console.log("No user found in localStorage");
        }
      }, []);

  return (  
    <header>
        <div className='container-flex'>
          <div className='logo'>
            <img src="https://logo-suggestion.renderforest.com/suggestions-images/9d38/111d/9d38111d7d007bc7e9eec7e09f4891ca.png" alt="" style={{ width: "70px" }} />
          </div>
          <div className='nav'>
            <ul className={navlist ? "small" : 'flex'}>
              {
                nav1.map((list, index) => (
                  <li style={{ justifyItems: "baseline" }} key={index}>
                    <Link to={list.path}>{list.text}</Link>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className='button flex'>
           <Link to={'/mylist'}><h4>my list</h4></Link> 
            <button className='probtn' style={{ display: 'flex', alignItems: 'center', gap: '10px', border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Link to={'/profile'} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
                <User size={40} color="black" style={{ borderRadius: '50%', background: '#f0f0f0', padding: '5px' }} />
                <span style={{ color: "black" }}>
                  Welcome, {userdetails?.name || "Guest"}
                </span>
              </Link>
            </button>
          </div>
          <div className='toggle'>
            <button onClick={() => setnavlist(!navlist)}>
              {navlist ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
            </button>
          </div>
        </div>
        </header>
    
  )
}

export default Userdashheader