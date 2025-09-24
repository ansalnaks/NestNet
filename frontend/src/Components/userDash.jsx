import React from 'react'
import Mainpage from './header'
import Features from './features'
import Footer from './Footer'
import '../sec.css';
// import './footer.css'
import { motion } from 'framer-motion';
import { nav1 } from './data/data'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { User } from 'lucide-react'
import axios from 'axios';
import { Send, Heart } from 'lucide-react'
import Partnership from './partnership';
import { FaHeart, FaRegHeart, FaShoppingCart, FaCartPlus } from "react-icons/fa";

function UserDash() {
  const nav = useNavigate()
  const [navlist, setnavlist] = useState(false)
  const [userdetails, setUserdetails] = useState({})
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [Location, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [proType, setPropType] = useState("")
  const [showResult, setShowresult] = useState(false)
  const [email, setemail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [Properties, setproperties] = useState([])
  const [filterp, setFilterp] = useState([])
  const [selectedType, setSelectedtype] = useState('All')
  const featureRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState({})
  const [interested, setInterested] = useState({});
  const [cart, setCart] = useState([]);
  const [wishlist,setwishlist]=useState([])
  useEffect(() => {
    getprop()
  }, [])

  const serverUrl = 'http://localhost:5000'



  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem('user'))

    console.log(userdata);

    if (userdata) {
      setUserdetails(userdata);
      setemail(userdata.email);
      console.log("User Email Loaded:", userdata.email);
    }
    else {
      console.log("No user found in localStorage");
    }
    getsearchdata();
  }, []);

  const handlesubscribe = async () => {
    if (!email) {
      alert("please login to subscribe")
      console.log(email);
    }
    try {
      await axios.post(`${serverUrl}/api/user/subscribe`, {
        email: email
      },
        { headers: { "Content-Type": "application/json" } })
      alert("subscription successfull")
      setIsSubscribed(true)
    } catch (err) {
      alert("subscribtion failed")
    }

  }


  const getsearchdata = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/admin/getproperty`)
      console.log(response.data)
      setProperties(response.data)
      // setFilteredProperties(response.data)
    } catch (err) {
      console.error("Error fetching searching:", err);
      alert("Failed to fetch user details. Check console for more info.");
    }
  }

  const searching = () => {
    let filtered = properties.filter((property) => {
      return (
        (Location ? property.Location.toLowerCase().includes(Location.toLowerCase()) : true) &&
        // (price ? property.Price.toString().includes(price) : true) &&
        (proType ? property.PropertyType.toLowerCase().includes(proType.toLowerCase()) : true)
      );
    });
    setLocation('')
    setPrice('')
    setPropType('')
    setFilteredProperties(filtered);
    setShowresult(true)
  };



  //features functions

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (featureRef.current) {
      observer.observe(featureRef.current);
    }

    return () => {
      if (featureRef.current) {
        observer.unobserve(featureRef.current);
      }
    };
  }, []);



  const getprop = async () => {
    try {
      const response = await axios.get(`${serverUrl}/api/admin/getproperty`)
      setproperties(response.data)
      setFilterp(response.data)
    } catch (err) {
      alert("Error in fetching")
    }
  }

  const fileredproperties = (type) => {
    setSelectedtype(type)
    if (type === 'All') {
      setFilterp(Properties)
    } else {
      const filtered = Properties.filter(prop => prop.PropertyType.toLowerCase() === type.toLowerCase())
      setFilterp(filtered)
    }
  }

 


  const sendmessage = async (event, index) => {
    event.preventDefault();
    if (!message || !message[index]) {
      alert("Invalid message. Please try again.");
      return;
    }
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in. Please log in again.");
      return;
    }
    const agentId = localStorage.getItem("agentId");
    if (!agentId) {
      alert("Agent not logged in. Please log in again.");
      return;
    }
    
    const productId=localStorage.getItem("productId")
    console.log("product",productId);
    
    if(!productId){
      alert("Product id not present")
      return
    }
    try {
      const res = await axios.post(`${serverUrl}/api/users/sendmessage`, {
        message: message[index],
        sender: userId,
         product: productId,
        agentId:agentId 
      });
  
      alert("Message sent successfully");
    
    } catch (err) {
      console.error("Message sending failed:", err.response?.data || err.message);
      alert(`Message failed: ${err.response?.data?.msg || "Unknown error"}`);
    }
  };



  const handleInputChange = (index, value) => {
    setMessage({ ...message, [index]: value })
  }



  // const toggleInterest = (event, index) => {
  //   setInterested((prev) => ({
  //     ...prev, [index]: !prev[index],
  //   }));
  // };

  // const toggleCart = (event, pdt) => {
  //   event.stopPropagation();

  //   setCart((prevCart) => {
  //     const itemExists = prevCart.some((item) => item._id === pdt._id);

  //     if (itemExists) {
  //       return prevCart.filter((item) => item._id !== pdt._id); // Remove from cart
  //     } else {
  //       return [...prevCart, pdt]; // Add to cart
  //     }
  //   });
  // }

  // useEffect(() => {
  //   console.log("Updated Cart:", cart);
  // }, [cart]);


  //===================================================================

  const userId = localStorage.getItem("userId");
//   const toggleCart = async (event, prop) => {
//     event.preventDefault();
//     try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//             alert("Please log in to add items to the cart.");
//             return;
//         }

//         const userId = localStorage.getItem("userId");
//         if (!userId) {
//             alert("User not logged in. Please log in again.");
//             return;
//         }

//         const res = await axios.post(
//             `${serverUrl}/api/users/addToCart/${prop._id}`,
//             {},
//             { headers: { Authorization: `Bearer ${token}` } }
//         );

//         if (res.data.message === "Property added to cart") {
//             const updatedCart = [...cart, prop];
//             setCart(updatedCart);
//             localStorage.setItem("cart", JSON.stringify(updatedCart)); // ✅ Save to localStorage
//             alert("Property added to cart");
//         } else {
//             alert(res.data.message);
//         }
//         fetchCartData();
//     } catch (err) {
//         console.error("Error adding to cart:", err);
//         alert("Failed to add property to cart");
//     }
// };


// const toggleCart = async (event, prop) => {
//   event.preventDefault();
//   try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//           alert("Please log in to add items to the cart.");
//           return;
//       }

//       const userId = localStorage.getItem("userId");
//       if (!userId) {
//           alert("User not logged in. Please log in again.");
//           return;
//       }

//       // Check if the property is already in the cart
//       const isInCart = cart.some(item => item._id === prop._id);

//       let res;
//       if (isInCart) {
//           // Remove from cart
//           res =await axios.delete(`${serverUrl}/api/users/deletecart/${userId}/${prop._id}`, {
//             headers: { Authorization: `Bearer ${token}` }
//         });



//           if (res.data.message === "Property removed from cart") {
//               alert("Property removed from cart");
//           }
//       } else {
//           // Add to cart
//           res = await axios.post(
//               `${serverUrl}/api/users/addToCart/${prop._id}`,
//               {},
//               { headers: { Authorization: `Bearer ${token}` } }
//           );

//           if (res.data.message === "Property added to cart") {
//               alert("Property added to cart");
//           }
//       }

//       // ✅ Re-fetch updated cart
//       await fetchCartData();

//   } catch (err) {
//       console.error("Error toggling cart:", err);
//       alert("Failed to update cart");
//   }
// };

// const fetchCartData = async () => {
//   try {
//       const token = localStorage.getItem("token");
//       if (!token) return; // If no token, user is not logged in.

//       const res = await axios.get(`${serverUrl}/api/users/getCart`, {
//           headers: { Authorization: `Bearer ${token}` },
//       });

//       if (res.data.cart) {
//           setCart(res.data.cart); // ✅ Update state
//           localStorage.setItem("cart", JSON.stringify(res.data.cart)); // ✅ Sync with localStorage
//       }
//   } catch (err) {
//       console.error("Error fetching cart data:", err);
//   }
// };



// useEffect(() => {
//   const storedCart = localStorage.getItem("cart");
//   if (storedCart) {
//       setCart(JSON.parse(storedCart)); // ✅ Load cart from localStorage
//   }
//   fetchCartData();
// }, []);



//------Workinh-----------
// const toggleCart = async (event, prop) => {
//   event.preventDefault();
//   try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//           alert("Please log in to modify the cart.");
//           return;
//       }

//       const userId = localStorage.getItem("userId");
//       if (!userId) {
//           alert("User not logged in. Please log in again.");
//           return;
//       }

//       // Check if the property is already in the cart
//       const isInCart = cart.some(item => item._id === prop._id);
//       console.log("propid",prop._id);
      

//       let res;
//       if (isInCart) {
//           res = await axios.delete(`${serverUrl}/api/users/deletecart/${userId}/${prop._id}`, {
//               headers: { Authorization: `Bearer ${token}` }
//           });

//           if (res.data.message === "Property removed from cart") {
//               alert("Property removed from cart");
//               const updatedCart = cart.filter(item => item._id !== prop._id);
//               console.log("ipdhg",updatedCart);
//               setCart(updatedCart);
//               localStorage.setItem("cart", JSON.stringify(updatedCart)); 
//           }
//       } else {
//           res = await axios.post(
//               `${serverUrl}/api/users/addToCart/${prop._id}`,
//               {},{ headers: { Authorization: `Bearer ${token}`}
//        } )

//           if (res.data.message === "Property added to cart") {
//               alert("Property added to cart");

             
//               const updatedCart = [...cart, prop];
//               setCart(updatedCart);
//               localStorage.setItem("cart", JSON.stringify(updatedCart)); // ✅ Sync with localStorage
//           }
//       }

//       await fetchCartData();
//   } catch (err) {
//       console.error("Error toggling cart:", err);
//       alert("Failed to update cart");
//   }
// }


// const fetchCartData = async () => {
//   try {
//       const token = localStorage.getItem("token");
//       const userId = localStorage.getItem("userId");

//       if (!token || !userId) {
//           console.log("No token or userId found");
//           return;
//       }

//       console.log(`Fetching cart for user: ${userId}`);

//       const res = await axios.get(`${serverUrl}/api/users/getCart/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//       });

