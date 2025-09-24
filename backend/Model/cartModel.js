const mongoose=require('mongoose')
const Property=require('./propertyModel')
const User=require('./registerModel')
const cartSchema= new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    properties: [
        {
            property: { type: mongoose.Schema.Types.ObjectId, ref: "Propertylist", required: true },
        }
    ],
    
})
const Cart = mongoose.model("Cart",cartSchema);
module.exports = Cart;