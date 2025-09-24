import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { nav1 } from './data/data'
import { Link, useNavigate } from 'react-router-dom'
import { User } from 'lucide-react'
import axios from "axios";
import Footer from "./Footer";


const Wishlist = () => {
    const [navlist, setnavlist] = useState(false)
    const [userdetails, setUserdetails] = useState({})
    const [cart, setCart] = useState([])


    console.log("MyList Component Rendered");

    const location = useLocation();
    const userId = location.state?.userId;
    console.log("Received userId:", userId);

    const [wishlist, setwishlist] = useState([]);
    const serverURL = "http://localhost:5000";

    const getWishlist = async () => {
        if (!userId) return;
        console.log("Fetching cart for user:", userId);

        try {
            const res = await axios.get(`${serverURL}/api/users/getwishlist/${userId}`);
            console.log("Cart API Response:", res.data);

            if (Array.isArray(res.data)) {
                setwishlist(res.data);
            } else {
                console.error("Unexpected response format", res.data);
            }
        } catch (err) {
            console.error("Error fetching cart:", err);
        }
    };


    useEffect(() => {
        if (userId) {
            getWishlist();
        }
    }, [userId]);

    const removeFromwishlist = async (itemId) => {
        try {
            await axios.delete(`${serverURL}/api/users/delwishlist/${userId}/${itemId}`);
            setwishlist(prevCart => prevCart.filter(item => item.property?._id !== itemId));
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    const addtocart = async (event, prop) => {

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
                res = await axios.delete(`${serverURL}/api/users/deletecart/${userId}/${prop._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data.message === "Property removed from cart") {
                    alert("Property removed from cart");
                    const updatedCart = cart.filter(item => item._id.toString() !== prop._id.toString());
                    setCart(updatedCart);
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                }
            } else {
                console.log("Sending request to:", `${serverURL}/api/users/addToCart/${prop._id}`); // Debug
                res = await axios.post(
                    `${serverURL}/api/users/addToCart/${prop._id}`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (res.data.message === "Property added to cart") {
                    alert("Property added to cart");
                    const updatedCart = [...cart, prop];
                    setCart(updatedCart);
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                } else if (res.data.message === "Property already in cart") {
                    alert("Property is already in  cart");
                }
            }
        } catch (err) {
            console.error("Error toggling cart:", err.response?.data || err.message);
            // alert("Failed to update cart");
            alert("Property is already in the cart");
        }
    };
    console.log("cart", cart);


    return (
        <div style={{backgroundColor:"rgb(239, 241, 239)"}}>

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
                        <Link to={'/wishlist'} state={{ userId }}><h4>Wishlists </h4></Link>
                        <Link to={'/mylist'} state={{ userId }}><h4>My List </h4></Link>
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


            <h1 style={{textAlign:"center",marginTop:"2%"}}>My Wishlist</h1>
            <div style={{}}>
            <table style={{ width: "50%", marginLeft: "4%", marginTop: "2%", backgroundColor: "white", marginBottom: "2%", paddingTop: "1%",paddingLeft:"2%" }}  >
                <thead >
                    <tr>
                        <th>Product</th>
                        <th>Location</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody style={{ textAlign: "center" }}>

                    {wishlist.length > 0 ? (

                        wishlist.map((item, event) => (
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
                                <td><button style={{ width: "67%", height: "42px" }} onClick={() => removeFromwishlist(item.property._id)}>Remove</button></td>
                                <td> <button style={{ height: "42px" }} onClick={() => addtocart(event, item.property)}> Add to cart </button></td>
                            </tr>
                            ):null
                        ))

                    ) : (
                        <p>Your Wishlist is empty.</p>
                    )}
                </tbody>
            </table>
            </div>
            <Footer />
        </div>
    );

};

export default Wishlist;
