// import axios from 'axios'
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// function AgentLogin() {
//   const [email,setemail]=useState('')
//   const [pass,setpass]=useState('')
//   const serverURL='http://localhost:5000'
//   const navigate=useNavigate()
//     const handelLogin=async(e)=>{
//       e.preventDefault()
//       try{
//         const res=await axios.post(`${serverURL}/api/admin/agentlogin`,{
//           Email: email,
//           Password: pass
//         }
//       )
//       console.log("ffhj",res.data);
//         //




//         if(res.data.success){
//           const agent = res.data.agent
//           console.log(agent);
//            localStorage.setItem("agentId", agent._id);
//         localStorage.setItem("agent", JSON.stringify(agent));


//         localStorage.setItem("token",res.data.token)
//         console.log(res.data);
//         alert("Login Successfull")
//         navigate('/agentdash')
//         }else{
//           console.log("nhhhg"); 
//         }



        
//         // localStorage.setItem("token",res.data.token)
//         // console.log(res.data);
//         // alert("Login Successfull")
//         // navigate('/agentdash')
//       }catch(err){
//         alert("Login Failed")
//         console.log(err);
//         console.log("Error Response:", err.response?.data)

//       }
//     }
//   return (
//     <div>
//       <form action=""onSubmit={handelLogin}>
//      Email <input type="text" value={email} onChange={(e)=>setemail(e.target.value)} />
//      password <input type="password"  value={pass} onChange={(e)=>setpass(e.target.value)}/>
//       <button type='submit'>Submit</button>
//       </form>
//     </div>
//   )
// }

// export default AgentLogin



import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Mainpage from './header'
import { loginimg } from './data/data';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function AgentLogin() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const serverURL = 'http://localhost:5000';
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${serverURL}/api/admin/agentlogin`, {
        Email: email,
        Password: pass,
      });

      console.log("Response:", res.data);

      if (res.data.success) {
        const agent = res.data.agent;
        console.log("Agent:", agent);

        localStorage.setItem("agentId", agent.id);
        localStorage.setItem("agent", JSON.stringify(agent));
        localStorage.setItem("token", res.data.token);

        alert("Login Successful");
        navigate('/agentdash');
      } else {
        console.log("Login failed:", res.data.msg);
        alert("Login Failed: " + res.data.msg);
      }
    } catch (err) {
      console.error("Error:", err);
      console.log("Error Response:", err.response?.data);
      alert("Login Failed: " + (err.response?.data?.msg || "An error occurred"));
    }
  };

  return (
    <div >
      <Mainpage/>
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "170px"}}>
      <div style={{
          width: "30%", padding: "20px", boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)", border: "1px solid lightgray", textAlign: "center",
          borderRadius: "8px", backgroundColor: "rgb(40, 167, 69)", height: "550px", marginTop: "30%", marginLeft: "-2%",position:"relative"
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
      <form onSubmit={handleLogin} style={{
          width: "30%", padding: "20px", boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.2)", border: "1px solid lightgray", textAlign: "center",
          borderRadius: "8px", backgroundColor: "#fff", height: "550px", marginTop: "30%", marginLeft: "0%"
        }}>
          <h2>Login</h2>
        <div style={{position:"relative",width:"100%",marginBottom:"15px",marginTop:"6%"}}>
          {/* <label>Email:</label> */}
          <i className='fa fa-envelope' style={{ position: "absolute", marginLeft: "60%", top: "30%", transform: "translateY(-50%)", color: "#888" }}></i>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}  style={{
              borderRadius: "5px", height: "33px", width: "70%", paddingLeft: "35px",
              border: "1px solid lightgray"}} />
        </div>
        <div style={{position: "relative", width: "100%", marginBottom: "15px"}}>
          {/* <label>Password:</label> */}
          <i className='fa fa-lock' style={{ position: "absolute", marginLeft: "60%", top: "30%", transform: "translateY(-50%", color: "#888" }}></i>
          <input type="password" value={pass} onChange={(e) => setPass(e.target.value)}  style={{
              borderRadius: "5px", height: "33px", width: "70%", paddingLeft: "35px",
              border: "1px solid lightgray"}}/>
        </div>
        <button type="submit" style={{
            width: "67%", padding: "12px", backgroundColor: "#28a745", color: "white",
            border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer",
            transition: "0.3s", height: "42px", textAlign: "center"
          }} onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#28a745"}>Submit</button>
             <p style={{ marginTop: "55%" }}>
            <a style={{ fontSize: "12px", marginBottom: "2%" }} href="/areg">Don't have an account? <span style={{ color: "green", fontWeight: "bolder" }}>Sign up!</span> </a>
          </p>
      </form>
      </div>
    </div>
  );
}

export default AgentLogin;