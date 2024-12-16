const mongoose = require("mongoose");
const express = require("express");
const addMovie = require("./controllers/add_movie");
require("dotenv").config();

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));

const app = express();
const port = 3000;

app.use(express.json());

app.post("/movies", addMovie);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
