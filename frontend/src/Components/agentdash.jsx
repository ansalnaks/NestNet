// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Pencil, Trash } from 'lucide-react'
// import { nav } from './data/data'
// import { Link, useNavigate } from 'react-router-dom'
// import Mainpagee from './mainpagee';
// import Mainpage from './header';
// import './footer.css'
// import Footer from './Footer';


// function AgentDashboard() {
//     const [activeSection, setActiveSection] = useState('properties');
//     const [navlist, setnavlist] = useState(false)
//     const [showForm, setShowform] = useState(false)
//     const [property, setProperty] = useState(' ')
//     const [pname, setName] = useState('')
//     const [location, setLocation] = useState('')
//     const [price, setPrice] = useState('')
//     const [Properties, setProperties] = useState([])
//     const [preview, setPreview] = useState('')
//     const [image, setImage] = useState(null)
//     const [editingId, setEditingId] = useState(null)
//     const [msg, setmessage] = useState([])
//     const [des,setDes]=useState('')
//     const navigate=useNavigate()
//     const serverURL = 'http://localhost:5000'

//     // const addprop = async (e) => {
//     //     e.preventDefault();

//     //     const formData = new FormData()
//     //     formData.append("Propertyname", pname)
//     //     formData.append("Location", location)
//     //     formData.append("Price", price)
//     //     formData.append("PropertyType", property)
//     //     formData.append("descri",des)
//     //     if (image) formData.append("Image", image)

//     //     try {
//     //         if (editingId) {
//     //             if (!editingId) {
//     //                 alert("Error: Invalid Property ID");
//     //                 return;
//     //             }
//     //             await axios.put(`${serverURL}/api/admin/updateProperty/${editingId}`, formData, {
//     //                 headers: { "Content-Type": "multipart/form-data" }
//     //             });
//     //             alert("Property updated successfully");
//     //             setEditingId(null);
//     //         } else {
//     //             await axios.post(`${serverURL}/api/admin/adminProperty`, formData, {
//     //                 headers: { "Content-Type": "multipart/form-data" }
//     //             });
//     //             alert("Property added successfully");
//     //         }
//     //         setName('');
//     //         setLocation('');
//     //         setPrice('');
//     //         setProperty('');
//     //         setImage(null);
//     //         setPreview('');
//     //         setDes('')
//     //         getprop();
//     //     } catch (err) {
//     //         alert("Failed to add/update property");
//     //         console.error(err);
//     //     }
//     // }

//     const addprop = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append("Propertyname", pname);
//         formData.append("Location", location);
//         formData.append("Price", price);
//         formData.append("PropertyType", property);
//         formData.append("descri", des);
//         if (image) formData.append("Image", image);

//         for (let [key, value] of formData.entries()) {
//             console.log(key, value);
//         }
//         try {
//             if (editingId) {
//                 console.log("Updating Property ID:", editingId);

//                 await axios.put(`${serverURL}/api/admin/updateProperty/${editingId}`, formData, {
//                     headers: { "Content-Type": "multipart/form-data" }, 
//                 });

//                 alert("Property updated successfully");
//                 setEditingId(null);
//             } else {
//                 await axios.post(`${serverURL}/api/admin/adminProperty`, formData, {
//                     headers: { "Content-Type": "multipart/form-data" }, 
//                 });

//                 alert("Property added successfully");
//             }

//             // Reset form fields
//             setName('');
//             setLocation('');
//             setPrice('');
//             setProperty('');
//             setImage(null);
//             setPreview('');
//             setDes('');

//             // Fetch updated properties
//             getprop();

//         } catch (err) {
//             alert("Failed to add/update property");
//             console.error("Error updating property:", err.response ? err.response.data : err);
//         }
//     };




//     useEffect(() => {
//         getprop()
//     }, [])

//     const getprop = async () => {
//         try {
//             const response = await axios.get(`${serverURL}/api/admin/getProperty`)
//             setProperties(response.data)
//         } catch (err) {
//             alert("Error in fetching")
//         }
//     }

//     const handleDelete = async (id) => {
//         if (!id) {
//             alert("Error: Invalid Property ID");
//             return;
//         }
//         if (window.confirm("Are you sure you want to delete this property?")) {
//             try {
//                 await axios.delete(`${serverURL}/api/admin/deleteProperty/${id}`);
//                 alert("Property deleted successfully");
//                 getprop();
//             } catch (err) {
//                 alert("Failed to delete property. It may not exist.");
//                 console.error(err);
//             }
//         }
//     }
//     const handleEdit = (prop) => {
//         setEditingId(prop._id);
//         setName(prop.Propertyname);
//         setLocation(prop.Location);
//         setPrice(prop.Price);
//         setProperty(prop.PropertyType);
//         setDes(prop.descri)
//         setPreview(prop.Image ? `${serverURL}/${prop.Image}` : '');
//         setShowform(true);
//     };

