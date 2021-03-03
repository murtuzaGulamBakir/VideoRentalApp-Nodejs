const winston = require('winston')
require('winston-mongodb') // logging to mongodb
require('express-async-errors'); // load at app starts itself//puts routes in function

module.exports= function()
{

process.on('uncaughtException',(ex)=>{ 
    console.log('WE GOT AN UNCAUGHT EXCEPTION');
    winston.error(ex.message,ex);
    process.exit(1)
});

// winston.handleExceptions(  // uncaugtExceptions Handled
//     new winston.transports.File({ filename: 'uncaughtExceptions.log'})
// );

process.on('unhandledRejection',(ex)=>{
   // throw ex;  //handled by winston.handleExceptions
    console.log('WE GOT AN UNHANDLED REJECTION');
    winston.error(ex.message,ex);
    process.exit(1)
});

//throw new Error('Something Failed During Startup'); // UNCAUGHT EXCEPTION
// const p = Promise.reject(new Error('Something Failed Miserably..')); //unhandledRejection
// p.then(()=> console.log("Done"));

winston.add(winston.transports.File, { filename : 'logfile.log'} );
winston.add(winston.transports.MongoDB,{ 
    db:'mongodb://localhost/vidly',
    level:'error'  //level of logging
});

}