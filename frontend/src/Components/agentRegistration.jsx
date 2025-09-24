import React,{useState} from 'react'
import { nav } from './data/data'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'


function AgentRegistration() {
    const navigate=useNavigate()
      const [navlist,setnavlist]=useState(false)
      const [aname,setname]=useState('')
      const [aemail,setemail]=useState('')
      const [aph,setph]=useState('')
      const [apass,setpass]=useState('')
      const [addr,setadd]=useState('')
      const [role,setRole]=useState('agent')
      const serverURL='http://localhost:5000'

      const handleRegister=async(e)=>{
        e.preventDefault()
        try{
          const passwordreg=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          if (!passwordreg.test(apass)) {
            alert("Password must be at least 8 characters long and include a letter, a number, and a special character.");
            return;
        }
        if(aph.length>10||aph.length<10){
          alert("Enter Valid Ph no")
          return
        }

           const res= await axios.post(`${serverURL}/api/admin/agentRegister`,{
            Name:aname,
            Email:aemail,
            Password:apass,
            address:addr,
            ph:Number(aph),
            role:role,
            Status: "Pending" 
           })
           console.log(res.data);
           alert("Registration successfull!Waiting for admin approval")
           navigate('/alog')
        }catch(err){
          alert("Email is already registered! Please use a different email.");
        }
      }

      
    
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
        

        <div style={{display:"flex"}}>
          
          <div style={{
    background: "linear-gradient(135deg, #32a852, #1e7e34)", 
    width: "30%", height: "550px",  borderRadius: "8px",boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)", border: "1px solid lightgray",
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center",color: "white",
     padding: "20px", marginTop:"5%",marginLeft:"13%"
  }}>

    <h2 style={{ fontSize: "24px", marginBottom: "10px" ,animation:"fadeIn 2s ease-in-out"}}>Welcome to NestNet</h2>
    <p style={{ fontSize: "16px", opacity: "0.9", marginBottom: "20px",animation:"fadeIn 2s ease-in-out" }}>
      Join us to buy and manage properties with ease.
    </p>

 
    <img 
      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
      alt="User Icon" 
      style={{
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        backgroundColor: "white",
        padding: "10px"
      }} 
    />

  </div>
         
          <form action="" onSubmit={handleRegister} style={{
          width: "40%", padding: "20px", boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)", border: "1px solid lightgray", textAlign: "center",
          borderRadius: "8px", backgroundColor: "#fff", height: "550px", marginTop: "5%", marginLeft: "2%"
        }}>
          <h2 >Sign Up</h2>
          <div style={{ display: "grid", gap: "10px", textAlign: "left" }}>
            Name<input type='text' value={aname} onChange={(e)=>setname(e.target.value)}/><br/>
            Email <input type="text" value={aemail} onChange={(e)=>setemail(e.target.value)}/><br/>
            Phone No <input type="Number" value={aph} onChange={(e)=>setph(e.target.value)}/><br/>
            Address <input type="text" value={addr} onChange={(e)=>setadd(e.target.value)} /><br/>
           Password <input type="password" value={apass} onChange={(e)=>setpass(e.target.value)} /><br/>
            <select name="" id="" value={role} onChange={(e)=>setRole(e.target.value)}>
              <option value="agent">Agent</option>
              {/* <option value="Admin">Admin</option> */}
            </select><br />
              <button type='submit'style={{
            marginTop: "10px", padding: "10px", backgroundColor: "#28a745", color: "white",
            border: "none", borderRadius: "5px", width: "100%", fontSize: "16px", cursor: "pointer"
          }}> Submit</button>
              </div>
          </form>
        </div>
    </div>
  )
}

export default AgentRegistration