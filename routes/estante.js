const express = require('express');
const router = express.Router();
const controllerEstante = require('../controllers/estante');

router.route('/')
.get((req,res)=>{
   if(err || !result){
       return res.status(401).json({ message: 'Mising data body'});
   }else if(req.body && !req.body.letra || req.body && !req.body.numAlmacen){
       return res.status(401).json({message:' Missing data'});
   }
   controllerEstante.estanteById(req.body.letra,req.body.numAlmacen,(err, result)=>{
        res.status(200).json({Estante: result});
   })
});
module.exports = router;