// // import axios from 'axios';
// // import React, { useEffect, useState } from 'react';
// // import { useParams } from 'react-router-dom';
// // import Mainpage from './header';
// // import Userdashheader from './userdashheader';

// // function PropertyDetails() {
// //     const [properties, setProperties] = useState(null);  
// //     const serverUrl = 'http://localhost:5000';
// //     const { id } = useParams();

// //     const getpro = async () => {
// //         try {
// //             const res = await axios.get(`${serverUrl}/api/admin/getProperty/${id}`);
// //             console.log("Fetched property:", res.data);  
// //             if (res.data) {
// //                 setProperties(res.data); 
// //             } else {
// //                 console.log("No data found for this property ID");
// //             }
// //         } catch (err) {
// //             console.log("Error fetching property:", err.response ? err.response.data : err.message);
// //         }
// //     };

// //     useEffect(() => {
// //         getpro();
// //     }, [id]);

// //     if (!properties) {
// //         return <div>Loading...</div>;
// //     }

// //     return (
// //         <div>
// //            <Userdashheader/>
// //             <h1>{properties.Propertyname}</h1>
// //             <p>{properties.Description}</p>
// //             <p><strong>Location:</strong> {properties.Location}</p>
// //             <p><strong>Price:</strong> ₹{properties.Price}</p>
// //             <p>description:{properties.descri}</p>
// //             {properties.Image && <img src={`http://localhost:5000/${properties.Image}`} alt={properties.Propertyname} />}
// //         </div>
// //     );
// // }

// // export default PropertyDetails;


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Mainpage from './header';
// import Userdashheader from './userdashheader';
// import './PropertyDetails.css'; // Import the CSS file
// import Footer from './Footer';
// import { nav1 } from './data/data'
// import { Link, useNavigate ,useLocation} from 'react-router-dom'
// import { User } from 'lucide-react'

// function PropertyDetails() {
//     const [navlist, setnavlist] = useState(false)
//     const [userdetails, setUserdetails] = useState({})
//     const [cart, setCart] = useState([])


//     console.log("MyList Component Rendered");

//     const location = useLocation();
//     const userId = location.state?.userId;
//     console.log("Received userId:", userId);



//     const [properties, setProperties] = useState(null);  
//     const serverUrl = 'http://localhost:5000';
//     const { id } = useParams();
//     console.log("Extracted id from URL:", id);
//     const getpro = async () => {
//         try {
//             console.log("Fetching property for ID:", id); // Log the extracted id
//             const res = await axios.get(`${serverUrl}/api/admin/getProperty/${id}`);
//             console.log("Fetched property:", res.data);
            
//             if (res.data && res.data.length > 0) {
//                 setProperties(res.data[0]); 
//             } else {
//                 console.log("No data found for this property ID");
//             }
//         } catch (err) {
//             console.error("Error fetching property:", err.response ? err.response.data : err.message);
//         }
//     };
    

//     useEffect(() => {
//         getpro();
//     }, [id]);

//     if (!properties) {
//         return <div className="loading-message">Loading...</div>;
//     }

//     return (
//         <div>
//           <header>
//                           <div className='container-flex'>
//                               <div className='logo'>
//                                   <img src="https://logo-suggestion.renderforest.com/suggestions-images/9d38/111d/9d38111d7d007bc7e9eec7e09f4891ca.png" alt="" style={{ width: "70px" }} />
//                               </div>
//                               <div className='nav'>
//                                   <ul className={navlist ? "small" : 'flex'}>
//                                       {
//                                           nav1.map((list, index) => (
//                                               <li style={{ justifyItems: "baseline" }} key={index}>
//                                                   <Link to={list.path}>{list.text}</Link>
//                                               </li>
//                                           ))
//                                       }
//                                   </ul>
//                               </div>
//                               <div className='button flex'>
//                                   {/* <Link to={'/wishlist'} state={{ userId }}><h4>Wishlists </h4></Link>
//                                   <Link to={'/mylist'} state={{ userId }}><h4>My List </h4></Link> */}
//                                   <button className='probtn' style={{ display: 'flex', alignItems: 'center', gap: '10px', border: 'none', background: 'transparent', cursor: 'pointer' }}>
//                                       <Link to={'/profile'} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
//                                           <User size={40} color="black" style={{ borderRadius: '50%', background: '#f0f0f0', padding: '5px' }} />
//                                           <span style={{ color: "black" }}>
//                                               Welcome
//                                               {/* , {userdetails?.name || "Guest"} */}
//                                           </span>
//                                       </Link>
//                                   </button>
//                               </div>
//                               <div className='toggle'>
//                                   <button onClick={() => setnavlist(!navlist)}>
//                                       {navlist ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
//                                   </button>
//                               </div>
//                           </div>
//                       </header>
//            <div className="property-details-container">
//                 <div className="property-details-header">
//                     <h1>{properties.Propertyname}</h1>
//                 </div>
//                 <div className="property-details-content">
//                     <div className="property-image">
//                         {properties.Image && <img src={`http://localhost:5000/${properties.Image}`} alt={properties.Propertyname} />}
//                     </div>
//                     <div className="property-info">
//                         <p><strong>Location:</strong> {properties.Location}</p>
//                         <p><strong>Price:</strong> ₹{properties.Price}</p>
//                         <p><strong>Description:</strong> {properties.descri}</p>
//                     </div>
//                 </div>
//             </div>
//             <Footer/>
//         </div>
//     );
// }

// export default PropertyDetails;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation ,useNavigate} from 'react-router-dom';
import { User } from 'lucide-react';
import Footer from './Footer';
import { nav1 } from './data/data';
import './PropertyDetails.css';

