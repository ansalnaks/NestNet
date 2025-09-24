import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import { nav1 } from './data/data'
import { Link, useNavigate } from 'react-router-dom'
import { User } from 'lucide-react'
import Mainpage from "./header";


const MyList = () => {
  const [navlist, setnavlist] = useState(false)
  const [wishlist, setwishlist] = useState([])
  const [userdetails, setUserdetails] = useState({})
  const [selectedpro, setSelectedpro] = useState(null)
  const usenav = useNavigate()

  console.log("MyList Component Rendered");

  const location = useLocation();
  const userId = location.state?.userId;
  console.log("Received userId:", userId);

  const [cart, setCart] = useState([]);
  const serverURL = "http://localhost:5000";

  const getCart = async () => {
    if (!userId) return;
    console.log("Fetching cart for user:", userId);

    try {
      const res = await axios.get(`${serverURL}/api/users/getCart/${userId}`);
      console.log("Cart API Response:", res.data);

      if (Array.isArray(res.data)) {
        setCart(res.data);
      } else {
        console.error("Unexpected response format", res.data);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };


  useEffect(() => {
    if (userId) {
      getCart();
    }
  }, [userId]);

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`${serverURL}/api/users/deletecart/${userId}/${itemId}`);
      setCart(prevCart => prevCart.filter(item => item.property?._id !== itemId));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const buy = async (product) => {
    setSelectedpro(product)
  }

  const payment = async (product) => {
    if(!selectedpro) return
    usenav('/payment',{state:{userId,product}})
    setCart(prevCart => prevCart.filter(item => item.property?._id !== selectedpro.property._id));

    setSelectedpro(null);
  }


  return (
    <div style={{ backgroundColor: "rgb(239, 241, 239)" }}>
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
            {/* <Link to={'/wishlist'} state={{ userId }}><h4>Wishlists ({wishlist.length})</h4></Link> */}
            <Link to={'/mylist'} state={{ userId }}><h4>My List</h4></Link>
            <button className='probtn' style={{ display: 'flex', alignItems: 'center', gap: '10px', border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <Link to={'/profile'} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
                <User size={40} color="black" style={{ borderRadius: '50%', background: '#f0f0f0', padding: '5px' }} />
                <span style={{ color: "black" }}>Welcome
                  {/* Welcome, {userdetails?.name || "Guest"} */}
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

      <h1 style={{ textAlign: "center", marginTop: "2%" }}>My Cart</h1>
      <div style={{ display: "flex" }}>
        <div className="lefttable" style={{}}>
          <table style={{ width: "130%", marginLeft: "1%", marginTop: "3%", backgroundColor: "white", marginBottom: "2%", paddingTop: "1%" }}  >
            <thead >
              <tr>
                <th>Product</th>
                <th>Location</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody style={{ textAlign: "center" }}>

              {cart.length > 0 ? (

                cart.map((item) => (
                  item.property?(
                  <tr key={item.property?._id} style={{ height: "103px" }}>
                    <td style={{ display: "flex", textAlign: "center" }}>
                      {item.property?.Image && (
                        <img style={{ width: "39%", height: "78px" }}
                          src={`${serverURL}/${item.property.Image}`}
                          alt={item.property?.Propertyname}
                          width="50"
                        />

                      )}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <p style={{ marginTop: "13%" }}>{item.property?.Propertyname}</p> </td>

                    <td>{item.property?.Location}</td>


                    <td>₹{item.property?.Price}</td>
                    {/* <td>Advance :₹2000</td> */}
                    <td><button style={{ width: "67%", height: "42px" }} onClick={() => removeFromCart(item.property._id)}>Remove</button></td>
                    <td><button onClick={() => buy(item)} style={{ width: "67%", height: "42px" }}> Buy</button></td>
                  </tr>
                  ):null
                ))

              ) : (
                <p>Your cart is empty.</p>
              )}
            </tbody>
          </table>
        </div>
        <div className="righttab" style={{ backgroundColor: "white", width: "40%", height: "340px", marginLeft: "19%", marginTop: '1%', boxShadow: "1px 2px 2px 2px gray",textAlign:"center",paddingTop:"2%",marginBottom:"3%" }}>
          {
            selectedpro ? (
              <>
                <h2>Buy Product</h2>
                <img src={`${serverURL}/${selectedpro.property.Image}`} alt={selectedpro.property.Propertyname}
                 style={{ width: "30%", height: "150px", objectFit: "cover" ,justifyItems:"center"}} /><br/>
             {selectedpro.property.Propertyname}<br/>
               Location: {selectedpro.property.Location}<br/>
              Price:   {selectedpro.property.Price}<br/>
                <button onClick={() => payment(selectedpro.property)}>Proceed to Payment</button>
              </>
            ):(
              <p>Select a product to buy.</p>
            )
              }
         
        </div>
      </div>
      <Footer />
    </div>
  );

};

export default MyList;
