const Joi = require('joi'); // Validate Genre MODULE
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name : 
    {
        type:String,
        required: true,
        min:3,
        max:255
    }
});

const Genre = mongoose.model('Genre',genreSchema);

function validateGenre(genre){
    const schema ={
        name : Joi.string().min(3).required()  // scheme to validate
    };
    return Joi.validate(genre,schema); //validating genre with schema
    
}
 exports.Genre = Genre;
 exports.validateGenre = validateGenre; // exported 
 exports.genreSchema = genreSchema; //exported for use in movies movies schema