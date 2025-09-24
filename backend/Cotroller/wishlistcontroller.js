const Property = require('../Model/propertyModel');
const Wishlist=require('../Model/wishlistModel')

const addtowishlist = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ msg: "User not authenticated" });
        }

        const userId = req.user.id;
        const propertyId = req.params.id;

        if (!propertyId || propertyId.length !== 24) {  // Ensure it's a valid ObjectId
            return res.status(400).json({ message: "Invalid Property ID" });
        }

        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }

        let wishlt = await Wishlist.findOne({ user: userId });
        if (!wishlt) {
            wishlt = new Wishlist({ user: userId, properties: [] });
        }

        const propertyInWish = wishlt.properties.some(item => item.property.toString() === propertyId);
        if (propertyInWish) {
            return res.status(400).json({ message: "Property already in wishlist" });
        }

        wishlt.properties.push({ property: propertyId });
        await wishlt.save();

        res.json({ message: "Property added to wishlist", wishlt });
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



const getwish = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            console.error("User ID is missing in request!");
            return res.status(400).json({ message: "User ID is required" });
        }

        console.log("Fetching wishlist for User ID:", userId);

        const wishlt = await Wishlist.findOne({ user: userId })
            .populate({
                path: "properties.property",
                model: "Propertylist",
                select: "-__v"
            });

        console.log("wishlist found:", wishlt); 

        if (!wishlt || wishlt.properties.length === 0) {
            console.log("wishlist is empty for user:", userId);
            return res.json([]);
        }

        res.json(wishlt.properties);
    } catch (error) {
        console.error("Error fetching wishlist:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const delwishlt = async (req, res) => {
    try {
        const { id: userId, itemId } = req.params;
        console.log("Removing item from wishlist: ", userId, itemId);

        const updatedwishlt = await Wishlist.findOneAndUpdate(
            { user: userId }, 
            { $pull: { properties: { property: itemId } } }, 
            // { new: true } 
        ).populate({
            path: "properties.property",
            model: "Propertylist",
            select: "-__v"
        });

        if (!updatedwishlt) {
            return res.status(404).json({ message: "Wishlist not found or item not in wishlist" });
        }

        res.status(200).json({ message: "Item removed successfully", wishlist: updatedwishlt });
    } catch (err) {
        console.error("Error deleting from wishlist:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};





module.exports={addtowishlist,getwish,delwishlt}