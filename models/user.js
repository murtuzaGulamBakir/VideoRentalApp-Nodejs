const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name :  {   type : String,
                required : true,
                minlength:5,
                maxlength: 50
            },
    
    email : { type : String,
              unique: true,
              required:true,
              minlength:5,
              max: 255
            },
    
    password :  { type : String,
                 required: true,
                 minlength:5,
                 maxlength:1024
                },
    isAdmin : Boolean                   
});

userSchema.methods.generateAuthToken = function(){
    return jwt.sign( { _id : this._id , isAdmin : this.isAdmin } ,config.get('jwtPrivateKey'));
}

const User = mongoose.model('User',userSchema);

function validateUser(user){
    const schema =  {
        name : Joi.string().min(5).required(),
        email : Joi.string().min(5).max(255).required().email(),
        password : Joi.string().min(5).max(1024).required(),
    }

    return Joi.validate(user,schema);
}
 module.exports.User = User;
 module.exports.validateUser = validateUser;