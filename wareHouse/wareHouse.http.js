const controllerAlmacen = require('./wareHouse.controllers');

const readWareHouses = (req,res)=>{
    controllerAlmacen.DataAlmacen((result)=>{
        res.status(200).json({Almacen: result});
    })
}

exports.readWareHouses = readWareHouses;