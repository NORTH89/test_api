const express = require('express');
const router = express.Router();
const { Author, validateAuthor } = require('../models/Author');
const verifyToken = require('../middleware/verifyToken');
// Get all authors
router.get('/', async (req, res, next) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (err) {
        next(err);
    }
});

// Get one author
router.get('/:id', async (req, res, next) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) return res.status(404).json('Author not found');
        res.status(200).json(author);
    } catch (err) {
        next(err);
    }
});

// Create an author
router.post('/', async (req, res, next) => {
    try {
        const { error } = validateAuthor(req.body);
        if (error) return res.status(400).json(error.details[0].message);

        let author = new Author({
            name: req.body.name,
            bio: req.body.bio
        });
        author = await author.save();
        res.status(201).json(author);
    } catch (err) {
        next(err);
    }
});

// Update an author
router.put('/:id', async (req, res, next) => {
    try {
        const { error } = validateAuthor(req.body);
        if (error) return res.status(400).json(error.details[0].message);

        const author = await Author.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            bio: req.body.bio
        }, { new: true });

        if (!author) return res.status(404).json('Author not found');
        res.status(200).json(author);
    } catch (err) {
        next(err);
    }
});

// Delete an author
router.delete('/:id', async (req, res, next) => {
    try {
        const author = await Author.findByIdAndRemove(req.params.id);
        if (!author) return res.status(404).json('Author not found');
        res.status(200).json(author);
    } catch (err) {
        next(err);
    }
});

module.exports = router;