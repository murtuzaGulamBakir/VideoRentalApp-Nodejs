const express = require('express');
const router = express.Router();
//const app = express();
// const Joi = require('joi');
// const mongoose = require('mongoose');
const { Genre }= require('../models/genre') //object Destructure to reduce Length
const { Movie , validateMovie }= require('../models/movie') //object Destructure to reduce Length


router.get('/',async(req,res)=>
{ // To get all Movies
    const movies = await Movie.find(); 
    console.log('%j',movies);
    res.send(movies);
});

router.post('/',async(req,res)=>{  // to add new Movie

    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error.message);

    const reqGenre = await Genre.findById(req.body.genreId);
    if(!reqGenre) return res.status(400).send('Invalid Genre!!!')

    const movie = new Movie({
         title : req.body.title,
        
         genre : 
        {   _id: reqGenre._id,
            name : reqGenre.name
        },
        
        numberInStock : req.body.numberInStock,

        dailyRentalRate : req.body.dailyRentalRate
    }) ;
    const result = await movie.save();
    console.log('%j',result);
    res.send(result);
});

router.put('/:id',async(req,res)=>{
    const { error } = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const reqMovie = await Movie.findByIdAndUpdate(req.params.id,{
        title : req.body.title,
        numberInStock : req.body.numberInStock,
        dailyRentalRate : req.body.dailyRentalRate
    }, {new :true } );

    if(!reqMovie) return res.status(404).send('The Movie with Given Id was Not found');
    res.send(reqMovie);
    console.log('%j',reqMovie);
});

router.get('/:id', async (req, res) => { // to get aparticular ID
    const movie = await Movie.findById(req.params.id);
  
    if (!movie) return res.status(404).send('The Movie with the given ID was not found.');
    console.log('%j',movie);
    res.send(movie);
  });
 
router.delete('/:id',async(req,res)=>{
    // Where ID exist or NOT
    const reqMovie = await Movie.findByIdAndRemove(req.params.id);
        // if not Throw 404
    if(!reqMovie) return res.status(404).send("The Movie with the given Id was not found")
        // Return Deleted Movie
    res.send(reqMovie);
});  

module.exports = router ;