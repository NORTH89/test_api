const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { notFound, logger, errorHandler } = require('./middleware/errorHandler');
const authRouter = require('./routes/auth');
const registerRouter = require('./routes/auth');
const loginRouter = require('./routes/auth');
const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');
const usersRouter = require('./routes/users');
dotenv.config();

const app = express();


app.use(express.json());
app.use('/api/books', booksRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/auth', authRouter);
app.use('/api/register', registerRouter);
app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);

const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true, // Add this line to fix the deprecation warning
    useFindAndModify: false // Add this to prevent other deprecation warnings
})
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));


// Middleware for handling 404 errors
app.use(notFound);

// Middleware for logging errors
app.use(logger);

// Middleware for handling errors
app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}...`));