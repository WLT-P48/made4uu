const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

// Your actual Google Client ID
const CLIENT_ID = "198473426738-d0o59tf5mr4q7jpl4lgae0qh13mi7ilh.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

// --- REGISTER ROUTE ---
router.post('/register', async (req, res) => {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).json({ message: 'Email already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.name, // <--- UPDATED HERE!
        email: req.body.email,
        password: hashedPassword,
        role: 'Customer' 
    });

    try {
        await user.save();
        res.status(201).json({ message: 'User Created' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// --- LOGIN ROUTE ---
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: 'Email not found' });

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({ message: 'Invalid password' });

    // FIXED: Using your .env secret instead of placeholder text
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, role: user.role, message: 'Logged In' });
});

// --- GOOGLE OAUTH ROUTE ---
router.post('/google-login', async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID 
        });
        const { email, name } = ticket.getPayload();

        let user = await User.findOne({ email });
        if (!user) {
            user = new User({
                username: name,
                email: email,
                password: await bcrypt.hash(Math.random().toString(36), 10), 
                role: 'Customer'
            });
            await user.save();
        }

        const sessionToken = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
        res.json({ token: sessionToken, role: user.role });
    } catch (err) {
        console.error("Google Auth Error:", err.message); 
        res.status(400).json({ message: "Google Auth Failed" });
    }
});

module.exports = router;