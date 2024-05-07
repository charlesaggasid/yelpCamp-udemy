const express = require('express');
const e = require("express");

const app = express();

app.get('/', (req, res) => {
    res.send('Hello from YelpCamp');
})




//------------------------listen to port-----------------------
app.listen(3000, () => {
    console.log('PORT 3000')
})