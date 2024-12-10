const promotionService = require("../service/promotion");
const emailService = require("../service/email");
const emailTemplate = require('../models/templete');
const clientService = require("../service/client");


exports.postaddPromotion = async (req, res) => {
    try {
        //Paremetros de body json
        const dateStart = req.body.dateStart;
        const dateEnd = req.body.dateEnd;
        const discount = req.body.discount;
        const idMovie = req.body.idMovie;
        const saleType = req.body.saleType;
        const name = req.body.name;


        //Comprobacion de valor 
        if (!dateStart || !dateEnd || !discount || !idMovie || !saleType) throw new Error('Faltan algunos datos')

        //Utilizacion del servicio para añadir una promocion
        const response = await promotionService.addPromotion(dateStart, dateEnd, discount, idMovie, saleType, name);

        console.log(await clientService.addEmails())
        emailService.sendMail(email, 'Proceso de MovieStar', emailTemplate.pucherse(email, price, period, idMovie))

        //Respuesta en json
        res.json(response);
    } catch (error) {
        //Respuesta de error
        res.status(500).json({ error: error.message });
    }
};
exports.getviewAllPromotions = async (req, res) => {
    try {

        //Utilizacion del servicio para ver las promociones actuales
        const response = await promotionService.viewAllActive();

        //Respuesta en json
        res.json(response);
    } catch (error) {
        //Respuesta de error
        res.status(500).json({ error: error.message });
    }
};
exports.postdeletePromotion = async (req, res) => {
    try {
        //Paremetros de body json
        const id = req.body.id;


        //Comprobacion de valor 
        if (!id) throw new Error('Faltan algunos datos')

        //Utilizacion del servicio para añadir una promocion
        const response = await promotionService.deletePromotion(id);

        //Respuesta en json
        res.json(response);
    } catch (error) {
        //Respuesta de error
        res.status(500).json({ error: error.message });
    }
};
