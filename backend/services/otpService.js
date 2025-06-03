const nodemailer = require('nodemailer');

let otpStore = {};

exports.generateOTP = (email) => {

    const otp = Math.floor(100000 + Math.random() * 900000);
    
    otpStore[email] = { otp:otp.toString(), expiresAt: Date.now() + 5 * 60 * 1000 }; // Expires in 5 mins
    console.log(otpStore);
    return otp;
  };

exports.sendOTP = async (email, otp) => {

    const transporter = nodemailer.createTransport({
     host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      socketTimeout: 10000, // 10 seconds timeout
      connectionTimeout: 10000 // 10 seconds timeout
});

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'OTP for Your Account Verification',
    html: `<p>This is a one-time password (OTP) to verify your account. It will expire in 5 minutes. Your OTP is <strong>${otp}</strong>.</p>`
};

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error)
    return false
  }

 return true;
 
};

exports.verifyOTP = (email, enteredOTP) => {
    const data = otpStore[email];
    if (!data) return false;
    if (data.expiresAt < Date.now()) return 'expired';
    if (data.otp !== enteredOTP) return false;
  
    delete otpStore[email]; 
    return true;
};