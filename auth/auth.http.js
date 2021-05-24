const controllerAuth = require('./user.controllers');
const jwt = require('jsonwebtoken');

const registerUser = (req,res)=>{
    let userName = req.body.userName;
    let password = req.body.password;
    if(!req.body){
        return res.status(400).json({message: 'Missing data body'});
    }else if(req.body &&  !userName || !password){
        return res.status(400).json({message: 'Missing data'});
    }
    controllerAuth.registerUser(userName, password);
    res.status(200).json({message: `Nuevo Usuario ${userName}...`});
    
}


const loginUser = (req,res)=>{
    if(!req.body){
        return res.status(400).json({message: 'Missing data body'});
    }else if(req.body &&  !req.body.userName || !req.body.password){
        return res.status(400).json({message: 'Missing data'});
    }

    controllerAuth.checkCredentials(req.body.userName, req.body.password,(error,result)=>{
        if(error || !result){
            return res.status(401).json({message: 'Wrong credentials'});
        }
    
        const token = jwt.sign({userName: req.body.user,pasword: req.body.password}, 'restaurante');

        res.status(200).json({ token: token});
    });

}
exports.registerUser = registerUser;
exports.loginUser = loginUser;