const { error } = require('console');
const Property=require('../Model/propertyModel')
const multer=require('multer')
const path = require('path');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const agents=require('../Model/agentRlModel')
const secretkey='ansa@123'
const mongoose=require('mongoose')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + '-' + file.originalname)
    }
})


const uploads=multer({storage})

 addProperty=async(req,res)=>{
    try{
        const{Propertyname,Location,Price,PropertyType,Image,descri,agentId}=req.body
        const imagePath = req.file ? req.file.path : null;
        if(!Propertyname||!Location||!Price||!PropertyType||!descri){
            return res.status(400).json({msg:"All fields are required"})
        }
        const propert=await new Property({Propertyname,Location,Price,PropertyType,Image: imagePath,descri ,agentId})
        console.log(Propertyname,Location,Price,PropertyType,descri,agentId);
        
        propert.save()
        return res.status(200).json(propert)
    }
    catch(err){
        return res.status(400).json({msg:"Property added Failed"})
    }
}

getAllProperty=async(req,res)=>{
    try{
        const proper=await Property.find()
        res.json(proper)
    }catch(err){
        return res.status(400).json({msg:"err"})
    }
}

getProperty=async(req,res)=>{
    try{
        const agentId = req.params.agentId;
        const properties = await Property.find({ agentId: agentId }); // Fetch properties added by the agent
        res.json(properties);
    }catch(err){
        res.status(500).json({ message: "Error fetching properties", error: err });

    }

}


getsingleprop = async (req, res) => {
    try {
        const { id } = req.params;
       
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log(" Invalid Property ID:", id);
            return res.status(400).json({ message: "Invalid Property ID" });
        }

        console.log(" Searching for property with _id:", id);
        const property = await Property.findById(id);

        if (!property) {
            console.log(" Property not found in database.");
            return res.status(404).json({ message: "Property not found" });
        }

        console.log(" Found property:", property);
        res.json(property);
    } catch (err) {
        console.error(" Error fetching property:", err);
        res.status(500).json({ message: "Error fetching property", error: err.message });
    }
};

const updateProperty = async (req, res) => {
    try {
        console.log("Updating Property ID:", req.params.id);
        console.log("Received Body:", req.body); 
        console.log("Received File:", req.file); 

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ msg: "No data received" });
        }

        const updatedData = { ...req.body };
        if (updatedData.Price) updatedData.Price = Number(updatedData.Price);

        if (req.file) {
            updatedData.Image = req.file.path;
            console.log("New Image Path:", req.file.path);
        }

        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true, runValidators: true }
        );

        if (!updatedProperty) {
            return res.status(404).json({ msg: "Property not found" });
        }

        console.log("Updated Property:", updatedProperty);
        res.json({ msg: "Property updated successfully", updatedProperty });

    } catch (err) {
        console.error("Error updating property:", err);
        res.status(500).json({ msg: "Failed to update", error: err.message });
    }
};

deleteProperty=async(req,res)=>{
    try{
        await Property.findByIdAndDelete(req.params.id)
        res.json({msg:"Property deleted successfully"})
    }catch(err){
        res.status(400).json({msg:"Failed to delete"})
        console.log(err);
        
    }
}

agentRegister=async(req,res)=>{
    try{
        const {Name,Email,Password,ph,address}=req.body
        console.log("dhyd",req.body);
        
        const exagent=await agents.findOne({Email})
        if(exagent){
            return res.status(400).json({ msg: "Email already registered" });
        }
        const hashedpass=await bcrypt.hash(Password,10)
        const agent=await new agents({Name,Email,Password:hashedpass,ph,address})
        await agent.save()
        res.status(200).json({msg:"Registration successfull! Waiting for admin Approval"})
    }catch(err){
        console.error("Error in agentRegister:", err);
        res.status(400).json({msg:"Registration failed"})
    }
}

    agentLogin=async(req,res)=>{
        try{
            const {Email,Password}=req.body
            const agent=await agents.findOne({Email})
            if(!agent){
                return res.status(400).json({msg:"agent not found"})
            }
            const isMatch=await  bcrypt.compare(Password,agent.Password)
            if(!isMatch) return res.status(400).json({msg:"invalid"})
                if (agent.Status !== "Approved") {
                    return res.status(400).json({ error: "Your account is pending approval." });
                  }
            const token=jwt.sign({id:agent._id,role:agent.role},"ansa@123",{expiresIn:"7d"})
            res.json({success:true,agent,token,agent:{id:agent._id,Name:agent.Name,role:agent.role}});

        }catch(err){
            res.status(500).json({ msg: "Login failed", error: err.message });
        }
    }

    getagent=async(req,res)=>{
        try{
            const reslt=await agents.find()
            console.log("jdjfhg",reslt);
            
            res.json(reslt)
        }catch(err){
            res.status(400).json({msg:"agents fetching error"})
        }
    }

    const getsingleagent = async (req, res) => {
        try {
          const agentId = req.agent.id; 
          const agentde = await agents.findById(agentId);
      
          if (!agentde) {
            return res.status(404).json({ msg: 'Agent not found' });
          }
      
          res.json(agentde);
        } catch (err) {
          console.error(err);
          res.status(500).json({ msg: 'Server error' });
        }
      };

    adminApprove=async(req,res)=>{
        try{
            const agent=await agents.findById(req.params.id)
            if(!agent) return res.status(400).json({msg:"user not found"})
                agent.Status="Approved"
            await agent.save()
            res.json({msg:"agent Approved"})
        }catch(err){
            res.status(400).json({msg:err.message})
        }
    }

    pendingapp= async (req, res) => {
        try {
          const agent = await agents.find({ Status: "Pending" });
          res.json(agent);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
      };
      rejectapp=async(req,res)=>{
        try{
            const agent=await agents.findById(req.params.id)
            if(!agent) return res.status(500).json({msg:"agent not found"})
                agent.Status="Rejected"
            await agent.save()
            res.status(200).json({msg:"Agent rejected"})
        }catch(err){
            res.status(500).json({error:err.message})
        }
      }


// const updateProperty = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedData = req.body;

//         // Check if ID is valid MongoDB ObjectId
//         if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//             return res.status(400).json({ msg: "Invalid property ID" });
//         }

//         if (req.file) {
//             updatedData.Image = req.file.path; // Update image if new one is uploaded
//         }

//         const updatedProperty = await Property.findByIdAndUpdate(id, updatedData, { new: true });

//         if (!updatedProperty) {
//             return res.status(404).json({ msg: "Property not found" });
//         }

//         res.json({ msg: "Property updated successfully", updatedProperty });
//     } catch (err) {
//         console.error("Update failed:", err);
//         res.status(500).json({ msg: "Failed to update property" });
//     }
// };

// const deleteProperty = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Validate MongoDB ObjectId
//         if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//             return res.status(400).json({ msg: "Invalid property ID" });
//         }

//         const deletedProperty = await Property.findByIdAndDelete(id);

//         if (!deletedProperty) {
//             return res.status(404).json({ msg: "Property not found" });
//         }

//         res.json({ msg: "Property deleted successfully" });
//     } catch (err) {
//         console.error("Delete failed:", err);
//         res.status(500).json({ msg: "Failed to delete property" });
//     }
// };




module.exports={addProperty,getProperty,uploads,updateProperty,deleteProperty,getsingleprop,agentRegister,agentLogin,adminApprove,
    rejectapp,pendingapp,getagent,getsingleagent,getAllProperty}