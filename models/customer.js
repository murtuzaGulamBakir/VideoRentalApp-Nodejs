const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({  // Customer Schema
    name :{ type : String, required: true , min: 3 , max :10 },
    phone : {type : String, required: true, min : 3 ,max :10 },
    isGold: { type: Boolean, default : false }
});

const Customer = mongoose.model('Customer',customerSchema); // Model Customer Schema'

function validateCustomer(customer){
    const schema ={
        name : Joi.string().required().min(3).max(10),
        phone: Joi.string().required().min(3).max(10),
        isGold: Joi.boolean().required()
    } 

    return Joi.validate(customer,schema);
}
exports.Customer = Customer ;
exports.validateCustomer = validateCustomer ; // Exported for use in other module