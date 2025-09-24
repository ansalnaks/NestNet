import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userId, product } = location.state || {}; 
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [advance, setAdvance] = useState(2000);

    useEffect(() => {
        if (!product || !userId) {
            alert("Invalid access, redirecting...");
            navigate("/");
        }
    }, [product, userId, navigate]);

    const handlePayment = async () => {
        try {
            const transactionId = "TXN" + Date.now(); 
            alert(`Payment of ₹${advance} Successful!`);
            const response = await axios.post("http://localhost:5000/api/users/payment", {
                userId,
                productId: product._id,
                amount:product.Price, 
                advance,
                paymentMethod,
                transactionId
            });

            if (response.data.success) {
                alert("Payment recorded successfully! Product reserved.");
                navigate('/ordersuccess', { state: { userId, product, paidAmount: advance } });
            } else {
                alert("Error processing payment.");
            }
        } catch (error) {
            console.error("Payment Error:", error);
            alert("Payment Failed! Try Again.");
        }
    };

    return (
        <div>

        <div style={{ textAlign: "center", padding: "20px", marginTop: "1%" ,border:"1px solid gray",width:"50%",marginLeft:"25%",marginTop:"10%",height:"299px",boxShadow:"1px 2px 1px 2px green"}}>
            <h1>Complete Your Payment</h1>
            <h2>{product?.Propertyname}</h2>
            <p>Location: {product?.Location}</p>
            <p>Price: <span style={{ color: "red" }}>₹{product?.Price}</span></p>

            <label>Advance Pay:</label>
            <select value={advance} onChange={(e) => setAdvance(parseInt(e.target.value))}>
                <option value="2000">₹2000</option>
                <option value="3000">₹3000</option>
            </select>

            <br /><br />

            <label>Choose Payment Method:</label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
                <option value="netbanking">Net Banking</option>
            </select>

            <br /><br />

            <button onClick={handlePayment} style={{ padding: "10px 20px", backgroundColor: "green", color: "white" }}>
                Pay ₹{advance}
            </button>
        </div>
        </div>
    );
};

export default Payment;
