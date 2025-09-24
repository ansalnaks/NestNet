const mongoose = require('mongoose')
const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Propertylist",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    advance:{
        type:Number,
        enum:[2000,3000]
    },
    paymentMethod:{
        type:String,
        enum:["card", "upi", "netbanking"],
        required:true
    },
    transactionId: {
        type: String,  
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["Success", "Failed"],
        default: "Success"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
const Payment=mongoose.model("Payment",paymentSchema)
module.exports=Payment