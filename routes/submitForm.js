/* eslint-disable no-undef */
import { Router } from "express";
import nodemailer from 'nodemailer';

const router = Router();
// nodemailer setup
// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: 'Gmail',
  auth: {
    user: process.env.VITE_USER_MAIL,
    pass: process.env.VITE_USER_PASS
  },
});

const formCtrl = async (req, res) => {
  try{
    const { dropdown, firstName, lastName, email, otp, phone, message, genOtp } =await req.body;
    const otpString = otp.toString();
    const genOtpString = genOtp.toString();    
    console.log(otpString === genOtpString);
    
      if (otpString !== genOtpString) { 
        return res.status(400).json({ success: false, message: "Invalid OTP" });
      }
      
      const formValues = {
        type: dropdown,
        firstName: firstName,
        lastName: lastName,
        email: email,
        otp: otp,
        phone: phone,
        message: message,
      };
      const mailSubmitOptions = {
        from: process.env.VITE_USER_PASS,
        to: email,
        subject: 'Form Submission ✔️',
        text: JSON.stringify(formValues),
      };

      try {
        // Send email
        await transporter.sendMail(mailSubmitOptions);
        console.log('Form Email sent successfully!');
        return res.status(200).json({ success: true, message: 'Email sent successfully!' });
      } catch (error) {
        console.log('Error sending email:', error);
        return res.status(500).json({ success: false, error: error.message });
      }

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }

}

router.post("/submitForm", formCtrl);

export default router;
