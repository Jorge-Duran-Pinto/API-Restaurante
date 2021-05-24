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
    console.log('Estante controller running');
});
//

function estanteById(letra,numAlmacen,done){
    getDataEstanteById(letra,numAlmacen).then(result => {
        if(result){
            console.log('result')
        }else{
            console.log('without result');
            return false;
        }
    }).catch(err => {
        console.log('error with db');
    });
}

function getDataEstanteById(letra,numAlmacen){
    return new Promise((resolve,reject)=>{
        conecction.query(`SELECT * FROM estante WHERE letra = ${letra} and numAlmacen = ${numAlmacen}`,(error,result)=>{
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

exports.estanteById = estanteById;