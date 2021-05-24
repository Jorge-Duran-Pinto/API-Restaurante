const express = require('express');
const router = express.Router();
const controllerPinche = require('../controllers/pinche');

router.route('/')
.get((req,res)=>{
   if(err || !result){
       return res.status(401).json({ message: 'Mising data body'});
   }else if(req.body && !req.body.id){
       return res.status(401).json({message:' Missing data'});
   }
   controllerPinche.pincheById(req.body.id,(err, result)=>{
        res.status(200).json({pinche: result});
   })
});
module.exports = router;