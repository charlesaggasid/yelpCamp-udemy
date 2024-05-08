// Importing the mongoose module
const mongoose = require('mongoose');

// Getting the Schema object from mongoose
const Schema = mongoose.Schema;

// Defining the CampgroundSchema using the Schema object
const CampgroundSchema = new Schema({
    // Field for storing the title of the campground
    title: String,
    // Field for storing the price of the campground
    price: String,
    // Field for storing the description of the campground
    description: String,
    // Field for storing the location of the campground
    location: String
});

// Exporting the Campground model with the defined schema
module.exports = mongoose.model('Campground', CampgroundSchema);
