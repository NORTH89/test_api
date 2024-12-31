const express = require('express');
const router = express.Router();
const { Author, validateAuthor } = require('../models/Author');
const {verifyAdmin} = require('../middleware/verifyToken');


// Get all authors
// Returns an array of authors
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

/**
 * Create an author
 * Only admin can create an author
 * We'll check for the admin token in the verifyAdmin middleware
 * We'll also validate the author input
 * If the input is valid, we'll create the author
 * If the input is invalid, we'll return a 400 status
 * If there's an error, we'll pass it to the error handler
 * @param {String} name - The author name
 * @param {String} bio - The author bio
 * @returns {Object} - The created author
 * @throws {Object} - The error object
 */
router.post('/', verifyAdmin, async (req, res, next) => {
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

/**
 * Update an author
 * Only admin can update an author
 * We'll check for the admin token in the verifyAdmin middleware
 * We'll also check if the author exists
 * If the author exists, we'll update the author
 * If the author doesn't exist, we'll return a 404 status
 * If there's an error, we'll pass it to the error handler
 * @param {String} id - The author ID
 * @returns {Object} - The updated author
 * @throws {Object} - The error object
 */
router.put('/:id',verifyAdmin, async (req, res, next) => {
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

/**
 * Delete an author
 * Only admin can delete an author
 * We'll check for the admin token in the verifyAdmin middleware
 * We'll also check if the author exists
 * If the author exists, we'll delete the author
 * If the author doesn't exist, we'll return a 404 status
 * If there's an error, we'll pass it to the error handler
 * @param {String} id - The author ID
 * @returns {Object} - The deleted author
 * @throws {Object} - The error object
 */
router.delete('/:id',verifyAdmin, async (req, res, next) => {
    try {
        const author = await Author.findByIdAndRemove(req.params.id);
        if (!author) return res.status(404).json('Author not found');
        res.status(200).json(author);
    } catch (err) {
        next(err);
    }
});

module.exports = router;