//     const handleimageChange = (e) => {
//         const file = e.target.files[0];
//         setImage(file);
//         setPreview(URL.createObjectURL(file));
//     }

//     const receivedmsg = async () => {
//         try {
//             const res = await axios.get(`${serverURL}/api/users/getmessage`);
//             console.log("Received data:", res.data);
//             setmessage(res.data || []);
//         } catch (err) {
//             console.error("Error fetching messages:", err);
//             alert("Error fetching messages. Please try again later.");
//         }
//     };
//     const handleSectionChange = (section) => {
//         setActiveSection(section);
//         if(section==='messages')
//             receivedmsg();
//     };
//     const logout=()=>{
//         alert("Are u want to Logout")
//         navigate("/")
//     }



//     return (
//         <div>

//             <div>
//                 <header>
//                     <div className='container-flex'>
//                         <div className='logo'>
//                             <img src="https://logo-suggestion.renderforest.com/suggestions-images/9d38/111d/9d38111d7d007bc7e9eec7e09f4891ca.png" alt="" style={{ width: "70px" }} />
//                         </div>
//                         <div className='nav'>
//                             <ul className={navlist ? "small" : 'flex'}>
//                                 {
//                                     nav.map((list, index) => (
//                                         <li style={{ justifyItems: "baseline" }} key={index}>
//                                             <Link to={list.path}>{list.text}</Link>
//                                         </li>
//                                     ))
//                                 }
//                             </ul>
//                         </div>
//                         <div className='button flex'>
//                             <h4>my list</h4>
//                             <button className='btn1'>
//                                 <a style={{ color: "white" }} href="/login"><i className='fa fa-sign-out'></i>Sign In</a>
//                             </button>
//                         </div>
//                         <div className='toggle'>
//                             <button onClick={() => setnavlist(!navlist)}>
//                                 {navlist ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
//                             </button>
//                         </div>
//                     </div>
//                 </header>
//             </div>
//             <div style={{ display: 'flex', height: '100vh'}}>
//             <div className='agentss' style={{ width: '250px', background: '#0e6733', color: '#fff', padding: '20px',height:"630px",marginTop:"2%" }}>
//                 <h2>Agent Dashboard</h2>
//                 <ul>
//                     <li onClick={() => handleSectionChange('properties')} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #555' }}>View Properties</li>
//                     {/* <li onClick={() => setShowf2orm(!showForm)}>Add property </li> */}
//                     <li onClick={() => handleSectionChange('addProperty')} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #555' }}>Add Property</li>
//                     <li onClick={() => handleSectionChange('messages')} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #555' }}>View Messages</li>
//                     <li onClick={() => handleSectionChange('profile')} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #555' }}>Profile</li>
//                     <li onClick={logout} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #555', color: 'red' }}>Logout</li>

//                     {/* <li onClick={receivedmsg}>User Messages</li> */}
//                 </ul>
//             </div>

//             <div style={{ flex: 1, padding: '20px' }}>

//                 {activeSection === 'properties' && (

//                     <div style={{display:"flex",flexWrap:"wrap"}}>
//                         <h2>Property List</h2><br /><br />
//                         {Properties.length === 0 ? (
//                             <p>No properties available</p>
//                         ) : (

