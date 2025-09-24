const registeruser=require('../Model/registerModel')
const Email=require('../Model/emailModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const secretkey='ansa@123'

const addregister=async(req,res)=>{
    try{
        const {name,email,address,ph,password,confirmpass}=req.body
        if(!name||!email||!address||!ph||!password||!confirmpass){
            return res.status(400).json({msg:"all fields are required"})
        }
        if(password!==confirmpass){
            return res.status(400).json({msg:"passwords are incorrect"})
        }
        const userExist=await registeruser.findOne({email})
        if(userExist){
            return res.status(400).send("user already exist")
        }
        const hashedpass=await bcrypt.hash(password,10)
        const ru= new registeruser({name,email,address,ph,password:hashedpass})
        await ru.save()
        console.log(ru);
        
        return res.status(200).send("registration successfully")
    }catch(err){
        res.status(400).json({msg:"error in register"})
    }
}

const getudetails=async(req,res)=>{
    try{
        const users=await registeruser.find()
        res.status(200).json(users)
    }catch(err){
        res.status(400).json({msg:"Error in fetching user details"})
    }
}
const getuserdetails=async(req,res)=>{
    try{
        const userId=req.user.id
        const udetails=await registeruser.findById(userId)
        if(!udetails){
            return res.status(404).json({ msg: "User not found" })
        }
        res.status(200).json(udetails)
    }catch(err){
        res.status(400).json({msg:"user details fetching err"})
    }
}

const login=async(req,res)=>{
    try{
        const user= await registeruser.findOne({email:req.body.email})
        if(user){
            const cmppass=await bcrypt.compare(req.body.password,user.password)
            if(cmppass){
                // const authtoken=jwt.sign({email:user.email},secretkey,{expiresIn:'5d'})
                const authtoken = jwt.sign({ id: user._id, email: user.email }, secretkey, { expiresIn: '5d' });

                res.json({success:true,authtoken,user,userId:user._id})
                console.log(authtoken); 
            }else{
                res.status(400).send("invalid password!")
            }
        }
        else{
            res.status(400).send("user not exists!")
        }
    }
    catch(err){
        res.status(400).json({msg:"error in login"})
    }
}


const subscribe = async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ msg: "Email required" });
      }
      const emailExist = await Email.findOne({ email });
      if (emailExist) {
        return res.status(400).json({ msg: "Email already subscribed" });
      }
  
      const newEmail = new Email({ email });
      await newEmail.save();
  
      res.status(200).json({ msg: "Subscription successful" });
    } catch (err) {
      console.error("Subscription Error:", err);
      res.status(500).json({ msg: "Subscription failed" });
    }
  };
  

const getemail=async(req,res)=>{
    try{
        const emails=await Email.find()
        res.status(200).json(emails);
    }catch(err){
        res.status(400).json({msg:"email not get"})
    }
}
// const getdata = async (req, res) => {
//     try {
//       const userId = req.user.id;
//       const userdata = await registeruser.findById(userId); 
  
//       if (!userdata) {
//         return res.status(404).json({ msg: "User not found" });
//       }
  
//       res.json(userdata);
//     } catch (err) {
//       console.error("Error fetching user details:", err);
//       res.status(500).json({ msg: "Error in fetching user details" });
//     }
//   };
  

module.exports={addregister,login,subscribe,getemail,getuserdetails,getudetails}