function PropertyDetails() {
    const [navlist, setNavlist] = useState(false);
    const [userdetails, setUserdetails] = useState({});
    const [properties, setProperties] = useState(null);
      const [cart, setCart] = useState([]);
    
    const serverUrl = 'http://localhost:5000';
    const { id } = useParams();
    const location = useLocation();
    const userId = location.state?.userId;
    const usenav=useNavigate()

    console.log("Extracted id from URL:", id);

    const getpro = async () => {
        try {
            console.log("Fetching property for ID:", id);
            const res = await axios.get(`${serverUrl}/api/admin/getPropertysing/${id}`);
    
            console.log("Full API Response:", res.data); 
    
            if (res.data) {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    console.log("Setting property from array:", res.data[0]);
                    setProperties(res.data[0]); 
                } else if (typeof res.data === "object" && Object.keys(res.data).length > 0) {
                    console.log("Setting property from object:", res.data);
                    setProperties(res.data); 
                } else {
                    console.log("Empty response received.");
                }
            } else {
                console.log("No data found for this property ID");
            }
        } catch (err) {
            console.error("Error fetching property:", err.response ? err.response.data : err.message);
        }
    };
    

    useEffect(() => {
        if (id) {
            getpro();
        }
    }, [id]);

    if (!properties) {
        return <div className="loading-message">Loading...</div>;
    }
  
   const payment=()=>{
    usenav('/mylist',{state:{userId,id}})
   }

   const toggleCart = async ( prop) => {
    //  event.preventDefault();
     try {
       console.log("Property being added:", prop); // Debugging
       if (!prop || !prop._id) {
           console.error("Error: propertyId is undefined or missing!", prop);
           alert("Invalid property. Please try again.");
           return;
       }
   
       const token = localStorage.getItem("token");
       if (!token) {
           alert("Please log in to modify the cart.");
           return;
       }
       
       const userId = localStorage.getItem("userId");
       if (!userId) {
           alert("User not logged in. Please log in again.");
           return;
       }
   
       const isInCart = cart.some(item => item._id.toString() === prop._id.toString());
       let res;
   
       if (isInCart) {
           res = await axios.delete(`${serverUrl}/api/users/deletecart/${userId}/${prop._id}`, {
               headers: { Authorization: `Bearer ${token}` }
           });
           if (res.data.message === "Property removed from cart") {
               alert("Property removed from cart");
               const updatedCart = cart.filter(item => item._id.toString() !== prop._id.toString());
               setCart(updatedCart);
               localStorage.setItem("cart", JSON.stringify(updatedCart));
           }
       } else {
           console.log("Sending request to:", `${serverUrl}/api/users/addToCart/${prop._id}`); // Debug
           res = await axios.post(
               `${serverUrl}/api/users/addToCart/${prop._id}`,
               {}, 
               { headers: { Authorization: `Bearer ${token}` } }
           );
   
           if (res.data.message === "Property added to cart") {
               alert("Property added to cart");
               const updatedCart = [...cart, prop];
               setCart(updatedCart);
               localStorage.setItem("cart", JSON.stringify(updatedCart));
           } else if (res.data.message === "Property already in cart") {
               alert("Property is already in the cart");
            //    await fetchCartData(); 
           }
       }
   } catch (err) {
       console.error("Error toggling cart:", err.response?.data || err.message);
       // alert("Failed to update cart");
       alert("Property is already in the cart");
   }
   };


    return (
        <div>
            <header>
                <div className='container-flex'>
                    <div className='logo'>
                        <img src="https://logo-suggestion.renderforest.com/suggestions-images/9d38/111d/9d38111d7d007bc7e9eec7e09f4891ca.png" alt="Logo" style={{ width: "70px" }} />
                    </div>
                    <div className='nav'>
                        <ul className={navlist ? "small" : 'flex'}>
                            {nav1.map((list, index) => (
                                <li key={index}>
                                    <Link to={list.path}>{list.text}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='button flex'>
                        <button className='probtn' style={{ display: 'flex', alignItems: 'center', gap: '10px', border: 'none', background: 'transparent', cursor: 'pointer' }}>
                            <Link to={'/profile'} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
                                <User size={40} color="black" style={{ borderRadius: '50%', background: '#f0f0f0', padding: '5px' }} />
                                <span style={{ color: "black" }}>
                                    Welcome
                                    {/* , {userdetails?.name || "Guest"} */}
                                </span>
                            </Link>
                        </button>
                    </div>
                    <div className='toggle'>
                        <button onClick={() => setNavlist(!navlist)}>
                            {navlist ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
                        </button>
                    </div>
                </div>
            </header>

            <div className="property-details-container">
                <div className="property-details-header">
                    <h3>{properties.Propertyname || "No Name Available"}</h3>
                </div>
                <div className="property-details-content">
                    <div className="property-image">
                        {properties.Image ? (
                            <img src={`${serverUrl}/${properties.Image}`} alt={properties.Propertyname} />
                        ) : (
                            <p>No Image Available</p>
                        )}
                    </div>
                    <div className="property-info">
                        <p style={{marginTop:"6%"}}><strong>Location:</strong> {properties.Location || "Not Available"}</p>
                        <p><strong>Price:</strong> ₹{properties.Price || "Not Available"}</p>
                        <p><strong>Description:</strong> {properties.descri || "No Description"}</p>
                         <button style={{marginTop:"4%"}} onClick={()=>toggleCart(properties)} >Add to Cart</button> 
                    </div>
                   
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PropertyDetails;

