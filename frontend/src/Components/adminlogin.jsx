import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Mainpage from './header';

function Adminlogin() {
  const[name,setName]=useState('')
  const [pass,setPass]=useState( '')
  const nav=useNavigate()

  const login=()=>{
    if(name==='admin'&&pass==='admin123'){
      alert("login successful")
      nav('/addash')
    }
  }
  return (
    <div> 
        <Mainpage/>
       
        <div style={{border:"1px solid gray",boxShadow:"1px 2px 2px 1px gray",width:"40%",height:"432px",marginLeft:'25%',marginTop:"5%",paddingLeft:"14%",paddingTop:"3%"}}>
          <h1 style={{marginTop:"1%"}}>Welcome <span style={{color:"green"}}> Admin</span></h1> <br />
          <div style={{position:"relative",marginLeft:"-14%"}}>
          <i className='fa fa-user' style={{position:"absolute", top: "30%", transform: "translateY(-50%)", color: "#888",marginLeft:"50%"}}></i> 
           <input style={{ borderRadius: "5px", height: "33px", width: "70%", paddingLeft: "30px",
              border: "1px solid lightgray"}} type="text" placeholder='enter username' onChange={(e)=>setName(e.target.value)} /> <br /> <br />
          </div>
          <div style={{position:"relative",marginLeft:"-14%"}}>
        <i className='fa fa-lock' style={{position:"absolute",top:"30%",transform:"translateY(-50%)",color:"#888",marginLeft:"50%"}}></i>
         <input style={{borderRadius: "5px", height: "33px", width: "70%", paddingLeft: "30px",
              border: "1px solid lightgray"}} type="text"  placeholder='enter password' name="" id="" onChange={(e)=>setPass(e.target.value)} /> <br /> <br />
        </div>
        <button style={{marginLeft:"7%"}} onClick={login}>Submit</button>
        </div>
    </div>
  )
}

export default Adminlogin