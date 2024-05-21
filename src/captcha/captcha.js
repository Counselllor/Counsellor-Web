const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.post('/signup', async (req, res) => {
    const { email, password, recaptcha, userInfo } = req.body;
  
    // Verify CAPTCHA
    const secretKey = '6LdK7uIpAAAAAM81FkqBUpdFDs3GliYHBvacA1lc';
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptcha}`;
  
    try {
      const response = await axios.post(verificationUrl);
      const { success } = response.data;
  
      if (!success) {
        return res.status(400).json({ message: 'CAPTCHA verification failed' });
      }
  
      // CAPTCHA verified successfully, proceed with user registration
      // You can perform user registration logic here
  
      res.status(200).json({ message: 'User registered successfully', captchaVerified: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  