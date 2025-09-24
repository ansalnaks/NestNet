const mongoose=require('mongoose')
const email=mongoose.Schema({
    email:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})
const emailSchema=mongoose.model('email',email)
module.exports=emailSchema