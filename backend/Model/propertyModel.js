const mongoose=require('mongoose')

const AddProperty=mongoose.Schema({
    Propertyname:{
        type:String,
        required:true
    },
    Location:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    PropertyType:{
        type:String,
        required:true
    },
    Image:{
      type: String,
      required:true
    } ,
    descri:{
        type:String,
        required:true
    },
     agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
})

const Property=mongoose.model("Propertylist",AddProperty)
module.exports=Property