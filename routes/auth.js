const express = require('express');
const router = express.Router();
const { User, validateRegisterUser, validateLoginUser } = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../config/jwt');
const { set } = require('mongoose');
const verifyToken = require('../middleware/verifyToken');
const SALT_ROUNDS = 10;


// login a user

router.post('/login', async (req, res, next) => {
    try {
        // Validate input data التحقق من صحة البيانات المدخلة
        const { error } = validateLoginUser(req.body);
        if (error) return res.status(400).json({
            status: 'error',
            message: error.details[0].message
        });

        // Check user existence شيك على وجود المستخدم
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json({
            status: 'error',
            message: 'Invalid email or password'
        });

        // Verify password تحقق من كلمة المرور
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).json({
            status: 'error',
            message: 'Invalid email or password'
        });

        // Generate JWT توليد JWT
        const token = generateToken(user);

        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            },
        });

    } catch (err) {
        next(err);
    }
});



// Register a new user
router.post('/register', async (req, res, next) => {
    try {
        // Validate input data التحقق من صحة البيانات المدخلة
        const { error } = validateRegisterUser(req.body);
        if (error) return res.status(400).json({
            status: 'error',
            message: error.details[0].message
        });

        // Check user existence شيك على وجود المستخدم
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json({
            status: 'error',
            message: 'User already registered',
            email: req.body.email,
            details: 'An account with this email address already exists'
        });

        // Hash password حفظ كلمة المرور المشفرة
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: req.body.isAdmin || false
        });

        await user.save();

        // Send response ارسل الرد
        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            },
            token: generateToken(user)
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;