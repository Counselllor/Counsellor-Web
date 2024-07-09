import nodeMailer from 'nodemailer'
import dotenv from 'dotenv';
dotenv.config();
const mailing=async(name,userMail,message)=>{ 
let HTML=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title> 
</head>
<body> 
        <main style="width: 100%;min-height: 100vh;padding: 1rem;background-color: rgb(255 255 80 / 47%);position: relative;">
            <div style="margin: auto;width:90%;background-color: white;max-width: 800px;padding: 1.2rem;border-radius: 0.6rem; box-shadow: 0 1px 5px rgb(0,0,0);position: relative;justify-content: center;align-items: center;">
        <h1 style="margin-top: 2rem;font-family: monospace;">Thank You for Contacting Us!</h1>
        <p style="margin-top: 2rem; font-family: sans-serif;font-size: 1rem;"> 
        <span  style="margin-top: 2rem; font-family: sans-serif;font-size: 1rem;"><span style="font-weight:700;">Your Message:</span> ${message}</span><br><br>
            Thank you for reaching out to Counsellor-Web! Your message is important to us, and we are grateful for your interest. Our team is currently reviewing your inquiry and will respond to you as soon as possible.
            <br><br>
            In the meantime, feel free to explore more about Counsellor-Web on our website. You can browse through our latest articles, explore our featured Universities, or connect with us on social media for daily inspiration.
            <br><br>
            Your feedback is valuable to us as we strive to provide the best experience for our community of Education & communication. We look forward to connecting with you soon!
            <br><br>
            Thank you again for choosing Counsellor-Web. Stay Education is inspired!
            <br><br>
            Warm regards,<br>
            The Counsellor-Web Team<br><br>
            </p> 
            <p style="font-family: monospace;font-weight: 700;">Keep connected with our site <a href="https://counsellor.social/">https://counsellor.social/</a>...🚀 for updates and more Education Details!</p>
<br><br>
    <p style="font-family: monospace;text-align: center;">Happy Coding :)  Happy Journey :)</p>
        </div>
    </main>
</body>
</html>`
let mails=userMail
const sender=nodeMailer.createTransport({
    service:process.env.SERIVE,
    host:process.env.HOST,
    port:process.env.PORT,
    auth:{
        user:process.env.USER_MAIL_ADDRESSS,
        pass:process.env.PASS
    },
})
const html= HTML
const receiver={
    from:process.env.USER_MAIL_ADDRESSS,
    to:mails,
    subject:`Thank you for Contacting ${name}`,
    text:'Contact Us',
    html:html, 
} 
    try{
        await sender.sendMail(receiver)
        return true;
    }catch(err){
        return false;
    }  
}
export default mailing

 