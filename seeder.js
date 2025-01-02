const mongoose = require('mongoose');
const {Book} = require('./models/Book');
const books = require('./data');
require('dotenv').config();
const connectToMongoDB = require('./config/mongodb');

// Connect to MongoDB
connectToMongoDB();


// Import new books
const importNewBooks = async () => {
    try {
        console.log('Importing new books...');
        await Book.insertMany(books);
        console.log('Imported new books.');
    } catch (error) {
        console.error('Error importing new books:', error.message);
    }
};

const deleteExistingBooks = async () => {
    try {
        console.log('Deleting existing books...');
        await Book.deleteMany();
        console.log('Deleted existing books.');
    } catch (error) {
        console.error('Error deleting existing books:', error.message);
    }
};


// Run commands
if (process.argv[2] === '-import') {
    importNewBooks();
} else if (process.argv[2] === '-delete') {
    deleteExistingBooks();
} else {
    console.log('Please use -import or -delete');
    process.exit(1);
}