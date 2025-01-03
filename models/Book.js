const mongoose = require('mongoose');
const Joi = require('joi');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true, minlength: 3 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true },
    description: { type: String },
    price: { type: Number, required: true },
    language: { type: String, required: true },
}, {
    timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);

function validateBook(book) {
    const schema = Joi.object({
        title: Joi.string().min(3).required(),
        authorId: Joi.string().min(3).required()
    });
    return schema.validate(book);
}

module.exports = {
    Book,
    validateBook
};

