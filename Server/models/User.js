const mongoose =require("mongoose")

const userSchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    // sc:{
    //     type:String,
    //     required:true
    // },
    gender:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    age:{
        type: Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
        
    }
})

mongoose.model("User",userSchema)
