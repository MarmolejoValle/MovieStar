const mysql = require('../config/mysql')

exports.salesTop10 = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            //Conexion a la base de datos
            const db = await mysql.connect();
            //Query de la base de datos con una view
            await db.execute(`select * from sales_total_movies_desc10;`, (err, rows) => {
                //Comprobaion de errores
                if (err) throw err
                //Comprobacin de elementos 
                if (rows.length > 0) {
                    //Respuesta del query
                    resolve(rows);
                    return
                }
                //Error por si no existe usuario
                resolve({ "error": "Error en al consulta" });
                return

            });


        }
        catch (error) {
            reject(error);
        }
    });
};
exports.addSale = async (period, idMovie, price, idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Conexion a la base de datos
            const db = await mysql.connect();
            //Query de la base de datos con un proceso almacenado
            await db.execute(`CALL addSale('${period}',${idMovie},${price},${idUser});`, (err, rows) => {
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
