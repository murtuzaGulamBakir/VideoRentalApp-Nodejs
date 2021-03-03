const express = require('express');
const router = express.Router();
//const config = require('config');
//const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash'); // To pick particular properties from an object
const { validateUser, User } = require('../models/user');
const auth = require('../middleware/auth');

router.get('/me', auth ,async(req,res)=>{
    const user = await User.findById(req.hell._id).select('-password');//password Excluded
    res.send(user);
})

router.post('/',async(req,res)=>{
    const {error} =  validateUser(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    let user = await User.findOne( { email : req.body.email } );
    if(user)  return res.status(400).send('User Already Exist')

    //  user = new User({           // Old way
    //     name : req.body.name,
    //     email : req.body.email,
    //     password : req.body.password
    // }) ;
    
    // Pick method return object , so put in new User()
    user = new User(_.pick(req.body,['name','email','password'])) ;
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password,salt)
    user = await user.save();

    // **Note with 'joi-password-complexity' you can enforce designed password 
    
    //token generating
    const token = user.generateAuthToken();

    user  = _.pick(user,['_id', 'name' ,'email']) // returns an object with definbed properties
    
    res.header('x-auth-token',token).send(user); // send on email,id ,name and No password 
  
});

module.exports = router ;