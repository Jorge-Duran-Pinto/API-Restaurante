const express = require('express');
const router = express.Router();
const httpHandlerEmployee = require('./employee.http')

router.route('/')
.get(httpHandlerEmployee.readEmployees);

router.route('/:idEmployee')
.get(httpHandlerEmployee.readEmployeeById);

router.route('/delete/:idEmployee')
.delete(httpHandlerEmployee.deleteEmployee);

router.route('/add')
.post(httpHandlerEmployee.createEmployee);

module.exports = router;