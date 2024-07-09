import express from 'express'
const app=express()
import mailing from './mail/mail.mjs'
import cors from 'cors'
const corsOptions = {
    origin: 'https://counsellor.social',
     methods: ['GET', 'POST'], // Allow only GET and POST requests
    allowedHeaders: ['Content-Type'], // Allow only headers with Content-Type
    optionsSuccessStatus: 200
  };
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get("/",(req,res)=>{res.send("This is Counsellor web personal use only..")})
app.post("/contactUs",(req,res)=>{
     let result=mailing(req.body.name,req.body.email,req.body.feedback)
     if(result){res.json({ok:true,text:"sended"})}
     else{res.json({ok:false,text:"Error"})} 
})
app.listen(5000,()=>console.log("app listen in 5000"))