//       console.log("Cart data received:", res.data);

//       if (res.data) { 
//           setCart(res.data);
//           localStorage.setItem("cart", JSON.stringify(res.data));
//       }
//   } catch (err) {
//       console.error("Error fetching cart data:", err);
//   }
// };



// useEffect(() => {
//   const storedCart = localStorage.getItem("cart");
//   if (storedCart) {
//       setCart(JSON.parse(storedCart)); // ✅ Load cart from localStorage
//   }
//   fetchCartData();
// }, []);

//==================




// const toggleCart = async (event, prop) => {
//   event.preventDefault();
//   try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//           alert("Please log in to add items to the cart.");
//           return;
//       }

//       const userId = localStorage.getItem("userId");
//       if (!userId) {
//           alert("User not logged in. Please log in again.");
//           return;
//       }

//       // Check if the property is already in the cart
//       const isInCart = cart.some(item => item._id === prop._id);
//       let updatedCart = [...cart]; // Copy current cart

//       let res;
//       if (isInCart) {
//           // Remove from cart
//           res = await axios.delete(`${serverUrl}/api/users/deletecart/${userId}/${prop._id}`, {
//               headers: { Authorization: `Bearer ${token}` }
//           });

//           if (res.data.message === "Property removed from cart") {
//               alert("Property removed from cart");
//               updatedCart = updatedCart.filter(item => item._id !== prop._id); // Remove from local state
//           }
//       } else {
//           // Add to cart
//           res = await axios.post(
//               `${serverUrl}/api/users/addToCart/${prop._id}`,
//               {},
//               { headers: { Authorization: `Bearer ${token}` } }
//           );

