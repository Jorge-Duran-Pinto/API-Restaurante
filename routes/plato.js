const express = require('express');
const router = express.Router();
const controllerPlato= require('../controllers/plato');

router.route('/')
.get((req,res)=>{
   if(err || !result){
       return res.status(401).json({ message: 'Mising data body'});
   }else if(req.body && !req.body.nombrePlato){
       return res.status(401).json({message:' Missing data'});
   }
   controllerPlato.platoById(req.body.nombrePlato,(err, result)=>{
        res.status(200).json({Plato: result});
   })
});
module.exports = router;