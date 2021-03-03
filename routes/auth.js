const express = require('express');
const Joi = require('joi')
const router = express.Router();
const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
//const config = require('config');
const { User } = require('../models/user')

router.post('/',async(req,res)=>{
    
    const {error} =  validateUser(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    let user = await User.findOne( { email : req.body.email } );
    if(!user)  return res.status(400).send('Invalid Email or Password');

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Invalid Email or Password');
    
    const token = user.generateAuthToken();
    res.send(token);

    // **Note with 'joi-password-complexity' you can enforce designed password 
});

function validateUser(req){

    const schema = {
        email : Joi.string().min(5).max(255).required().email(),
        password : Joi.string().min(5).max(1024).required()
    }

    return Joi.validate(req,schema)
}
module.exports = router ;