//           if (res.data.message === "Property added to cart") {
//               alert("Property added to cart");
//               updatedCart.push(prop); // Add to local state
//           }
//       }

//       // ✅ Update state and localStorage
//       setCart(updatedCart);
//       localStorage.setItem("cart", JSON.stringify(updatedCart));

//   } catch (err) {
//       console.error("Error toggling cart:", err);
//       alert("Failed to update cart");
//   }
// };

const toggleCart = async (event, prop) => {
  event.preventDefault();
  // try {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     alert("Please log in to modify the cart.");
  //     return;
  //   }
  //   const userId = localStorage.getItem("userId");
  //   if (!userId) {
  //     alert("User not logged in. Please log in again.");
  //     return;
  //   }
  //   const isInCart = cart.some(item => item._id.toString() === prop._id.toString());
  //   let res;
  //   if (isInCart) {
  //     res = await axios.delete(`${serverUrl}/api/users/deletecart/${userId}/${prop._id}`, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });
  //     if (res.data.message === "Property removed from cart") {
  //       alert("Property removed from cart");
  //       const updatedCart = cart.filter(item => item._id.toString() !== prop._id.toString());
  //       setCart(updatedCart); // Update state
  //       localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  //     }
  //   } else {
  //     res = await axios.post(
  //       `${serverUrl}/api/users/addToCart/${prop._id}`,
  //       {}, 
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     if (res.data.message === "Property added to cart") {
  //       alert("Property added to cart");
  //       const updatedCart = [...cart, prop];
  //       setCart(updatedCart); 
  //       localStorage.setItem("cart", JSON.stringify(updatedCart)); 
  //     } else if (res.data.message === "Property already in cart") {
        
  //       alert("Property is already in the cart");
  //       await fetchCartData(); 
  //     }
  //   }
  // } catch (err) {
  //   console.error("Error toggling cart:", err.response?.data || err.message);
  //   alert("Failed to update cart");
  //   // alert("Item already in cart")
  // }
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
            await fetchCartData(); 
        }
    }
} catch (err) {
    console.error("Error toggling cart:", err.response?.data || err.message);
    // alert("Failed to update cart");
    alert("Property is already in the cart");
}
};


