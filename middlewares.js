const authmiddleware = require('./tools/auth-middleware');
const cors = require('cors');
const express = require('express');
// unistall const bodyParser = require('body-parser')
let allowCrossDomain = function(req,res,next){
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Headers',"*");
    next();
}

const setupMiddlewares = (app) =>{
    app.use(express.json());
    app.use(cors());
    //app.use(allowCrossDomain);
    app.use(authmiddleware.authorizationToken);
}

exports.setupMiddlewares = setupMiddlewares;