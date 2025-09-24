const Property = require('../Model/propertyModel');
const Cart = require('../Model/cartModel');
const Payment=require('../Model/PaymentModel')
const mongoose=require('mongoose')

// const addToCart = async (req, res) => {
//     try {
//         console.log("Request Headers:", req.headers);
//         console.log("User in request:", req.user); // Debugging
//         console.log("Params in request:", req.params); // Debugging

//         if (!req.user) {
//             return res.status(401).json({ message: "User not authenticated" });
//         }
//         const userId = req.user.id;
//         const propertyId = req.params.id;

//         const property = await Property.findById(propertyId);
//         if (!property) {
//             return res.status(404).json({ message: "Property not found" });
//         }
//         let cart = await Cart.findOne({ user: userId });

//         if (!cart) {
//             cart = new Cart({ user: userId, properties: [] });
//         }


//         const propertyInCart = cart.properties.some(item => item.property.toString() === propertyId);
//         if (propertyInCart) {
//             return res.status(400).json({ message: "Property already in cart" });
//         }

//         cart.properties.push({ property: propertyId });
//         await cart.save();

//         res.json({ message: "Property added to cart", cart });
//     } catch (error) {
//         console.error("Error adding to cart:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

const addToCart = async (req, res) => {
    try {
        console.log("Params in request:", req.params); // Debugging

        const propertyId = req.params.id;
        if (!propertyId || propertyId === "undefined") {
            console.error("Invalid property ID:", propertyId);
            return res.status(400).json({ message: "Invalid property ID" });
        }

        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const userId = req.user.id;

        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        // Find or create the cart
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, properties: [] });
        }

        // Check if property is already in cart
        const propertyInCart = cart.properties.some(item => item.property.toString() === propertyId);
        if (propertyInCart) {
            return res.status(400).json({ message: "Property already in cart" });
        }

        // Add to cart
        cart.properties.push({ property: propertyId });
        await cart.save();
        res.json({ message: "Property added to cart", cart });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// const getCart = async (req, res) => {
//     try {
//         const userId = req.params.id;
//         console.log("User ID:", userId);

//         // ✅ Ensure full population of properties
//         const cart = await Cart.findOne({ user: userId })
//             .populate({
//                 path: "properties.property",
//                 model: "Propertylist", // Ensure this matches propertyModel.js
//                 select: "-__v" // Exclude the __v field (optional)
//             });

//         console.log("Cart:", JSON.stringify(cart, null, 2)); // ✅ Full debug log

//         if (!cart || cart.properties.length === 0) {
//             return res.json([]);
//         }

//         res.json(cart.properties);
//     } catch (error) {
//         console.error("Error fetching cart:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };


const getCart = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            console.error("User ID is missing in request!");
            return res.status(400).json({ message: "User ID is required" });
        }

        console.log("Fetching cart for User ID:", userId);

        const cart = await Cart.findOne({ user: userId })
            .populate({
                path: "properties.property",
                model: "Propertylist",
                select: "-__v"
            });

        console.log("Cart found:", cart); 

        if (!cart || cart.properties.length === 0) {
            console.log("Cart is empty for user:", userId);
            return res.json([]);
        }

        res.json(cart.properties);
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const delCart = async (req, res) => {
    try {
        const { id: userId, itemId } = req.params;
        console.log("Removing item from cart: ", userId, itemId);
        const updatedCart = await Cart.findOneAndUpdate(
            { user: userId }, 
            { $pull: { properties: { property: itemId } } }, 
            { new: true }
        );
        if (!updatedCart) {
            return res.status(404).json({ message: "Cart not found or item not in cart" });
        }

        res.status(200).json({ message: "Item removed successfully", updatedCart });
    } catch (err) {
        console.error("Error deleting from cart:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const payment=async(req,res)=>{
    const { userId, productId, amount, paymentMethod, transactionId,advance } = req.body;
    console.log("userId",userId);
    console.log("productId",productId);
    try {
        const newPayment = new Payment({
            userId,
            productId,
            amount,
            advance,
            paymentMethod,
            transactionId,
            paymentStatus: "Success"
        });
        await newPayment.save();
        const cartItem = await Cart.findOneAndDelete({ userId: userId, "property._id": productId });
        console.log("cartitem",cartItem);
        
        const propertyItem = await Property.findByIdAndDelete(productId);
        if (!cartItem && !propertyItem) {
            return res.status(404).json({ success: false, message: "Product not found in cart or property" });
        }
        res.json({ success: true, message: "Payment recorded & product removed", payment: newPayment });
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({ success: false, message: "Payment failed" });
    }
}

const getPayment=async(req,res)=>{
    try{
        const respo=await Payment.find()
        res.status(200).json(respo)
    }catch(err){
        res.status(400).json({msg:"Error in fetching"})
    }
}
const indpayment=async(req,res)=>{
    try{
        const paym=await Payment.find({ userId: req.params.userId }).populate("productId")
        res.json(paym)
    }catch(err){
        res.status(400).json({msg:"error in fetchpayment "})
    }
}

const agentpayment = async (req, res) => {
    try {
        const { agentId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(agentId)) {
            return res.status(400).json({ msg: "Invalid Agent ID format" });
        }

        const agentProducts = await Property.find({ agentId }).select("_id");

        if (!agentProducts.length) {
            return res.status(404).json({ msg: "No products found for this agent" });
        }

        const productIds = agentProducts.map(product => product._id);

        const payments = await Payment.find({ productId: { $in: productIds } })
            .populate("productId", "Propertyname Location Price")
            .populate("userId", "name email"); 

        if (!payments.length) {
            return res.status(404).json({ msg: "No payments found for this agent's products" });
        }

        res.json(payments);
    } catch (err) {
        console.error("Error fetching agent payments:", err);
        res.status(500).json({ msg: "Internal Server Error", error: err.message });
    }
};







module.exports = { addToCart, getCart,delCart,payment ,getPayment,indpayment,agentpayment};