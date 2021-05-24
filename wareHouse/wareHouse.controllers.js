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
    console.log('Almacen controller running');
});
//

async function almacenById(id,done){
    getDataAlmacenById(id).then(result => {
        if(result){
            console.log('result');
            done(result);
        }else{
            console.log('without result');
            //return false;
            done('invalid');
        }
    }).catch(err => {
        console.log('error with db');
        done('error with db');
    });
}

function getDataAlmacenById(id){
    return new Promise((resolve,reject)=>{
        conecction.query(`SELECT * FROM almacen WHERE numAlmacen = ${id}`,(error,result)=>{
            console.log('----------inside the query');
            if(error){
                console.log('inside reject');
                reject(error);
            }
            console.log('inside resolve');
            resolve(result);
        });
    });
}

async function DataAlmacen(done){
    getDataAlmacen().then(result =>{
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
function getDataAlmacen(){
    return new Promise((resolve, reject)=>{
        connection.query(`SELECT * FROM almacen`,(error, result)=>{
            if(error){
                reject(error);
            }
            resolve(result);
        });
    });
}
exports.almacenById = almacenById;
exports.DataAlmacen = DataAlmacen;