/* eslint-disable no-undef */
import { Router } from "express";
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generate';

const router = Router();

const otpCtrl = async (req, res) => {
  
  try {
    const {email}  = await req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Please fill email' });
    }
    
    const otp = otpGenerator(6);    
    console.log(email,otp)
    // nodemailer setup
    const sendEmail = async (email, otp) => {
      // Create a Nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        service: 'Gmail',
        auth: {
          user: process.env.VITE_USER_MAIL,
          pass: process.env.VITE_USER_PASS
        },
      });
      
      const mailOptions = {
        from: process.env.VITE_USER_PASS,
        to: email,
        subject: 'BCC - OTP for Email Verification ✔️',
        text: `Your OTP is: ${otp}. Please use this code to verify your email.`,
      };
      
      try {
        // Send email
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        return res.status(200).json({ success: true, message: 'Email sent successfully!' });
      } catch (error) {
        console.log('Error sending email:', error);
        return res.status(500).json({ success: false, error: error.message });
      }
    }
    await sendEmail(email, otp);

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

router.post("/sendEmail", otpCtrl);

export default router;
