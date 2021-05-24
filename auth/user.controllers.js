const express = require('express');
const mysql = require('mysql');
const {json} = require('jsonwebtoken');
const crypto = require('../tools/crypto');
const { use } = require('passport');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
// login in our mariadb
//-----------------------------------------
const connection = mysql.createConnection({
    host: 'mariadbpokeapi.c2ojkthywwcf.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: '123456789',
    database: 'restaurante'
  });
  connection.connect(error =>{
    if(error) throw error;
    console.log('Database server is running!!!');
});
//-----------------------------------------

//#region register
async function registerUser(userName, password){
    findUser(userName).then(result =>{
        if(result.legth === undefined){
            console.log('usuario no usado');
            const userObjP = {
                id: uuid.v4(),
                userName: userName,
                password: crypto.hashPassword(password)
            };
            connection.query("insert into user SET ?;",userObjP,(error, results, fields)=>{
                if(error) throw error;
                console.log('User added!!!'+ results);
            });
        }
        else{
            console.log('no hay datos');
        }
    }).catch(err => {
        console.log('Error with DDBB.');
    })
}
function findUser(userName){
    return new Promise((resolve,reject)=>{
        connection.query(`SELECT userName FROM user where userName = '${userName}'`, (error, result)=>{
            console.log(result);
            resolve(result);
            if(error){
                reject(error);
            }
        });
    });
}
//#endregion

//#region login
async function checkCredentials(userName, password,done){
    getPasswordByUserName(userName).then(result =>{
        if(result){
            console.log('ok');
            bcrypt.compare(password,result[0].password,done);
        }
        else{
            console.log('there in not any user in our database with that credentials');
            done('invalid');
        }
    }).catch(err => {
        console.log('error with db');
        done('error');
    })
}
function getPasswordByUserName(userName){
    return new Promise((resolve,reject)=>{
        connection.query(`SELECT password FROM user where userName = '${userName}'`, (error, result)=>{
            console.log(result);
            resolve(result);
            if(error){
                reject(error);
            }
        });
    });
}
//#endregion

// check token

exports.checkCredentials = checkCredentials;
exports.registerUser = registerUser;