//                             Properties.map((prop, index) => (
//                                 <div key={index} style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
//                                     <h3>{prop.Propertyname}</h3>
//                                     <p><strong>Location:</strong> {prop.Location}</p>
//                                     <p><strong>Price:</strong> ${prop.Price}</p>
//                                     <p><strong>Type:</strong> {prop.PropertyType}</p>
//                                     {prop.Image && <img src={`http://localhost:5000/${prop.Image}`} alt="Property" width="150px" />}
//                                     <div style={{ display: "flex", gap: "10px" }}>
//                                         <button onClick={() => handleEdit(prop)} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
//                                             <Pencil size={20} color="blue" />
//                                         </button>
//                                         <button onClick={() => handleDelete(prop._id)} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
//                                             <Trash size={20} color='red' />
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 )}
//                 {activeSection === 'addProperty' && (
//                     <div>
//                         <h2>{editingId ? "Update Property" : "Add Property"}</h2>
//                         <form action="">
//                             <label htmlFor="">Property Name</label>
//                             <input type="text" placeholder='Property' value={pname} onChange={(e) => setName(e.target.value)} /><br/>
//                             <label htmlFor="">Location</label>
//                             <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} /><br/>
//                             <label htmlFor="">Price</label>
//                             <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} /><br/>
//                             <label htmlFor="">Property type</label>
//                             <select name="" id="" value={property} onChange={(e) => setProperty(e.target.value)}><br/>
//                                 <option value="">Select</option>
//                                 <option value="rent">Rent</option>
//                                 <option value="sale">Sale</option>
//                                 <option value="lease">Lease</option>
//                             </select><br />
//                            <textarea name="" id="" placeholder='description' value={des} onChange={(e)=>setDes(e.target.value)}></textarea>
//                             <label htmlFor="">Upload Image</label>
//                             <input type="file" accept='image/*' onChange={handleimageChange} />
//                             {preview && <img src={preview} alt="Preview" width="100px" height="100px" />}<br/>
//                             <button onClick={addprop}> Submit</button>
//                         </form>
//                     </div>
//                 )}

//                 {activeSection === 'messages' && (
//                     <div>
//                         {msg.length > 0 ? (
//                             msg.map((message, index) => (
//                                 <div key={index} style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
//                                     <strong>From:</strong> {message.sender?.name || message.sender?.address || "Unknown"}
//                                     <strong>Email:</strong>{message.sender?.email || "unknown"}
//                                     <p><strong>Message:</strong> {message.message || message.content || "No content"}</p>
//                                     <p><strong>Date:</strong> {new Date(message.date).toLocaleString() || "Unknown"}</p>
//                                 </div>
//                             ))
//                         ) : (
//                             <p></p>
//                         )}
//                     </div>
//                 )}
//             </div>

//         </div>
//         <Footer/>
//         </div>
//     );
// }

// export default AgentDashboard;





import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Pencil, Trash, Save, X } from 'lucide-react';
import {  nava } from './data/data';
import { Link, useNavigate } from 'react-router-dom';
import Mainpagee from './mainpagee';
import Mainpage from './header';
import './footer.css';
import Footer from './Footer';

