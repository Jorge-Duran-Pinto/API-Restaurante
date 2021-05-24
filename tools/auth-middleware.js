const jwt = require('jsonwebtoken');

const authorizationToken= (req, res, next) => {
    if(req.path == '/auth/register' || req.path == '/auth/login'){
        return next();
    }
    const bearerHeader = req.headers['authorization'];
    var bearerToken = '';
    if(typeof bearerHeader !== 'undefined'){
    bearerToken = bearerHeader.split(" ")[1];
    console.log(bearerToken);
    }else{
        throw new Exception({errCode: 401, errMessage: 'missing data'});
    }
    jwt.verify(bearerToken, 'restaurante',(error, authData)=>{
    	if(error){
    		throw new Exception({errCode: 401, errMessage: 'invalid token'});
    	}
        return next();
        //return authData;
    });
} 

exports.authorizationToken = authorizationToken;

// throw new Exception({errCode: 401, errMessage: "Mensaje de error"})


// class ValidationException extends Exception
// errCode: 401
// errMessage
// throw new ValidationException()
