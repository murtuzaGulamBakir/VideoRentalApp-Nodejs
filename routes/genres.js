const express= require('express');
const router = express.Router();// Genre route Handler created for export
const auth = require('../middleware/auth');
const admin = require('../middleware/admin')


//const Joi = require('joi'); // Validate Genre MODULE
// const mongoose = require('mongoose');
const { Genre , validateGenre }= require('../models/genre') //object Destructure to reduce Length
// const asyncMiddleware = require('../middleware/async');


router.get('/', async(req,res)=>{ // To get all Genres
   // route handler passed as reference
   //throw new Error('could not get list of genres..')
    const genres = await Genre.find(); 
    console.log(genres);
    res.send(genres);
});

router.get('/:id',  async(req,res)=>{ // To get Particular Genres
    const reqGenre = await Genre.findById(req.params.id); 
    if(!reqGenre) return res.status(404).send("The Genre with Given ID was Not Found");
    console.log(reqGenre);
    res.send(reqGenre);
});

router.post('/',auth, async(req,res)=>{  // to add new Genres

    const {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.message);

    const genre = new Genre({
        name : req.body.name
    }) ;
    const result = await genre.save();
    res.send(result);
}) ;

router.put('/:id',  async(req,res)=>{
    const {error} = validateGenre(req.body); //return if INVALID 'name' 400 BAD REQUEST
    if(error) return res.status(400).send(error.message);
    
    // if correct name then look for id to upadte
    let reqGenre = await Genre.findByIdAndUpdate(req.params.id,{
        name : req.body.name
    },{ new:true });

    // if ID not found throw : 404
    if(!reqGenre) return res.status(404).send("The Genre with the given id was not found")
   console.log(reqGenre);
    res.send(reqGenre) // Display Genre

});

router.delete('/:id',[auth,admin],  async(req,res)=>{
    // Where ID exist or NOT
    const reqGenre = await Genre.findByIdAndRemove(req.params.id);
        // if not Throw 404
    if(!reqGenre) return res.status(404).send("The Genre with the given id was not found")
        // Return Deleted Genre
    res.send(reqGenre);

})  ;

module.exports = router; // genre Route Handler exported