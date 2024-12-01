const axios = require('axios')
const mysql = require('../config/mysql')

exports.library = async (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Conexion a la base de datos
            const db = await mysql.connect();
            //Query de la base de datos con una view
            await db.execute(`select * from library where user_fk = '${idUser}'`, (err, rows) => {
                //Comprobaion de errores
                if (err) throw err
                //Comprobacin de elementos 
                if (rows.length > 0) {
                    //Respuesta del query
                    resolve(rows);
                    return
                }
                //Error por si no existe usuario
                resolve({ "error": "No existe usuario" });
                return

            });


        }
        catch (error) {
            reject(error);
        }
    });
};
exports.createAccount = (name,email,password,lastName) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Conexion a la base de datos
            const db = await mysql.connect();
            //Query de la base de datos con una view
            await db.execute(`INSERT INTO user (name,email,password,last_name) VALUES ('${name}','${email}','${password}', '${lastName}');`, (err, rows) => {
                //Comprobaion de errores
                if (err) throw err
                //Comprobacin de elementos 
                if (rows.affectedRows) {
                    //Respuesta del query
                    resolve({ 'message': "Cuenta creada exitosamente" });
                    return
                }
                //Error por si no existe usuario
                resolve({ "error": "Hubo un error al crear el usuario" });
                return

            });


        }
        catch (error) {
            reject(error);
        }
    });
};