const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema } = require('./genre') //object Destructure to reduce Length

const movieSchema = new mongoose.Schema({
    title : 
    {
        type: String,
        required: true,
        min:3,
        max:50
    },
    genre : {   
                type : genreSchema,
                required:true 
            },
    
    numberInStock : 
    {
        type : Number,
        required:true,
        min: 0,
        max:50
    }  ,
    
    dailyRentalRate :  
    {
        type :Number,
        required:true,
        min: 0,
        max:50
    }    

});

const Movie =  mongoose.model('Movie',movieSchema);

function validateMovie(movie)
{
    const schema =
    {
        title : Joi.string().min(3).required(),
        genreId: Joi.string().required(),
          //genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    }

    return Joi.validate(movie,schema);
}

exports.Movie = Movie ;
exports.validateMovie = validateMovie;