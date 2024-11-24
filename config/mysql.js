const  mysql =  require('mysql2');

exports.connect = async ()=> {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '25Marmolejo09',
      database: 'moviestar',
    });
    console.log('Conexión a MySQL establecida.');
    return connection;
  } catch (error) {
    console.error('Error al conectar a MySQL:', error);
    throw error;
  }
}

