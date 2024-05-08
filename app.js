// Importing necessary modules
const express = require('express'); // Importing Express framework
const path = require("path"); // Importing path module to handle file paths
const mongoose = require('mongoose')
const Campground = require('./models/campground')

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    // useNewUrlParser: true,
    // createIndexes: true,
    // useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// Creating an Express application instance
const app = express(); // Creating an Express application

// Setting view engine to EJS and specifying views directory
app.set('view engine', 'ejs'); // Setting the view engine to EJS
app.set('views', path.join(__dirname, 'views')); // Specifying the directory for views

//------------------------SAMPLE PAGE-----------------------
// Handling GET request to the root URL
app.get('/', (req, res) => {
    // Rendering the "home" view
    res.render("home");
});

//------------------------listen to port-----------------------
// Listening on port 3000 for incoming requests
app.listen(3000, () => {
    console.log('Server is running on PORT 3000'); // Logging that the server is running
});