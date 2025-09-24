const messageSchema = require("../Model/messageModel")


const sendmessage=async(req,res)=>{
    try{
        const {message,sender,product,agentId}=req.body
        const newmessage=new messageSchema({message, sender,product,agentId})
        await newmessage.save()
        console.log("Received data in sendmessage:", req.body);
        res.status(200).json({msg:"message send "})
    }catch(err){
        res.status(400).json({msg:"err",err})
    }
}

const getmesssage = async (req, res) => {
    try {
      const { agentId } = req.query;
      const messages = await messageSchema
        .find({agentId})
        .populate('sender', 'name email ph address')
        .populate('product')
        console.log("Fetched messages:", JSON.stringify(messages, null, 2));
        
  
      if (messages.length === 0) {
        return res.status(200).json([]);
      }
  
      return res.status(200).json(messages)
    } catch (err) {
      console.error('Error fetching messages:', err);
      res.status(500).json({ msg: 'Internal Server Error', error: err.message });
    }
  };

module.exports={sendmessage,getmesssage}