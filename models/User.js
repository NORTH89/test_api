const mongoose = require('mongoose');
const Joi = require('joi');


//Create a schema for the user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 6,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 1024
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


//function to validate user
function validateLoginUser(user) {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(user);
}

function validateRegisterUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(user);
}

function validateUpdateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3),
        email: Joi.string().min(6).email(),
        password: Joi.string().min(6),
    });
    return schema.validate(user);
}

module.exports = {
    User: mongoose.model('User', userSchema),
    validateLoginUser,
    validateRegisterUser,
    validateUpdateUser
};
