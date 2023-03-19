const express = require('express')
const app=express()
const mongoose =require('mongoose')
const PORT =4000
const {MONGOURI}=require("./Key")

require('./models/User')

app.use(express.json())
app.use(require('./routes/Auth'))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4000');
    next();
  });
// app.use(cors({
//     origin:"http://localhost:4000"
// }))

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo")
})
mongoose.connection.on('error',(err)=>{
    console.log("error connecting",err)
})


app.listen(PORT,()=>{
    console.log("Server is running on",PORT);
})