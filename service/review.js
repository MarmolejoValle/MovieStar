const mysql = require('../config/mysql');

exports.addReview = async (id_movie, comment, rating, user_fk) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Conexion a la base de datos
            const db = await mysql.connect();
            //Query de la base de datos con un proceso almacenado
            await db.execute(`CALL addReview('${id_movie}','${comment}',${rating}, ${user_fk});`, (err, rows) => {
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
exports.viewForMovie = async (id)=>{
    return new Promise(async (resolve, reject) => {
        try {
            //Conexion a la base de datos
            const db = await mysql.connect();
            //Query de la base de datos con una view
            await db.execute(`SELECT r.comment,r.rating,r.name FROM review_all r where r.id_movie = '${id}'`, (err, rows) => {
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
}