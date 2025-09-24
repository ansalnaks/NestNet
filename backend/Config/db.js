const mongoose=require('mongoose')
const connectDb=()=>mongoose.connect('mongodb://127.0.0.1:27017/rlmgmt')
.then(()=>{
    console.log( "connected successfully")
   })
.catch((err)=>{
    console.log("connection failed");
    
})

module.exports=connectDb

//mongodb+srv://Ansalna:<Ansalna02*>@chatappcluster.vpfiq.mongodb.net/?retryWrites=true&w=majority&appName=chatappCluster