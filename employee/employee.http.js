const controllerEmpleado = require('./employee.controllers');

const readEmployees = (req,res)=>{
    //req.userData = authData;
    controllerEmpleado.DataEmpleado((result)=>{
        res.status(200).json({Empleados: result});
    });
}

const readEmployeeById = (req,res)=>{
    controllerEmpleado.empleadoById(req.params.idEmployee,(result)=>{
        console.log(req.body);
        res.status(200).json({Empleado: result});
    })
}

const deleteEmployee = (req,res)=>{
    controllerEmpleado.deleteEmpleadoById(req.params.idEmployee,(result)=>{
        res.status(200);
    })
}

const createEmployee = (req,res)=>{
    console.log(req.body)
    controllerEmpleado.addEmployee(req.body,(error,mensaje)=>{
        if(error){
            res.status(400);
        }
        res.status(200);
    });            
}

exports.readEmployees = readEmployees;
exports.readEmployeeById = readEmployeeById;
exports.deleteEmployee = deleteEmployee;
exports.createEmployee = createEmployee;