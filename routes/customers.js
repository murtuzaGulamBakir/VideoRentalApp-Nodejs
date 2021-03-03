const express = require('express');
const router = express.Router();
//const app = express();
//const Joi = require('joi');
//const mongoose = require('mongoose');

const { Customer, validateCustomer } = require('../models/customer'); // object Destructure to reduce Length

router.get('/',async(req,res)=>{ // To get All customers
const customers =  await Customer.find();
res.send(customers);
});

router.post('/',async(req,res)=>{ // To add a new Customer
    const { error } = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
     result = await customer.save();
     res.send(result);
});

router.put('/:id',async(req,res)=>{
    const { error } = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const reqCustomer = await Customer.findByIdAndUpdate(req.params.id,{
        name : req.body.name,
        phone:req.body.phone,
        isGold: req.body.isGold
    }, {new :true } );

    if(!reqCustomer) return res.status(404).send('The Customer with Given Id was Not found');
    res.send(reqCustomer);
    console.log(reqCustomer);
});

router.get('/:id', async (req, res) => { // to get aparticular ID
    const customer = await Customer.findById(req.params.id);
  
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
    res.send(customer);
  });

router.delete('/:id',async(req,res)=>{
    // Where ID exist or NOT
    const reqCustomer = await Customer.findByIdAndRemove(req.params.id);
        // if not Throw 404
    if(!reqCustomer) return res.status(404).send("The Customer with the given id was not found")
        // Return Deleted Genre
    res.send(reqCustomer);

});

module.exports = router;






