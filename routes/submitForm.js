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
                body {
                    font-family: Arial, sans-serif;
                    color: #333;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
        
                .container {
                    max-width: 600px;
                    margin: 30px auto;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
        
                h2 {
                    color: #4CAF50;
                    text-align: center;
                }
        
                p {
                    font-size: 1rem;
                    line-height: 1.6;
                }
        
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                }
        
                th, td {
                    padding: 12px;
                    border-bottom: 1px solid #ddd;
                    text-align: left;
                }
        
                th {
                    background-color: #f2f2f2;
                    color: #555;
                }
        
                .footer {
                    text-align: center;
                    margin-top: 20px;
                    font-size: 0.9rem;
                    color: #777;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>Form Submission Details</h2>
                <p>Please find the details of your form submission below:</p>
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
                        <th>Phone</th>
                        <td>${formValues.phone}</td>
                    </tr>
                    <tr>
                        <th>Message</th>
                        <td>${formValues.message}</td>
                    </tr>
                </table>
                <p>Thank you for reaching out to us. We have received your message and will get back to you shortly.</p>
                <p>Regards,<br/>
                Brittston Consulting Company Pvt. Ltd.</p>
                </div>
            </div>
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
