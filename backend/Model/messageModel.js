const mongoose = require('mongoose')
const Registration=require('./registerModel')
const Propertylist=require('./propertyModel')
const message = mongoose.Schema({
    message: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Registration,
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Propertylist,
        required:true
    },
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
     
})
const messageSchema = mongoose.model("usermessage", message)
module.exports = messageSchema