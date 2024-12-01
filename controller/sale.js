const saleService = require("../service/sale");
const emailService = require("../service/email");

exports.getsaleTop10 = async (req, res) => {
    try {
       
        //Utilizacion del servicio de libreria
        const response = await saleService.salesTop10();

        //Respuesta en json
        res.json(response);
    } catch (error) {
        //Respuesta de error
        res.status(500).json({ error: error.message });
    }
};
exports.postAddSale = async (req, res) => {

    try {
        //Paremetros de body json
        const period = req.body.period;
        const idMovie = req.body.idMovie;
        const price = req.body.price;
        const idUser = req.body.idUser;
        const email = req.body.email;

        //Comprobacion de valor idUser
        if (!period || !idMovie || !price || !idUser  || !email) throw new Error('Faltan algunos datos')

        //Utilizacion del servicio de libreria
        const response = await saleService.addSale(period, idMovie, price, idUser);
        //Utilizacion de servicio de correo electronico
        emailService.sendMail(email, 'Proceso de MovieStar', "Se a realizado una transaccion exitosa")
        //Respuesta en json
        res.json(response);
    } catch (error) {
        //Respuesta de error
        res.status(500).json({ error: error.message });
    }
};