import axios from "axios";
import React, { useState, useEffect } from "react";
import { nav } from './data/data';
import { Link, useNavigate } from 'react-router-dom';
import { resolvePath } from "react-router-dom";
import Mainpage from "./header";
import Footer from "./Footer";
import './footer.css';

function Admindash() {
  const [emails, setEmails] = useState([]);
  const [agent, setAgent] = useState([]);
  const [navlist, setnavlist] = useState(false);
  const [activeTab, setActiveTab] = useState('emails')
  const [users, setUsers] = useState([])
  // const [agent,setAgent]=useState([])
  const [agem, setagem] = useState([])
  const [payment,setpayment]=useState([])
  const serverUrl = "http://localhost:5000";

  const fetchEmails = async () => {
    try {
      const response = await fetch(`${serverUrl}/api/user/email`);
      const data = await response.json();
      setEmails(data);
    } catch (error) {
      console.error("Error fetching emails:", error);
    }
  };

  const fetchAgents = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/admin/pending-agents`);
      setAgent(response.data);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/regtr/tuser`)
      setUsers(res.data)
      console.log("users", res.data);

    } catch (err) {
      console.log("Error in fetching users", err);

    }
  }

  const fetchage = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/admin/getagent`)
      setagem(res.data)
      console.log("agentslist", res.data);

    } catch (err) {
      console.log("Error in agents feching", err);
    }
  }
  const deletef = () => {

  }

  const getpay=async()=>{
    try{
        const res=await axios.get(`${serverUrl}/api/users/getpayment`)
        setpayment(res.data)
        console.log("gghpay",res.data);
        
    }catch(err){
      console.log("Error in fetching payment details");
      
    }
  }

  useEffect(() => {
    fetchEmails();
    fetchAgents();
    fetchUsers()
    fetchage()
    getpay()
  }, []);

  const handleApprove = async (id) => {
    try {
      await axios.put(`${serverUrl}/api/admin/agentapp/${id}`);
      setAgent((prevAgents) =>
        prevAgents.map((agents) =>
          agents._id === id ? { ...agents, Status: "Approved" } : agents
        )
      );
      alert("Agent Approved");
    } catch (err) {
      alert(err.response?.data?.error || "An error occurred");
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axios.put(`${serverUrl}/api/admin/reject-agent/${id}`);
      console.log("rejected", res.data);

      setAgent((prevAgents) =>
        prevAgents.map((agents) =>
          agents._id === id ? { ...agents, Status: "Rejected" } : agents
        )
      );
      alert("Agent Rejected");
    } catch (err) {
      alert(err.response?.data?.error || "An error occurred");
    }
  };

  return (

    <div>
      <div>
        <header>
          <div className='container-flex'>
            <div className='logo'>
              <img src="https://logo-suggestion.renderforest.com/suggestions-images/9d38/111d/9d38111d7d007bc7e9eec7e09f4891ca.png" alt="" style={{ width: "70px" }} />
            </div>
            <div className='nav'>
              <ul className={navlist ? "small" : 'flex'}>
                {/* {nav.map((list, index) => (
                  <li style={{ justifyItems: "baseline" }} key={index}>
                    <Link to={list.path}>{list.text}</Link>
                  </li>
                ))} */}
              </ul>
            </div>
            <div className='button flex'>
              <a href="/"> <h4> <i className="fa fa-user"></i>Sign Out</h4></a>
              <button className='btn1'>
                <a style={{ color: "white" }} href="">Welcome</a>
              </button>
            </div>
            <div className='toggle'>
              <button onClick={() => setnavlist(!navlist)}>
                {navlist ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
              </button>
            </div>
          </div>
        </header>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", height: "auto" }}>
          <div className="agentss" style={{ width: '250px', background: '#0e6733', color: '#fff', padding: '20px', height: "650px", marginTop: "4%", marginBottom: "2%" }}>
            <h2>Welcome Admin</h2>
            <ul>
              <li onClick={() => setActiveTab("emails")} style={{ cursor: "pointer" }}>Subscriptions</li>
              <li onClick={() => setActiveTab("pending-agents")} style={{ cursor: "pointer" }}>Pending Agents</li>
              <li onClick={() => setActiveTab("userslist")} style={{ cursor: "pointer" }}>Users Lists</li>
              <li onClick={() => setActiveTab("agentlists")} style={{ cursor: "pointer" }}>Agents Lists</li>
              <li onClick={()=>setActiveTab("paymentlist")} style={{cursor:"pointer"}}>Payment History</li>
            </ul>
          </div>
        </div>
        <div style={{ flex: 1, padding: "20px" }}>
          {activeTab === "emails" && (
            <div>
              <h2>Received Emails:</h2>
              <button style={{ width: "45px", backgroundColor: "white" }} onClick={fetchEmails} onMouseEnter={() => alert("Refresh")} ><i className="fa fa-refresh" style={{ color: "black" }}>
              </i></button>
              <table border="">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Connect</th>
                  </tr>
                </thead>
                <tbody>
                  {emails.length > 0 ? (
                    emails.map((user, index) => (
                      <tr key={index}>
                        <td>{user.email}</td>
                        <td>{new Date(user.date).toLocaleDateString()}</td>
                        <td>
                          <a href="https://www.bing.com/ck/a?!&&p=eb4eabd9e153f06b016894edac8b25f43a33d536793291c08b64df9e89cf7d55JmltdHM9MTc0MDc4NzIwMA&ptn=3&ver=2&hsh=4&fclid=3459d745-da1d-60b2-2602-c578dbaf6190&psq=gmail&u=a1aHR0cHM6Ly9tYWlsLmdvb2dsZS5jb20vbWFpbC8&ntb=1" >send</a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No emails received yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "pending-agents" && (
            <div>
              <h2>Pending Agents</h2>
              <ul>
                {agent.length > 0 ? (
                  agent.map((agents) => (
                    <li key={agents._id}>
                      {agents.Name} - {agents.Email} - {agents.Status}
                      {agents.Status === "Pending" && (
                        <>
                          <button style={{ width: "8%", height: "40px", justifyContent: "center", marginTop: "1%", alignItems: "center", marginLeft: "4%" }} onClick={() => handleApprove(agents._id)}>Approve</button>
                          <button style={{ marginLeft: "5%", width: "8%", height: "40px" }} onClick={() => handleReject(agents._id)}>Reject</button>
                        </>
                      )}
                    </li>
                  ))
                ) : (
                  <li>No pending agents.</li>
                )}
              </ul>
            </div>
          )}
          {
            activeTab === 'userslist' && (
              <div>
                <h2>Users List</h2>
                <table style={{ marginTop: "3%", width: "100%" }}>
                  <thead>
                    <tr style={{ fontWeight: "lighter",marginBottom:"3%",marginLeft:"1%"}}>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Phone No</th>
                    </tr>
                  </thead>
                  <tbody >
                  {
                    users.map((udetail,index)=>(
                     
                      <tr key={index} style={{height:"56px",marginBottom:"15%",fontWeight:"lighter", boxShadow: "1px 2px 5px gray",backgroundColor: "white"}}>
                          <td style={{paddingLeft:"2%"}}> {udetail.name}</td> 
                          <td>{udetail.email}</td> 
                          <td>{udetail.address}</td> 
                           <td>{udetail.ph}</td>
                      </tr>
                     
                   
                    ))
                  }
                  </tbody>
                  {/* <tbody>
                    {users.map((udetail, index) => (
                      <tr key={index} style={{ fontWeight: "lighter" }}>
                        <td colSpan="4" style={{ paddingBottom: "3%" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              padding: "20px",
                              boxShadow: "1px 2px 5px gray",
                              backgroundColor: "white",
                              borderRadius: "5px" 
                            }}
                          >
                            <span style={{ fontWeight: "lighter" }}>{udetail.name}</span>
                            <span style={{ fontWeight: "lighter" }}>{udetail.email}</span>
                            <span style={{ fontWeight: "lighter" }}>{udetail.address}</span>
                            <span style={{ fontWeight: "lighter" }}>{udetail.ph}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody> */}
                </table>
              </div>
            )}
          {
            activeTab === 'agentlists' && (
              <div >
                <h2>Agent Lists</h2>
                <table style={{ width: "100%" }} >
                  <thead style={{ marginLeft: "5%" }}>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Address</th>
                      <th>Phone No</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      agem.map((lists) => (
                        <tr style={{ height: "56px", boxShadow: "1px 2px 1px 2px gray" ,paddingLeft:"1%"}}>
                          <td style={{paddingLeft:"2%"}}>{lists.Name}</td>
                          <td>{lists.Email}</td>
                          <td style={{ color: lists.Status === 'Approved' ? "green" : lists.Status === 'Rejected' ? "red" : "black" }}>{lists.Status}</td>
                          <td>{lists.address}</td>
                          <td>{lists.ph}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>


              </div>
            )
          }
          {
            activeTab==="paymentlist"&&(
              <div>
                <h2>Payment List</h2>
                {
                  payment.map((pay)=>(
                    <div style={{marginTop:"2%"}}>
                   User Id: <span style={{color:"red"}}>{pay.userId} </span><br />
                   Amount: <span style={{color:"red"}}>{pay.amount}</span> <br />
                    advance:{pay.advance} <br />
                    Payment Method: <span style={{color:"red"}}>{pay.paymentMethod}</span> <br />
                   TransactionId: <span style={{color:"red"}}>{pay.transactionId}</span>  <br />
                   Pyment Status: <span style={{color:"red"}}>{pay.paymentStatus}</span> <br />
                   Time: <span style={{color:"red"}}>{pay.createdAt}</span>  <br />
                    </div>
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Admindash;