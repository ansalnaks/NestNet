import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Ordersuccess() {
    const location=useLocation()
    const {product}=location.state||{}
    const usenav=useNavigate()
  return (
    <div style={{textAlign:"center",padding:"20px",marginTop:"10%",border:"1px solid gray",boxShadow:"1px 2px 1px 2px green",width:"50%",marginLeft:"24%"}}>
       <span style={{color:"green"}}> <h1>Payment Successfull</h1></span>
        <h2>{product?.Propertyname} has been Booked further communication via call!</h2>
        <p>{product?.Location}</p>
        <p>{product?.Price}</p>
        <p>as{product?.advance}</p>
        <button onClick={()=>usenav('/userdash')}>Go to Home</button>
    </div>
  )
}

export default Ordersuccess