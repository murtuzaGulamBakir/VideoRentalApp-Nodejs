const winston = require('winston');

module.exports= function(err,req,res,next)
{   // this module catches errors in Request processing Pipeline Only
    winston.error(err.message,err);

    res.status(500).send("something failed..");
}