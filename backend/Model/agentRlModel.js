const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const agentSchema=new mongoose.Schema({
    Name:{
    type:String,
    required:true
},
Email:{
    type:String,
    required:true
},
Password:{
    type:String,
    required:true
},
ph:{
    type:Number,
    required:true
},
address:{
    type:String,
    required:true
},
role: {
    type: String,
    default: "agent",
    enum: ["agent", "Admin"]
  },
Status:{
    type:String,
    default:"Pending",
    enum:["Pending","Approved","Rejected"]
}
})
// agentSchema.pre("save",async function(next){
//     if (this.isModified("Password")) {
//       this.password = await bcrypt.hash(this.Password, 10);
//     }
//     next();
//   })

const agents=mongoose.model("AgentlogReg",agentSchema)
module.exports=agents