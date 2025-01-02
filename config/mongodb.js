const mongoose = require('mongoose');

// Connect to MongoDB
function connectToMongoDB() {
    try {
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true, // Add this line to fix the deprecation warning
            useFindAndModify: false,
        });
        console.log('Connected to MongoDB...');
    } catch (err) {
        console.error('Could not connect to MongoDB...', err);
    }
}

module.exports = connectToMongoDB;


// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true, // Add this line to fix the deprecation warning
//     useFindAndModify: false,
// })
//     .then(() => console.log('Connected to MongoDB...'))
//     .catch(err => console.error('Could not connect to MongoDB...', err));
