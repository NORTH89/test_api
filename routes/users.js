const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, validateUpdateUser } = require('../models/User');
const { verifyToken, authorization, verifyAdmin } = require('../middleware/verifyToken');

// Update user route with token verification
router.put('/:id', authorization, async (req, res) => {
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

// Get all users
router.get('/', verifyAdmin, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({
            status: 'success',
            data: users
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Get a single user by ID
router.get('/:id', authorization, async (req, res) => {
    try {
        // Check if user exists
        const user = await User.findById(req.params.id).select('-password');
        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    }
});

// Delete user by ID with both admin and authorization checks
router.delete('/:id', [verifyToken, authorization, verifyAdmin], async (req, res) => {
    try {
        // Check if user exists
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }

        // Check if user is trying to delete their own account or is admin
        if (req.user.id === req.params.id || req.user.isAdmin) {
            await User.deleteOne({ _id: req.params.id });
            return res.status(200).json({
                status: 'success',
                message: 'User deleted successfully'
            });
        }

        return res.status(403).json({
            status: 'error',
            message: 'Not authorized to delete this user'
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router;