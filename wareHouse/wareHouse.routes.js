const express = require('express');
const router = express.Router();

const httpHandlerWareHouse = require('./wareHouse.http');

router.route('/')
.get(httpHandlerWareHouse.readWareHouses);

module.exports = router; 