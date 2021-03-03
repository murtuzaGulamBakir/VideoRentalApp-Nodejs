const mongoose = require('mongoose');
const winston = require('winston');

module.exports= function()
{
     mongoose.connect('mongodb://localhost/vidly')
    .then(()=>winston.info('Connected to MongoDB'));
    // catch removed as Rejection is handled by error Module
}