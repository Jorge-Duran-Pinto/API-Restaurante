const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPasswordAsync = (plainText,done)=>{
    bcrypt.hash(plainTextPwd, 10, done);
}
 
const hashPassword = (plainTextPwd)=> {
    return bcrypt.hashSync(plainTextPwd,10);
};
const comparePassword = (plainTextPwd, hashPwd)=>{
    bcrypt.compare(plainTextPwd,hashPwd,done);
};

/* lo que hace bcrypt por dentro
compare(text, pwd, callback) {
    let error;
    const textoEncriptado = encriptar(texto);
    if (textoEncriptado !== pwd) {
        error = "Hay un error"
    }
    callback(textoEncriptado, error);
}
*/
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
exports.hashPasswordAsync = hashPasswordAsync;