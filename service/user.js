const axios = require('axios')
const mysql = require('../config/mysql')
exports.login = async (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await mysql.connect();
            await db.execute(`SELECT u.id ,u.email,u.name,u.last_name FROM user u WHERE u.email = '${email}' AND u.password = '${password}'`, (err, rows) => {
                if (err) throw err
                if (rows.length > 0) {
                    resolve(rows[0]);
                    return
                }
                resolve({ "error": "No existe usuario" });
                return

            });


        }
        catch (error) {
            reject(error);
        }
    });
};
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
exports.addSale = async (period, idMovie, price, idUser, saleType) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Conexion a la base de datos
            const db = await mysql.connect();
            //Query de la base de datos con un proceso almacenado
            await db.execute(`CALL addSale('${period}',${idMovie},${price},${idUser},${saleType});`, (err, rows) => {
                //Comprobaion de errores
                if (err) throw err
                //Verificacion de proceso
                if (rows.affectedRows) {
                    //Respuesta del query
                    resolve({ 'message': "Proceso exitoso" });
                    return
                }
                //Error por si no existe usuario
                resolve({ "error": "Erro en el proceso" });
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