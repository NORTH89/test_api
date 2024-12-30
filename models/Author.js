const mongoose = require('mongoose');
const Joi = require('joi');

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    bio: { type: String, required: true, minlength: 10 },
}, {
    timestamps: true
});


const Author = mongoose.model('Author', authorSchema);

function validateAuthor(author) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        bio: Joi.string().min(10).required()
    });
    return schema.validate(author);
}

module.exports = {
    Author,
    validateAuthor
};
