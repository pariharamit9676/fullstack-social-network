const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateOTP, sendOTP, verifyOTP } = require('../services/otpService');

async function register(req, res) {
      const { username, name, email, password , otp } = req.body;
        if (!email || !otp) return res.status(400).json({ error: 'Email and OTP are required' });
        
        
        const isVerified = verifyOTP(email, otp);
        if (!isVerified) return res.status(400).json({ error: 'Invalid OTP' });
        if (isVerified === 'expired') return res.status(400).json({ error: 'OTP expired' });

    try {

        // **1️ Validate Input**
        if (!username || !name || !email || !password) {
            return res.status(400).json({ error: 'Please fill all the fields' });
        }

        // **2️ Check if user already exists**
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUser) {  
            return res.status(400).json({ error: 'User already exists' });
        }

        // **3️ Hash the password before storing it**
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (hashError) {
            console.error("Password hashing failed:", hashError.message);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // **4️ Insert user data securely**
        const [result] = await db.query(
            "INSERT INTO users (username, name, email, password) VALUES (?, ?, ?, ?)",
            [username, name, email, hashedPassword]
        );

            
        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            user: { id: result.insertId, username, name, email }
        });

    } catch (error) {
        console.error('Database error:', error.message);  // Safe logging
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function login (req, res) {

    let email = req.body.email;
    let pass = req.body.password;
    
    if(!email || !pass){
        return res.status(400).json({error: 'Please fill all the fields'});
    }
    try {
        const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if(!user || user.length <= 0){
            return res.status(400).json({error: 'User not found'});
        }

        const isPasswordValid = await bcrypt.compare(pass, user[0].password);
        
        if(!isPasswordValid){
            return res.status(400).json({error: 'Invalid password'});
        }

        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        let { password, ...others } = user[0];


        return res.cookie("accessToken", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            secure: process.env.NODE_ENV === 'production', // send only over HTTPS in production
            sameSite: "strict", // prevent CSRF
        }).status(200).json({
            success: true,
            message: 'User logged in successfully',
            userInfo: others
        });
        


    } catch (error) {
        console.error('Database error:', error.message);  // Safe logging
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function uploadImages(req, res) {
    console.log("Files:", req.files);
    
    const files = req.files; // Multiple files
    const { email } = req.body; // Check which files are uploaded // Authenticated user ID

    if (!email) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!files || Object.keys(files).length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
    }

    let updates = {}; // Object to store update values

    if (files.profilePic) {
        updates.profilePic = files.profilePic[0].filename; // Profile pic URL
    }

    if (files.coverPic) {
        updates.coverPic = files.coverPic[0].filename; // Cover pic URL
    }

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: 'Invalid upload request' });
    }

    try {
        const query = `UPDATE users SET ${Object.keys(updates).map(col => `${col} = ?`).join(', ')} WHERE email = ?`;
        const values = [...Object.values(updates), email];

        await db.query(query, values);

        return res.status(200).json({
            success: true,
            message: 'Image(s) updated successfully',
            updates
        });
    } catch (error) {
        console.error('Database error:', error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function logout(req, res) {

    const userId = req.params.userId; // Clear user ID from request
    try {
        console.log("Logout");

        const q = "UPDATE users SET lastSeen = NOW() WHERE id = ?";
        await db.query(q, [userId]);
        return res.clearCookie("accessToken", {
                httpOnly: true, 
            }).status(200).json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}


module.exports = { register, login, uploadImages, logout };
