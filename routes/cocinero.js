const express = require('express');
const router = express.Router();
const controllerCocinero = require('../controllers/cocinero');

router.route('/')
.get((req,res)=>{
   if(err || !result){
       return res.status(401).json({ message: 'Mising data body'});
   }else if(req.body && !req.body.id){
       return res.status(401).json({message:' Missing id'});
   }
   controllerCocinero.CocineroById(req.body.id,(err, result)=>{
        res.status(200).json({cocinero: result})
   })
});
module.exports = router;