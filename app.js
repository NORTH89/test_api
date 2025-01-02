const express = require('express');
const dotenv = require('dotenv');
const { notFound, logger, errorHandler } = require('./middleware/errorHandler');
const connectToMongoDB = require('./config/mongodb');

dotenv.config();

const app = express();


app.use(express.json());
app.use('/api/books', require('./routes/books'));
app.use('/api/authors', require('./routes/authors'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/register', require('./routes/auth'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));

// Set the port number
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectToMongoDB();

// Middleware for handling 404 errors
app.use(notFound);

// Middleware for logging errors
app.use(logger);

// Middleware for handling errors
app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}...`));