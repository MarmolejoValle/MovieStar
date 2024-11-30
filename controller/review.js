const reviewService = require("../service/review");
const emailService = require("../service/email");
exports.postAddReview = async (req, res) => {
    try {
        //Paremetros de body json
        const idMovie = req.body.idMovie;
        const comment = req.body.comment;
        const rating = req.body.rating;
        const idUser = req.body.idUser;

        //Comprobacion de valor idUser
        if (!idMovie || !comment || !rating || !idUser) throw new Error('Faltan algunos valores')

        //Utilizacion del servicio de libreria
        const response = await reviewService.addReview(idMovie, comment, rating, idUser);

        //Respuesta en json
        res.json(response);
    } catch (error) {
        //Respuesta de error
        res.status(500).json({ error: error.message });
    }
};
exports.viewForMovie = async (req, res) => {
    try {
        //Paremetros de body json
        const idMovie = req.body.idMovie;


        //Comprobacion de valor idUser
        if (!idMovie ) throw new Error('Faltan algunos valores')

        //Utilizacion del servicio de libreria
        const response = await reviewService.viewForMovie(idMovie);

        //Respuesta en json
        res.json(response);
    } catch (error) {
        //Respuesta de error
        res.status(500).json({ error: error.message });
    }
};
