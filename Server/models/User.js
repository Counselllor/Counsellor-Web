const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetToken:String,
    expireToken:Date,
    pic:{
     type:String,
     default:"http://res.cloudinary.com/dcyysbj41/image/upload/v1666777119/n5tnxchnqaynj25wrb7n.jpg"
    }
    
})

mongoose.model("User",userSchema)
