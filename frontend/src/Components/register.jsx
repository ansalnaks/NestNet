import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Mainpage from './header'

function Register() {
  const [uname, setuname] = useState('')
  const [add, setAdd] = useState('')
  const [email, setEmail] = useState('')
  const [ph, setPh] = useState('')
  const [pass, setPass] = useState('')
  const [cpass, setCpass] = useState('')
  const nav = useNavigate()
  const ServerUrl = 'http://localhost:5000'
  const inputStyle = {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  }
  const register = async (e) => {
    e.preventDefault()
    try {

      const passwordreg=/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          if (!passwordreg.test(pass)) {
            alert("Password must be at least 8 characters long and include a letter, a number, and a special character.");
            return;}
            if(ph.length<10||ph.length>10){
              alert("Please Enter Valid Ph no")
              return
            }
            if(pass!==cpass){
              alert("Password mismatch shows")
              return
            }
      const response = await axios.post(`${ServerUrl}/api/regtr/add`, {
        name: uname,
        address: add,
        email: email,
        ph: ph,
        password: pass,
        confirmpass: cpass
      })
      console.log(response.data);
      
      alert("register successfull")
      nav('/login')

    } catch (err) {
      alert("Registration failed!")
      console.log(err);
    }
  }
  return (
    <div >
      <Mainpage />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "170px", }}>
      <div style={{
    background: "linear-gradient(135deg, #32a852, #1e7e34)", 
    width: "30%", 
    height: "550px", 
    borderRadius: "8px",
    boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)", 
    border: "1px solid lightgray",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
    padding: "20px",
    marginTop:"30%"
  }}>

    <h2 style={{ fontSize: "24px", marginBottom: "10px" ,animation:"fadeIn 2s ease-in-out"}}>Welcome to NestNet</h2>
    <p style={{ fontSize: "16px", opacity: "0.9", marginBottom: "20px",animation:"fadeIn 2s ease-in-out" }}>
      Join us to explore and manage properties with ease.
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
        <form action="" style={{
          width: "40%", padding: "20px", boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)", border: "1px solid lightgray", textAlign: "center",
          borderRadius: "8px", backgroundColor: "#fff", height: "550px", marginTop: "30%", marginLeft: "0%"
        }}>
          <h2 >Sign Up</h2>
          <div style={{ display: "grid", gap: "10px", textAlign: "left" }}>
            <label>Username</label>
            <input type="text" placeholder="Enter username" value={uname} onChange={(e) => setuname(e.target.value)} style={inputStyle} />
            <label>Address</label>
            <input type="text" placeholder="Enter address" value={add} onChange={(e) => setAdd(e.target.value)} style={inputStyle} />
            <label>Email</label>
            <input type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
            <label>Phone No</label>
            <input type="number" placeholder="Enter phone number" value={ph} onChange={(e) => setPh(e.target.value)} style={inputStyle} />
            <label>Password</label>
            <input type="password" placeholder="Enter password" value={pass} onChange={(e) => setPass(e.target.value)} style={inputStyle} />
            <label>Confirm Password</label>
            <input type="password" placeholder="Confirm password" value={cpass} onChange={(e) => setCpass(e.target.value)} style={inputStyle} />
          </div>
          <button onClick={register} style={{
            marginTop: "10px", padding: "10px", backgroundColor: "#28a745", color: "white",
            border: "none", borderRadius: "5px", width: "100%", fontSize: "16px", cursor: "pointer"
          }}> Submit
          </button>
        </form>
      </div>

    </div>
  )
}

export default Register