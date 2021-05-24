const express = require('express');
const router = express.Router();
const controllerLleva = require('../controllers/lleva');

router.route('/')
.get((req,res)=>{
   if(err || !result){
       return res.status(401).json({ message: 'Mising data body'});
   }else if(req.body && !req.body.nombrePlato){
       return res.status(401).json({message:' Missing data'});
   }
   controllerLleva.llevaById(req.body.nombrePlato,(err, result)=>{
        res.status(200).json({Lleva: result});
   })
});
module.exports = router;