function AgentDashboard() {
    const [activeSection, setActiveSection] = useState('properties');
    const [navlist, setnavlist] = useState(false);
    const [showForm, setShowform] = useState(false);
    const [property, setProperty] = useState(' ');
    const [pname, setName] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [Properties, setProperties] = useState([]);
    const [preview, setPreview] = useState('');
    const [image, setImage] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [msg, setmessage] = useState([]);
    const [des, setDes] = useState('');
    const [profiles,setProfiles]=useState('')
    const [payments,setpayments]=useState([])
    const navigate = useNavigate();

    const serverURL = 'http://localhost:5000';

    const [editingProperty, setEditingProperty] = useState(null);

    // const addprop = async (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append("Propertyname", pname);
    //     formData.append("Location", location);
    //     formData.append("Price", price);
    //     formData.append("PropertyType", property);
    //     formData.append("descri", des);
    //     if (image) formData.append("Image", image);

    //     try {
    //         let response;
    //         if (editingId) {
    //           response= await axios.put(`${serverURL}/api/admin/updateProperty/${editingId}`, formData, {
    //                 headers: { "Content-Type": "multipart/form-data" },
    //             });
    //             alert("Property updated successfully");
    //             setEditingId(null);
    //         } else {
    //            response= await axios.post(`${serverURL}/api/admin/adminProperty`, formData, {
    //                 headers: { "Content-Type": "multipart/form-data" },
    //             });
    //             alert("Property added successfully");
    //         }
    //         const productId=response.data.id
    //         localStorage.setItem("productId",productId)
    //         console.log("jfjhfh",productId);
            
    //         setName('');
    //         setLocation('');
    //         setPrice('');
    //         setProperty('');
    //         setImage(null);
    //         setPreview('');
    //         setDes('');
    //         getprop();
    //     } catch (err) {
    //         alert("Failed to add/update property");
    //         console.error("Error updating property:", err.response ? err.response.data : err);
    //     }
    // };

    const addprop = async (e) => {
        e.preventDefault();
        const agentId = localStorage.getItem("agentId"); // Retrieve agentId

        if (!agentId) {
            alert("Error: Agent ID is missing. Please log in again.");
            return;
        }
        const formData = new FormData();
        formData.append("Propertyname", pname);
        formData.append("Location", location);
        formData.append("Price", price);
        formData.append("PropertyType", property);
        formData.append("descri", des);
        formData.append("agentId", localStorage.getItem("agentId"));
        if (image) formData.append("Image", image);

        try {
            let response;
            if (editingId) {
              response= await axios.put(`${serverURL}/api/admin/updateProperty/${editingId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("Property updated successfully");
                setEditingId(null);
            } else {
               response= await axios.post(`${serverURL}/api/admin/adminProperty`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                alert("Property added successfully");
            }
            console.log("Full response data:", response.data);
            const productId=response.data.agentId
            localStorage.setItem("productId",productId)
            console.log("jfjhfh",productId);
            
            setName('');
            setLocation('');
            setPrice('');
            setProperty('');
            setImage(null);
            setPreview('');
            setDes('');
            getprop();
        } catch (err) {
            alert("Failed to add/update property");
            console.error("Error updating property:", err.response ? err.response.data : err);
        }
    };
    

    useEffect(() => {
        getprop();
    }, []);

    // const getprop = async () => {
    //     try {
    //         const response = await axios.get(`${serverURL}/api/admin/getProperty`);
    //         setProperties(response.data);
    //     } catch (err) {
    //         alert("Error in fetching");
    //     }
    // };

    const getprop = async () => {
        try {
            const token = localStorage.getItem("token"); 
            const agentId = localStorage.getItem("agentId"); 
            
            if (!agentId) {
                alert("Error: No agent ID found.");
                return;
            }
    
            const response = await axios.get(`${serverURL}/api/admin/getProperty/${agentId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
            setProperties(response.data);
        } catch (err) {
            alert("Error in fetching properties.");
            console.error(err);
        }
    };
    

    const handleDelete = async (id) => {
        if (!id) {
            alert("Error: Invalid Property ID");
            return;
        }
        if (window.confirm("Are you sure you want to delete this property?")) {
            try {
                await axios.delete(`${serverURL}/api/admin/deleteProperty/${id}`);
                alert("Property deleted successfully");
                getprop();
            } catch (err) {
                alert("Failed to delete property. It may not exist.");
                console.error(err);
            }
        }
    };

    const handleEdit = (prop) => {
        setEditingProperty(prop);
    };

    const handleSave = async (id) => {
        const updatedProperty = editingProperty;
        const formData = new FormData();
        formData.append("Propertyname", updatedProperty.Propertyname);
        formData.append("Location", updatedProperty.Location);
        formData.append("Price", updatedProperty.Price);
        formData.append("PropertyType", updatedProperty.PropertyType);
        formData.append("descri", updatedProperty.descri);
        if (image) formData.append("Image", image);

        try {
            await axios.put(`${serverURL}/api/admin/updateProperty/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Property updated successfully");
            setEditingProperty(null);
            getprop();
        } catch (err) {
            alert("Failed to update property");
            console.error(err);
        }
    };

    const handleCancel = () => {
        console.log("editing button is clicked");
        setEditingProperty(null)
        console.log(editingProperty);

    }
    const handleimageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const receivedmsg = async () => {
        try {
            const agentId = localStorage.getItem("agentId");
            const res = await axios.get(`${serverURL}/api/users/getmessage`, {
                params: { agentId }
              });
            console.log("Received data:", res.data);
            setmessage(res.data || []);
        } catch (err) {
            console.error("Error fetching messages:", err);
            alert("Error fetching messages. Please try again later.");
        }
    };
    const profile = async () => {
        try {
          const token = localStorage.getItem('token'); 
      
          const res = await axios.get(`${serverURL}/api/admin/singleagent`, {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          });
      
          setProfiles(res.data);
        } catch (err) {
          console.error('Error fetching profile:', err);
        }
      };

      const agentId = localStorage.getItem("agentId"); 

    //   const getpayments = async () => {
    //     const agentId = localStorage.getItem("agentId");
    //     if (!agentId) {
    //         console.error("Agent ID is missing");
    //         return;
    //     }  
    //     try {
    //         const res = await axios.get(`${serverURL}/api/users/agentpay/${agentId}`);
    //         console.log("Payments Data:", res.data); 
    //         setpayments(res.data);
    //     } catch (err) {
    //         console.error("Error in getting payment:", err.response?.data || err.message);
    //     }
    // };
    
    
      
    
    const handleSectionChange = (section) => {
        setActiveSection(section);
        if (section === 'messages') receivedmsg();
        if(section==='profile') profile()
       
    };

    const logout = () => {
        alert("Are you sure you want to Logout?");
        navigate("/");
    };

    const inputStyle = {
        width: "70%",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }

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
                                {nava.map((list, index) => (
                                    <li style={{ justifyItems: "baseline" }} key={index}>
                                        <Link to={list.path}>{list.text}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='button flex'>
                        <a href="/"> <h4> <i className="fa fa-user"></i>Log Out</h4></a>
                        <button className='btn1'>
                                <a style={{ color: "white" }} href="/agentdash">Welcome {profiles.Name}</a>
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

            <div style={{ display: 'flex', height: 'auto' ,minHeight:"740px"}}>
                <div className='agentss' style={{ width: '250px', background: '#0e6733', color: '#fff', padding: '20px', height: "auto", marginTop: "2%",marginBottom:"2%" }}>
                    <h2>Agent Dashboard</h2>
                    <ul>
                        <li onClick={() => handleSectionChange('properties')} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #555' }}>View Properties</li>
                        <li onClick={() => handleSectionChange('addProperty')} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #555' }}>Add Property</li>
                        <li onClick={() => handleSectionChange('messages')} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #555' }}>View Messages</li>
                        <li onClick={() => handleSectionChange('profile')} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #555' }}> <i className='fa fa-user' style={{fontSize:"15px",fontFamily:"times",fontWeight:"lighter"}}> Profile</i></li>
                        {/* <li onClick={()=>handleSectionChange("payments")} style={{cursor: 'pointer', padding: '10px', borderBottom: '1px solid #555'}}>Payments</li> */}
                        {/* <li onClick={logout} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #555', color: 'red' }}>Logout</li> */}
                    </ul>
                </div>

                <div style={{ flex: 1, padding: '20px' }}>
                    {activeSection === 'properties' && (
                        // <div><h2>Property List</h2><br /><br />
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                            
                            {Properties.length === 0 ? (
                                <p>No properties available</p>
                            ) : (
                                
                                Properties.map((prop, index) => (
                                
                                    <div key={index} className='hoverdiv' style={{ border: "0px solid gray",transition:"transform 0.3s ease-in-out",boxShadow:"1px 2px 1px lightgray ", padding: "10px", margin: "10px" ,width:"340px",borderRadius:"5px"}}>
                                        
                                        {editingProperty && editingProperty._id === prop._id ? (
                                            <>
                                            Property Name:  <input  style={{marginTop:"15%"}} type="text" value={editingProperty.Propertyname}
                                                 onChange={(e) => setEditingProperty({ ...editingProperty, Propertyname: e.target.value })}
                                                /><br /><br />

                                               Location:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input
                                                    type="text"
                                                    value={editingProperty.Location}
                                                    onChange={(e) => setEditingProperty({ ...editingProperty, Location: e.target.value })}
                                                /><br /><br />

                                                Price:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input
                                                    type="text"
                                                    value={editingProperty.Price}
                                                    onChange={(e) => setEditingProperty({ ...editingProperty, Price: e.target.value })}
                                                /><br /><br />

                                                Property Type:<select
                                                    value={editingProperty.PropertyType}
                                                    onChange={(e) => setEditingProperty({ ...editingProperty, PropertyType: e.target.value })}
                                                ><br /><br />

                                                    <option value="rent">Rent</option>
                                                    <option value="sale">Sale</option>
                                                    <option value="lease">Lease</option>
                                                </select><br /><br />
                                                
                                                Description:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<textarea
                                                    value={editingProperty.descri}
                                                    onChange={(e) => setEditingProperty({ ...editingProperty, descri: e.target.value })}
                                                /><br />
                                                <div style={{ display: "flex", gap: "10px" }}>
                                                    {/* <button style={{width:"27%",height:"23px",marginTop:"6%"}} onClick={() => handleSave(prop._id)}> */}
                                                        <Save style={{alignItems:"center",marginTop:"10%",marginLeft:"6%"}} onClick={()=>handleSave(prop._id)} size={26} color="green" />
                                                    {/* </button> */}
                                                    {/* <button style={{width:"27%",height:"23px",marginTop:"6%"}} onClick={handleCancel}> */}
                                                        <X style={{marginTop:"10%",marginLeft:"27%",color:"red",width:"20%"}} onClick={handleCancel} size={26} 
                                                        onMouseEnter={()=>"Cancel"}
                                                        /> 
                                                    {/* </button> */}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                             
                                                 {prop.Image && <img style={{marginTop:"-3%",marginLeft:"-3.3%",borderRadius:"5px"}} src={`http://localhost:5000/${prop.Image}`} alt="Property" width={"340px"} height={"250px"}/
                                                   > } 
                                                 <p style={{width:"40px",textAlign:"center",color:prop.PropertyType==="sale"?"red":prop.PropertyType==="rent"?"green":prop.PropertyType==="lease"?" yellow":"",
                                                 backgroundColor:prop.PropertyType==="sale"?"rgba(236, 130, 116, 0.5)":prop.PropertyType==="rent"?"lightgreen":prop.PropertyType==="lease"?"lightyellow":""
                                                 }}> {prop.PropertyType}</p>
                                                <p className='fa fa-map-marker-alt' style={{marginTop:"-9%",color:"black",fontSize:"12px"}}>{prop.Location}</p>

                                                <h3>{prop.Propertyname}</h3>
                                                 
                                                <p><strong>Price:</strong> ${prop.Price}</p>
                                                <p>{prop.descri}</p>
                                                <div style={{ display: "flex", gap: "10px" }}>
                                                    <button onClick={() => handleEdit(prop)} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
                                                       <Pencil size={20} color="blue" />
                                                    </button>
                                                    <button onClick={() => handleDelete(prop._id)} style={{ border: "none", background: "transparent", cursor: "pointer" }}>
                                                      <Trash size={20} color='red' />
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    )}


                    {activeSection === 'addProperty' && (
                        <div >
                            <h2>{editingId ? "Update Property" : "Add Property"}</h2>
                            <form action=""  >
                                <label htmlFor="">Property Name:</label>&nbsp;&nbsp;&nbsp;&nbsp;
                                <input style={inputStyle} type="text"  value={pname} onChange={(e) => setName(e.target.value)} /><br /><br />
                                <label htmlFor="">Location:</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input style={inputStyle} type="text" value={location} onChange={(e) => setLocation(e.target.value)} /><br /><br />
                                <label htmlFor="">Price</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input style={inputStyle} type="text" value={price} onChange={(e) => setPrice(e.target.value)} /><br /><br />
                                <label htmlFor="">Property type</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <select style={inputStyle} name="" id="" value={property} onChange={(e) => setProperty(e.target.value)}><br /><br />
                                    <option value="">Select</option>
                                    <option value="rent">Rent</option>
                                    <option value="sale">Sale</option>
                                    <option value="lease">Lease</option>
                                </select><br /><br />
                               Description: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;< textarea style={inputStyle}  name="" id="" placeholder='description' value={des} onChange={(e) => setDes(e.target.value)}></textarea> <br />  <br /> 
                                <label htmlFor="">Upload Image</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <input  style={inputStyle} type="file" accept='image/*' onChange={handleimageChange} /> <br /> 
                                {preview && <img src={preview} alt="Preview" width="100px" height="100px" />}<br />
                                <button  onClick={addprop}> Submit</button>
                            </form>
                        </div>
                    )}


                    {activeSection === 'messages' && (
                        <div>
                            <h2>User Messages</h2>
                            {msg.length > 0 ? (
                                msg.map((message, index) => (
                                    <div key={index} style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
                                        <strong>From:</strong> {message.sender?.name || message.sender?.address || "Unknown"} <br />
                                        <strong>Email:</strong>{message.sender?.email || "unknown"} <br />
                                        {/* <strong>Product</strong>{message.product?.Propertyname|| "No Product Info"} */}
                                        <p><strong>Message:</strong> {message.message || message.content || "No content"}</p>
                                        <p><strong>Date:</strong> {new Date(message.date).toLocaleString() || "Unknown"}</p>
                                    </div>
                                ))
                            ) : (
                                <p></p>
                            )}
                        </div>
                    )}

                    {
                        activeSection==='profile'&&(
                            <div>
                            <div style={{ border:"1px solid lightgray",padding:"10px",width:"36%",boxShadow:"1px 2px 2px lightgray",marginTop:"10%",marginLeft:"34%",height:"198px",textAlign:"center",borderRadius:'2%'}}>
                            <h2 style={{textAlign:"center", borderBottom: '2px solid #ddd',}}>Profile</h2>
                                 <span style={{color:"orange"}}> {profiles.Name}</span>  <br/>
                                 Email:  {profiles.Email}<br/>
                                  Address:  {profiles.address}<br/>
                                <button style={{width:"22%",height:"42px",marginTop:"2%"}} onClick={()=>{navigate('/')}}>LogOut</button>
                            </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AgentDashboard; 