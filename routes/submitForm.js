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
        from: process.env.VITE_USER_MAIL,
        to: email, // Change this to business mail later
        subject: 'Form Submission ✔️',
        html: `
            <html>
            <head>
                <style>
                    table {
                        font-family: Arial, sans-serif;
                        border-collapse: collapse;
                        width: 100%;
                    }
    
                    th, td {
                        border: 1px solid #dddddd;
                        text-align: left;
                        padding: 8px;
                    }
    
                    th {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                <h2>Form Submission Details</h2>
                <table>
                    <tr>
                        <th>Type</th>
                        <td>${formValues.type}</td>
                    </tr>
                    <tr>
                        <th>First Name</th>
                        <td>${formValues.firstName}</td>
                    </tr>
                    <tr>
                        <th>Last Name</th>
                        <td>${formValues.lastName}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>${formValues.email}</td>
                    </tr>
                    <tr>
                        <th>OTP</th>
                        <td>${formValues.otp}</td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>${formValues.phone}</td>
                    </tr>
                    <tr>
                        <th>Message</th>
                        <td>${formValues.message}</td>
                    </tr>
                </table>
            </body>
            </html>
        `,
    };
    

      try {
        // Send email
        await transporter.sendMail(mailSubmitOptions);
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
