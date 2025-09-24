import { useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PaymentHis = () => {
    const [payments, setPayments] = useState([]);
    const location = useLocation();
  const userId = location.state?.userId;
  const productId = localStorage.getItem("productId") || "";

  console.log("Location State:", location.state);
  console.log("Payment History - Received userId:", userId); 

  console.log("Payment History - Received proId:", productId); 

  
    

  useEffect(() => {
    const fetchPayments = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/users/payHis/${userId}`);
            console.log("Fetched Payments Data:", res.data); 
            
            setPayments(res.data);
        } catch (error) {
            console.error("Error fetching payments:", error);
        }
    };
    fetchPayments();
}, [userId, productId]);

    

    return (
        <div>
            <span style={{color:"green"}}><h2 style={{marginBottom:"3%",marginTop:"2%"}}>Payment History</h2></span>
            <div >
            <p>Product ID : {productId}</p> 
            {payments.map((payment) => (
                <div key={payment._id} style={{border:"1px solid gray",boxShadow:"1px 2px gray",marginBottom:"2%",height:"123px",marginTop:"1%"}}>
                    <p>.</p>
                    <p>User: {payment.userId}</p>
                    {/* <p>Product:{payment.productId}</p> */}
                    <p>Amount: ₹{payment.amount}</p>
                    <p>Advance:{payment.advance}</p>
                    <p>Payment Method: {payment.paymentMethod}</p>
                    <p>Transaction ID: {payment.transactionId}</p>
                </div>
            ))}
            </div>
        </div>
    );
};

export default PaymentHis