const axios = require('axios')
const mysql = require('../config/mysql')

exports.addPromotion = async (date_start, date_end, discount, id_movie, fk_sale_type, name) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Conexion a la base de datos
            const db = await mysql.connect();
            //Query de la base de datos con un proceso almacenado
            await db.execute(`CALL addPromotion('${date_start}','${date_end}',${discount}, '${id_movie}', ${fk_sale_type} , '${name}');`, (err, rows) => {
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

exports.viewAllActive = async (idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Conexion a la base de datos
            const db = await mysql.connect();
            //Query de la base de datos con una view
            await db.execute(`select * from viewallpromotions `, (err, rows) => {
                //Comprobaion de errores
                if (err) throw err
                //Comprobacin de elementos 
                if (rows.length > 0) {
                    //Respuesta del query
                    resolve(rows);
                    return
                }
                //Error por si no existe usuario
                resolve({ "error": "Error en la consulta" });
                return

            });


        }
        catch (error) {
            reject(error);
        }
    });
};

exports.deletePromotion = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Conexion a la base de datos
            const db = await mysql.connect();
            //Query de la base de datos con un proceso almacenado
            await db.execute(`DELETE FROM promotion p WHERE p.id =${id}; `, (err, rows) => {
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