const fetchCartData = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      console.log("No token or userId found");
      return;
    }

    const res = await axios.get(`${serverUrl}/api/users/getCart/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data) {
      setCart(res.data); // Update state
      localStorage.setItem("cart", JSON.stringify(res.data)); // Update localStorage
    }
  } catch (err) {
    console.error("Error fetching cart data:", err);
  }
};

useEffect(() => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    setCart(JSON.parse(storedCart)); // Load cart from localStorage
  }
  fetchCartData(); // Fetch cart data from the server
}, []);

console.log("cart items",cart);



  const handleclick = (prop) => {
    console.log("Clicked Property:", prop);
    if (prop && prop._id) {
      nav(`/userdash/${prop._id}`, { state: { userId } });
    } else {
      console.error("Property ID is missing", prop);
    }
    console.log("Fetched Property:", prop);
  };




  const toggleInterest = async (event, prop) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Please log in to modify the wishlist.");
            return;
        }

        const userId = localStorage.getItem("userId");
        if (!userId) {
            alert("User not logged in. Please log in again.");
            return;
        }

        if (!prop || !prop._id || prop._id.length !== 24) { 
            console.error("Invalid property ID:", prop);
            alert("Invalid property data.");
            return;
        }

        const isInWishlist = wishlist.some(item => item._id.toString() === prop._id.toString());
        let res;

        if (isInWishlist) {
            res = await axios.delete(`${serverUrl}/api/users/delwishlist/${userId}/${prop._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.message === "Property removed from wishlist") {
                alert("Property removed from wishlist");
                const updatedWishlist = wishlist.filter(item => item._id.toString() !== prop._id.toString());
                setwishlist(updatedWishlist);
                localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            }
        } else {
            res = await axios.post(
                `${serverUrl}/api/users/addtowishlist/${prop._id}`,
                {},
                { headers: { Authorization: `Bearer ${token}`} }
            );

            if (res.data.message === "Property added to wishlist") {
                alert("Property added to wishlist");
                const updatedWishlist = [...wishlist, prop];
                setwishlist(updatedWishlist);
                localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
            } else if (res.data.message === "Property already in wishlist") {
                alert("Property is already in the wishlist");
                await fetchwltData();
            }
        }
    } catch (err) {
        console.error("Error toggling wishlist:", err.response?.data || err.message);
        // alert("Failed to update wishlist");
        alert("Property already in wishlist")
    }
};
console.log("wishlist",wishlist);


