const mongoose = require('mongoose');
//const Joi =  require('joi');
const express = require('express');
const router  = express.Router();
const Fawn = require('fawn');

const {Customer}= require('../models/customer');
const {Movie} = require('../models/movie');
const { Rental,validateRental} = require('../models/rental');

Fawn.init(mongoose);// Initializing 'fawn'
    
router.get('/',async(req,res)=>{
    const rentals = await Rental.find();
    console.log('%j',rentals);
    res.send(rentals);
});

router.post('/',async(req,res)=>{
    const  {error} =  validateRental(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    // if(!mongoose.Types.ObjectId.isValid(req.body.customerId)) // validate customer ID
    // return res.status(400).send('Invalid Customer!!!');
    
    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(404).send('Invalid Customer!!!');

    let movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(400).send('Invalid Movie!!!');

    if(movie.numberInStock === 0) return res.status(400).send('Movie not in stock!!!');

    let rental = new Rental({
        customer : 
        {
            _id : customer._id,
            name : customer.name,
            phone : customer.phone, 
            isGold: customer.isGold
        },
        movie:
        {   _id: movie._id,
            title : movie.title,
            dailyRentalRate : movie.dailyRentalRate
        }
    });

    // rental = await rental.save();
    // movie.numberInStock--;
    // await movie.save();
    // res.send(rental);
    // console.log('%j',rental);
    

    try {
        new Fawn.Task()
          .save('rentals', rental)
          .update('movies', { _id: movie._id }, { 
            $inc: { numberInStock: -1 }
          })
          .run();
      
        res.send(rental);
        console.log('%j',rental);
      }
      catch(ex) {
        res.status(500).send('Something failed.');
      }
    
    
});

router.get('/:id', async (req, res) => {
    
    const rental = await Rental.findById(req.params.id);
  
    if (!rental) return res.status(404).send('The rental with the given ID was not found.');
  
    res.send(rental);
  });

 
module.exports = router; 