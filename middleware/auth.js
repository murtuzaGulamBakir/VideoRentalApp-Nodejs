const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function auth (req,res,next)
{   token = req.header('x-auth-token');
    if(!token) return res.status(401).send("Access Denied...No token Provided!!!!")

    try {
        const decoded_token = jwt.verify(token,config.get('jwtPrivateKey'));
        req.hell= decoded_token;
        next()// passing control to next middleWare
        }
    catch(ex)
    {
        res.status(400).send("Invalid Token...")
    }    
 
}
// module.exports.auth = auth ;  