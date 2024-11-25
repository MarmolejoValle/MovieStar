const userService = require("../service/user");
exports.postSearch = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const response = await userService.login(email, password);
        res.json(response);
    } catch (error) {
        console.error(`Error occurred JSON: ${error}`);

        res.status(500).json({ error: error.message });
    }
};
exports.postLibrary = async (req, res) => {
    try {
        //Paremetros de body json
        const idUser = req.body.idUser;

        //Comprobacion de valor idUser
        if (!idUser) throw new Error('No existe el valor idUser')

        //Utilizacion del servicio de libreria
        const response = await userService.library(idUser);

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
        const saleType = req.body.saleType;

        //Comprobacion de valor idUser
        if (!period || !idMovie || !price || !idUser || !saleType  ) throw new Error('Faltan algunos datos')

        //Utilizacion del servicio de libreria
        const response = await userService.addSale(period,idMovie,price,idUser,saleType);

        //Respuesta en json
        res.json(response);
    } catch (error) {
        //Respuesta de error
        res.status(500).json({ error: error.message });
    }
};