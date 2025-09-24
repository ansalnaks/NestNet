const mongoose=require('mongoose')

const registerSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    ph:{
        type:Number,
        required:true
    },
    
    password:{
        type:String,
        required:true
    },
    confirmpass:{
        type:String
    }

})

const register=mongoose.model("Registration",registerSchema)
module.exports=register