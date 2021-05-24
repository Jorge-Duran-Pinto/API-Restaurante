const express = require('express');
const router = express.Router();
const controllerIngrediente = require('../controllers/ingrediente');

router.route('/')
.get((req,res)=>{
   if(err || !result){
       return res.status(401).json({ message: 'Mising data body'});
   }else if(req.body && !req.body.nombre){
       return res.status(401).json({message:' Missing data'});
   }
   controllerIngrediente.ingredienteById(req.body.nombre,(err, result)=>{
        res.status(200).json({Ingrediente: result});
   })
});
module.exports = router;