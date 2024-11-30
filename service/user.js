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