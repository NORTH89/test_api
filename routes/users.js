const router = require('express').Router();
const bcrypt = require('bcrypt');
const express = require('express');
const { User, validateUpdateUser } = require('../models/User');
const verifyToken = require('../middleware/verifyToken');

// Update user route with token verification
router.put('/:id', verifyToken, async (req, res) => {
    try {
        // Validate user input
        const { error } = validateUpdateUser(req.body);
        if (error) {
            return res.status(400).json({
                status: 'error',
                message: error.details[0].message
            });
        }

        // Check if user exists
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        // Check authorization
        if (req.user.id !== req.params.id && !req.user.isAdmin) {
            return res.status(403).json({
                status: 'error',
                message: 'Not authorized'
            });
        }

        // Hash password if provided
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        ).select('-password');

        res.status(200).json({
            status: 'success',
            data: updatedUser
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router;