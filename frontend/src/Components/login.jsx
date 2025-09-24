import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Mainpage from './header'
import { loginimg } from './data/data';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Login() {
  const [lemail, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const serverURL = 'http://localhost:5000'
  const nav = useNavigate()


  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${serverURL}/api/regtr/login`, {

        email: lemail,
        password: pass
      });
      console.log("Login response:", res.data);
      if (res.data.success) {
        // localStorage.setItem("name",name)
        const user = res.data.user
        console.log(user);
        localStorage.setItem("userId", user._id);
        localStorage.setItem("user", JSON.stringify(user));
        // localStorage.setItem("token", res.data.authToken);
        localStorage.setItem("token", res.data.authtoken);  // Correct key name

        console.log("User stored in localStorage:", user);
        alert("Login Successfull!")
        nav('/userdash');
      } else {
        console.log("Invalid credentials");
      }
    } catch (error) {
      alert("Login Failed!")
      if (error.response) {
        console.log("Server responded with:", error.response.data);
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Axios Error:", error.message);
      }
    }
  };



  return (
    <div>
      <Mainpage />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "170px", }} >
        <div style={{
          width: "30%", padding: "20px", boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)", border: "1px solid lightgray", textAlign: "center",
          borderRadius: "8px", backgroundColor: "rgb(40, 167, 69)", height: "550px", marginTop: "30%", marginLeft: "0%",position:"relative"
        }} className='leftdiv'>
         
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            modules={[Pagination, Navigation, Autoplay]}>
            {loginimg.map((deta, index) => (
              <SwiperSlide key={index}>
                <img className="buildimg" style={{ width: "70%", height: "175px", marginLeft: "3%",marginTop:"30%",borderRadius:"50%" ,border:"5px solid white"}} 
                src={deta.img} alt="Partnership" />
                <h3 style={{color:"white",marginTop:"17%",animation:"fadeIn 1s ease-in-out"}}>{deta.title}</h3>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>

        <form style={{
          width: "30%", padding: "20px", boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)", border: "1px solid lightgray", textAlign: "center",
          borderRadius: "8px", backgroundColor: "#fff", height: "550px", marginTop: "30%", marginLeft: "0%"
        }} onSubmit={login}><br />
          <h1>Hello Again</h1><br />

          <div style={{ position: "relative", width: "100%", marginBottom: "15px" }}>
            <i className='fa fa-envelope' style={{ position: "absolute", marginLeft: "60%", top: "30%", transform: "translateY(-50%)", color: "#888" }}></i>
            <input type="text" placeholder='Email ' value={lemail} onChange={(e) => setEmail(e.target.value)} style={{
              borderRadius: "5px", height: "33px", width: "70%", paddingLeft: "35px",
              border: "1px solid lightgray"
            }} /><br /><br />
          </div>

          <div style={{ position: "relative", width: "100%", marginBottom: "15px" }} >
            <i className='fa fa-lock' style={{ position: "absolute", marginLeft: "60%", top: "30%", transform: "translateY(-50%", color: "#888" }}></i>
            <input type='password' placeholder=' Password' value={pass} onChange={(e) => setPass(e.target.value)} style={{ borderRadius: "5px", height: "33px", width: "70%", paddingLeft: "35px", border: "1px solid lightgray" }} /><br /><br />
          </div>

          <button type='submit' style={{
            width: "67%", padding: "12px", backgroundColor: "#28a745", color: "white",
            border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer",
            transition: "0.3s", height: "42px", textAlign: "center"
          }} onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#28a745"}>Login</button><br />
          <p style={{ marginTop: "55%" }}>
            <a style={{ fontSize: "12px", marginBottom: "2%" }} href="/register">Don't have an account? <span style={{ color: "green", fontWeight: "bolder" }}>Sign up!</span> </a>
          </p>
        </form>

      </div>
    </div>
  )
}

export default Login