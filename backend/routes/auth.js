const express = require('express');
const router = express.Router();
const { register, login, uploadImages, logout } = require('../controllers/auth');
const { generateOTP, sendOTP, verifyOTP } = require('../services/otpService');
const upload = require('../middlewares/multer');


router.post('/register', register);
router.post('/login', login);
router.post('/send-otp', async (req, res) => {


    const { email } = req.body;
    console.log(email);
    
    if (!email) return res.status(400).json({ error: 'Email is required' });
  
    const otp = generateOTP(email);
    const isSent = await sendOTP(email, otp);

    if(isSent)
        return res.cookie("user", req.body, {httpOnly: true}).status(200).json({ message: 'OTP sent successfully' });
      else
       return res.status(500).json({message:"Failed to sent otp"})
})
router.post("/upload", upload.fields([
  { name: "profilePic", maxCount: 1 }, 
  { name: "coverPic", maxCount: 1 }
]), uploadImages);

router.get('/logout/:userId', logout);


module.exports = router;