const fetchwltData = async () => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      console.log("No token or userId found");
      return;
    }

    const res = await axios.get(`${serverUrl}/api/users/getwishlist/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.data) {
      setwishlist(res.data);
      localStorage.setItem("wishlist", JSON.stringify(res.data));

      // Update interested state
      const wishlistIds = new Set(res.data.map(item => item.property?._id)); 
      setInterested(properties.map(prop => wishlistIds.has(prop._id))); 
    }
  } catch (err) {
    console.error("Error fetching wishlist:", err);
  }
};

const productId = localStorage.getItem("productId");
useEffect(() => {
  const storedWishlist = localStorage.getItem("wishlist");
  if (storedWishlist) {
    const wishlistData = JSON.parse(storedWishlist);
    setwishlist(wishlistData);

    // Sync interested state
    const wishlistIds = new Set(wishlistData.map(item => item.property?._id));
    setInterested(properties.map(prop => wishlistIds.has(prop._id)));
  }
  fetchwltData();
}, [properties]); // Add properties as a dependency



  return (
    <div>
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
                        <Link to ={'/payHis'} state={{ userId  }} >Payments</Link>

            </ul>
          </div>
          <div className='button flex'>
          <Link to={'/wishlist'} state={{ userId }}><h4>Wishlists </h4></Link>
          <Link to={'/mylist'} state={{ userId }}><h4>My List</h4></Link>
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

      {/* section potion */}

      <section className='sec'>
        <div className='containers'>
          <div className='heading'>
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 3, y: 5 }}
              transition={{ duration: 2.5 }}
            >
              <h1>The Best Way to Find Your Dream Home</h1>
              <p >Your journey to the perfect home starts here. Explore, discover, and settle into your ideal space effortlessly.</p>
            </motion.div>
          </div>
          <form action="" className="flex"
            onSubmit={(e) => {
              e.preventDefault();
              searching();
            }}>
            <div className='box'>
              <span>City/Street</span><br />
              <input type="text" placeholder='Location' value={Location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className='box'>
              <span>Property Type</span><br />
              <input type="text" placeholder='Property Type' value={proType} onChange={(e) => setPropType(e.target.value)} />
            </div>
            <div className='box'>
              <span>Price Range</span><br />
              <input type="text" placeholder='Price Range' value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <button className='btn'>
              <i className='fa fa-search'></i>
            </button>
          </form>
        </div>
      </section>
      {showResult && (
        <div className="searchresult" style={{ display: "flex", flexWrap: "wrap" }}>
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property, index) => (
              <div style={{ border: "1px solid black", marginTop: "2%" }} key={index} className="property-card">
                  <p><b>    {property.Image && (
                      <img src={`http://localhost:5000/${property.Image}`} alt="Property" style={{
                        width: "100%", height: "250px",
                        objectFit: "cover", borderRadius: "8px",
                      }}
                      />)}
                      </b></p>
                <h3>{property.name}</h3>
                <p><b>Location:</b> {property.Location}</p>
                <p><b>Type:</b> {property.PropertyType}</p>
                <p><b>Price:</b> ${property.Price}</p>
                {/* <p><b>{property.Image}</b></p> */}
              
                <div style={{display:"flex"}}>
                <button style={{
                        flex: 1, padding: "10px",
                        borderRadius: "6px", border: "none",
                        background: wishlist.some((item) => item._id === property._id)? "#dc3545" : "#28a745", // Red if interested, Green otherwise
                        color: "white",
                        fontWeight: "bold", cursor: "pointer",
                        transition: "0.3s",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        gap: "5px"
                      }}
                        onClick={(event) => { toggleInterest(event, property); event.stopPropagation() }}
                      >
                        {wishlist.some((item) => item._id === property._id) ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
                        {/* {wishlist.some((item)=>item._id.toString() === prop._id.toString())? "Interested" : "Interest"} */}
                      </button>
                <button
                        style={{
                          flex: 1,
                          padding: "10px",
                          borderRadius: "6px",
                          border: "none",
                          background: cart.some((item) => item._id === property._id) ? "#ff9800" : "#ffc107",
                          color: "black",
                          fontWeight: "bold",
                          cursor: "pointer",
                          transition: "0.3s",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px",
                        }}
                        onClick={(event) => {
                          toggleCart(event, property);
                          event.stopPropagation();
                        }}
                      >
                        {cart.some((item) => item._id === property._id) ? <FaShoppingCart size={18} /> : <FaCartPlus size={18} />}
                        {/* {cart.some((item) => item._id === prop._id) ? "Added" : "Add to Cart"}                       */}
                        {/* {cart.some((item) => item._id.toString() === prop._id.toString()) ? "Added" : "Add to Cart"} */}
                        </button>
                        </div>


              </div>
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>
      )}

      {/* -----------------features------------------ */}



      <div >
        <section className='featuredbg' ref={featureRef}>
          <div className='containers'>
            {/* <Heading title='Featured property Type ' subtitle='Find all Type of Property.'/> */}
            <h2 className={`feature-heading ${isVisible ? "visible" : ""}`} style={{ textAlign: "center", fontSize: "33px", fontFamily: "Poppins, sans-serif" }}>
              Featured Property Type
            </h2>
            <h5 className={`feature-heading ${isVisible ? "visible" : ""}`} style={{ fontSize: "24px", textAlign: "center", marginTop: "2%", fontFamily: "Poppins, sans-serif" }}>
              Find all Types of Property
            </h5>
            <div className='featbutt' style={{ justifyContent: "center", paddingLeft: "37%", marginTop: "4%" }}>
              <button onClick={() => fileredproperties('All')} className={selectedType === 'All' ? 'active' : ''}>Explore</button>
              <button onClick={() => fileredproperties('Lease')} className={selectedType === 'Lease' ? 'active' : ''}>Lease</button>
              <button onClick={() => fileredproperties('Rent')} className={selectedType === 'Rent' ? 'active' : ''}>Rent</button>
              <button onClick={() => fileredproperties('Sale')} className={selectedType === 'Sale' ? 'active' : ''}>Sale</button>
            </div>



            <div
              style={{ display: "flex", flexWrap: "wrap", gap: "34px", padding: "20px", marginLeft: "2%" }}>
              {filterp.length === 0 ? (
                <p style={{ color: "gray", fontSize: "18px" }}>No properties available</p>
              ) : (
                filterp.map((prop, index) => (
                  <div key={index} onClick={() => handleclick(prop)}
                    style={{
                      width: "320px", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", padding: "15px", position: "relative", overflow: "hidden",
                      transition: "transform 0.3s ease-in-out,boxShadow:0.3s ease-in-out", cursor: "pointer",
                    }} className="property-card"
                  >
                    {prop.Image && (
                      <img src={`http://localhost:5000/${prop.Image}`} alt="Property" style={{
                        width: "100%", height: "250px",
                        objectFit: "cover", borderRadius: "8px",
                      }}
                      />)}
                      <p style={{marginTop:"2%",color: prop.PropertyType === "sale" ? "green" 
                    : prop.PropertyType === "rent" ? "orange" 
                    : prop.PropertyType === "lease" ? "yellow" 
                    : "black",
                    backgroundColor: prop.PropertyType === "sale" ? "rgba(144, 238, 144, 0.5)" 
                    : prop.PropertyType === "rent" ? "rgba(255, 160, 122, 0.5)"  
                    : prop.PropertyType === "lease" ? "lightyellow"  
                    : "black" ,
                    width:"27%",justifyContent:"center",textAlign:"center",height:"25px"}}>For {prop.PropertyType}    </p>  
                      
                    <h3 style={{ fontSize: "18px", fontWeight: "bold", marginTop: "10px" }}>
                      {prop.Propertyname}
                    </h3>

                    {/* <div style={{
                      fontSize: "14px", color: "black", position: "absolute", marginTop: "-72%", background: "rgba(0, 0, 0, 0.6)",
                      color: "white", padding: "5px 10px", borderRadius: "5px", fontSize: "14px", fontWeight: "bold",
                    }}>
                      Type: {prop.PropertyType}
                    </div> */}
                    

                    <p>
                      <i className='fa fa-map-marker-alt' style={{ color: "gray" }}></i> {prop.Location}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹{prop.Price}
                    </p>

                      <p><strong style={{color:"gray"}}>{prop.descri}</strong></p>
                    <div style={{ display: "flex", marginTop: "3%" }}>
                      <input style={{ border: "1px solid  lightgray", width: "78%" }} type="text" value={message[index] || ""}  placeholder='Send Message ' onChange={(e) => handleInputChange(index, e.target.value)} onClick={(e) => e.stopPropagation()} />
                      &nbsp;<button style={{ width: "4px", height: "4px", }} onClick={(event) => { sendmessage(event, index); event.stopPropagation();}} >
                        <Send size={"18"} marginTop="-12px"></Send>
                      </button>

                      {/* <button onClick={() => handleInterest(index)} style={{
                        position: "absolute", top: "10px", right: "10px", background: "none", border: "none", cursor: "pointer",
                      }} >
                        <Heart size={22} color="g" fill="green" />
                      </button> */}
                    </div>
                    <div style={{
                      display: "flex", justifyContent: "space-between", marginTop: "12px"
                    }}>
                      <button style={{
                        flex: 1, padding: "10px",
                        borderRadius: "6px", border: "none",
                        background: wishlist.some((item) => item._id === prop._id)? "#dc3545" : "#28a745", // Red if interested, Green otherwise
                        color: "white",
                        fontWeight: "bold", cursor: "pointer",
                        transition: "0.3s",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        gap: "5px"
                      }}
                        onClick={(event) => { toggleInterest(event, prop); event.stopPropagation() }}
                      >
                        {wishlist.some((item) => item._id === prop._id) ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
                        {/* {wishlist.some((item)=>item._id.toString() === prop._id.toString())? "Interested" : "Interest"} */}
                      </button>

                      &nbsp;
                      <button
                        style={{
                          flex: 1,
                          padding: "10px",
                          borderRadius: "6px",
                          border: "none",
                          background: cart.some((item) => item._id === prop._id) ? "#ff9800" : "#ffc107",
                          color: "black",
                          fontWeight: "bold",
                          cursor: "pointer",
                          transition: "0.3s",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px",
                        }}
                        onClick={(event) => {
                          toggleCart(event, prop);
                          event.stopPropagation();
                        }}
                      >
                        {cart.some((item) => item._id === prop._id) ? <FaShoppingCart size={18} /> : <FaCartPlus size={18} />}
                        {/* {cart.some((item) => item._id === prop._id) ? "Added" : "Add to Cart"}                       */}
                        {/* {cart.some((item) => item._id.toString() === prop._id.toString()) ? "Added" : "Add to Cart"} */}
                        </button>

                    </div>
                    {/* </div> */}
                  </div>

                ))
              )}
            </div>
          </div>
        </section>
      </div>
      <Partnership />
      <Footer handlesubscribe={handlesubscribe} />

    </div>
  )
}

export default UserDash