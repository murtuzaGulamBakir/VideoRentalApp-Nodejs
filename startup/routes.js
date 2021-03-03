const express = require('express');
const genres = require('../routes/genres');//Load genres Module
const customers = require('../routes/customers'); //Customers Module
const movies = require('../routes/movies'); //Movies Module
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports= function(app)
{
    app.use(express.json()); // body parser
    app.use('/api/genres',genres); // use 'genres Router for requests like"/api/genres" '
    app.use('/api/customers',customers); //use 'customer Router for requests like"/api/customers"
    app.use('/api/movies',movies); //use 'movie Router for requests like"/api/movies" 
    app.use('/api/rentals',rentals); 
    app.use('/api/users',users); 
    app.use('/api/auth',auth); 
    app.use(error);// for logging errors

}