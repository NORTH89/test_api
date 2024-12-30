const express = require('express');
const router = express.Router();
const { Book, validateBook } = require('../models/Book');
const verifyToken = require('../middleware/verifyToken');
// Get all books
router.get('/', async (req, res, next) => {
    try {
        const books = await Book.find().populate('author', 'name -_id');
        res.status(200).json(books);
    } catch (err) {
        next(err);
    }
});

// Get one book
router.get('/:id', async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json('Book not found');
        res.status(200).json(book);
    } catch (err) {
        next(err);
    }
});

// Create a book
router.post('/', async (req, res, next) => {
    try {
        const { error } = validateBook(req.body);
        if (error) return res.status(400).json(error.details[0].message);

        let book = new Book({
            title: req.body.title,
            author: req.body.author  // Now accepts string instead of ObjectId
        });

        book = await book.save();
        res.status(201).json(book);
    } catch (err) {
        next(err);
    }
});

// Update a book
router.put('/:id', async (req, res, next) => {
    try {
        const { error } = validateBook(req.body);
        if (error) return res.status(400).json(error.details[0].message);

        const book = await Book.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            author: req.body.author
        }, { new: true });

        if (!book) return res.status(404).json('Book not found');
        res.status(200).json(book);
    } catch (err) {
        next(err);
    }
});

// Delete a book
router.delete('/:id', async (req, res, next) => {
    try {
        const book = await Book.findByIdAndRemove(req.params.id);
        if (!book) return res.status(404).json('Book not found');
        res.status(200).json(book);
    } catch (err) {
        next(err);
    }
});

module.exports = router;