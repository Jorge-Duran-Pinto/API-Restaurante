const mysql = require('mysql');


// conecction with our db
const connection = mysql.createConnection({
    host: 'mariadbpokeapi.c2ojkthywwcf.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: '123456789',
    database: 'restaurante'
  });
connection.connect(error => {
    if(error) throw error;
    console.log('Empleado controller running');
});

//#region Create
function addEmployee(objEmpleado,done){
    if(objEmpleado){
        console.log('ObjetoEmpleado',objEmpleado);
        connection.query("insert into empleado SET ?;",objEmpleado,(error, results, fields)=>{
            if(error) throw error;
            console.log('User added!!!'+ results);
            done('OK');
        });
    }
    else{
        console.log('no hay datos');
        done('ERROR');
    }
}


//#endregion

//#region Read
async function empleadoById(id,done){
    getDataEmpleadoById(id).then(result => {
        if(result){
            done(result);
        }else{
            done('without result');
            
        }
    }).catch(error => {
        console.log('error with db');
        done('error with db');
    });
}

function getDataEmpleadoById(id){
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM empleado where DNI = "${id}"`,(error, result)=>{
            if(error){
                reject(error);
            }
            resolve(result);
        });
    });
}
async function DataEmpleado(done){
    getDataEmpleado().then(result =>{
        if(result){
            done(result);
        }else{
            console.log('without result');
            done('invalid');
        }
    }).catch(error=>{
        console.log('error with db');
        done('error with db');
    });
}
function getDataEmpleado(){
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM empleado`,(error, result)=>{
            if(error){
                reject(error);
            }
            resolve(result);
        })
    })
}
//#endregion

//#region update



//#endregion

//#region Delete
function deleteEmpleadoById(id,done){
    deleteDataEmpleadoById(id).then(result => {
        if(result){
            done(result);
        }else{
            done('without result');
            
        }
    }).catch(error => {
        console.log('error with db');
        done('error with db');
    });
}

function deleteDataEmpleadoById(id){
    return new Promise((resolve, reject)=>{
        connection.query(`DELETE FROM empleado where DNI = "${id}"`,(error, result)=>{
            if(error){
                reject(error);
            }
            resolve(result);
        });
    });
}

//#endregion 

exports.empleadoById = empleadoById;
exports.DataEmpleado = DataEmpleado;
exports.deleteEmpleadoById = deleteEmpleadoById;
exports.addEmployee = addEmployee;
