// Importing necessary modules
const express = require('express'); // Importing Express framework
const path = require("path"); // Importing path module to handle file paths
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
// const { campgroundSchema } = require('./schemas.js');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override'); //important for EDIT
const Campground = require('./models/campground')


mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// Creating an Express application instance
const app = express(); // Creating an Express application

// Setting view engine to EJS and specifying views directory
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs'); // Setting the view engine to EJS
app.set('views', path.join(__dirname, 'views')); // Specifying the directory for views

app.use(express.urlencoded({extended: true})) //Parsing the body after new post is created
app.use(methodOverride('_method')) //IMPORTANT FOR EDITS

//------------------------SAMPLE PAGE-----------------------
// Handling GET request to the root URL
app.get('/', (req, res) => {
    // Rendering the "home" view
    res.render("home");
});

//------------------------CAMPGROUND INDEX PAGE-----------------------
app.get('/campgrounds', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds})
}))

//-------Order matters. No async/await for  CREATE A NEW CAMPGROUND-----------------------
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})
//Need post request
app.post('/campgrounds', catchAsync(async (req, res, next) => {
        const campground = new Campground (req.body.campground)
        await campground.save()
        res.redirect(`/campgrounds/${campground._id}`)
}))


//------------------------SHOW 1 CAMP-----------------------
// Somehow this code stay below, since we're looking for an ID. A post needs to be created first for we can look for the ID.
app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const {id} = req.params
    const campground = await Campground.findById(id)
    console.log(campground)
    res.render('campgrounds/show', {campground})
}))


//------------------------EDIT CAMPGROUND-----------------------
//Need to do methodOverride for PUT, see code app.use(methodOverride('_method')) //IMPORTANT FOR EDITS
app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground });
}))

app.put('/campgrounds/:id', catchAsync(async (req, res) => {
    // res.send("IT WORKED") try use this first before coding anything else.
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`)
}));

//------------------------DELETE CAMPGROUND-----------------------
app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const {id} = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
}));

app.use((err, req, res, next) => {
    res.send ('oh boy')
})



//------------------------listen to port-----------------------
// Listening on port 3000 for incoming requests
app.listen(3000, () => {
    console.log('Server is running on PORT 3000'); // Logging that the server is running
});