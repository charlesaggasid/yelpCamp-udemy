const express = require('express');
const e = require("express");
const path = require("path");










const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

//------------------------SAMPLE PAGE-----------------------
app.get('/', (req, res) => {
    // res.send('HELLO FROM YELPCAMP')
    res.render("home");
})




//------------------------listen to port-----------------------
app.listen(3000, () => {
    console.log('PORT 3000')
})