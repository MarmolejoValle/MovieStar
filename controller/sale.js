const saleService = require("../service/sale");
const emailService = require("../service/email");
const emailTemplate = require('../models/templete')

exports.getsaleTop10 = async (req, res) => {
    try {
        const pag = req.params.pag;
        if(!pag) throw new Error('Faltan algunos datos');
        //Utilizacion del servicio de libreria
        const response = await saleService.salesTop10(pag);

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
        emailService.sendMail(email, 'Proceso de MovieStar', emailTemplate.pucherse(email,price,period,idMovie))
        //Respuesta en json
        res.json(response);
    } catch (error) {
        //Respuesta de error
        res.status(500).json({ error: error.message });
    }
};
exports.postclientCheck = async (req, res) => {
    try {
        //Paremetros de body json
        const idUser = req.body.idUser;
        const idMovie = req.body.idMovie;
        if (!idMovie || !idUser  ) throw new Error('Faltan algunos datos')

        //Utilizacion del servicio de libreria
        const response = await saleService.clientCheck(idMovie,idUser);

        //Respuesta en json
        res.json(response);
    } catch (error) {
        //Respuesta de error
        res.status(500).json({ error: error.message });
    }
};
exports.getStatistics = async (req, res) => {
    try {
        const idMovie = req.params.id;
        if(!idMovie) throw new Error('Faltan algunos datos');
        //Utilizacion del servicio de libreria
        const response = await saleService.statistics(idMovie);

        //Respuesta en json
        res.json(response);
    } catch (error) {
        //Respuesta de error
        res.status(500).json({ error: error.message });
    }
};