const mongoose=require('mongoose')
const Property=require('./propertyModel')
const User=require('./registerModel')
const WishlistSchema= new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    properties: [
        {
            property: { type: mongoose.Schema.Types.ObjectId, ref: "Propertylist", required: true },
        }
    ],
    
})
const Wishlist= mongoose.model("Wishlist",WishlistSchema);
module.exports = Wishlist;