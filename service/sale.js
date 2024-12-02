const mysql = require('../config/mysql')

exports.salesTop10 = async (pag) => {
    return new Promise(async (resolve, reject) => {
        try {
            const pagEnd = pag * 10;
            const pagStar = pagEnd - 10;

            //Conexion a la base de datos
            const db = await mysql.connect();
            //Query de la base de datos con una view
            await db.execute(`SELECT s.id_movie ,count(*)  as sales ,sum(s.price) as total FROM sale s GROUP BY s.id_movie order by sales desc limit ${pagStar},${pagEnd};`, (err, rows) => {
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
            await db.execute(`CALL addSale('${period}','${idMovie}',${price},${idUser});`, (err, rows) => {
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
exports.clientCheck = async (idMovie,idUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Conexion a la base de datos
            const db = await mysql.connect();
            //Query de la base de datos con una view
            await db.execute(`select  * from sale s where s.id_movie = '${idMovie}' and( s.user_fk = ${idUser} and s.date_end > now() or s.sale_type_fk = 2);`, (err, rows) => {
                //Comprobaion de errores
                if (err) throw err
                //Comprobacin de elementos 
                if (rows.length > 0) {
                    //Respuesta del query
                    resolve({"check":true});
                    return
                }
                //Error por si no existe usuario
                resolve({"check":false});
                return

            });


        }
        catch (error) {
            reject(error);
        }
    });
};
exports.statistics =  async (idMovie) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Conexion a la base de datos
            const db = await mysql.connect();
            //Query de la base de datos con un proceso almacenado
            await db.execute(`select s.date_start as date , sum(price) as total from sale s where s.id_movie = '${idMovie}' group by s.date_start;`, (err, rows) => {
                //Comprobaion de errores
                if (err) throw err
                //Verificacion de proceso
                if (rows.length > 0) {
                    //Respuesta del query
                    resolve(rows);
                    return
                }
                //Error por si no existe usuario
                resolve({ "error": "No existe ningun dato" });
                return

            });


        }
        catch (error) {
            reject(error);
        }
    });
};
