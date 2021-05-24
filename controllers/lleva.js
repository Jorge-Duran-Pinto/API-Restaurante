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
    console.log('Lleva controller running');
});
//

function llevaById(nombrePlato,done){
    getDataLlevaById(nombrePlato).then(result => {
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

function getDataLlevaById(nombrePlato){
    return new Promise((resolve,reject)=>{
        conecction.query(`SELECT * FROM lleva WHERE nomPlato = ${nombrePlato}`,(error,result)=>{
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

exports.llevaById = llevaById;