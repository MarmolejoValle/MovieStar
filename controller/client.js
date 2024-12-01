const userService = require("../service/client");
const emailService = require("../service/email");
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
exports.postCreateAccount = async (req, res) => {
    try {
        //Paremetros de body json
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const lastName = req.body.lastName;

        //Comprobacion de valor idUser
        if (!name || !email || !password || !lastName) throw new Error('Faltan algunos datos')

        //Utilizacion del servicio de libreria
        const response = await userService.createAccount(name,email,password,lastName);
        //Utilizacion de servicio de correo electronico
        emailService.sendMail(email, 'Bienvenido a MovieStar', "Nos da un gusto que formes parte de nuestra familia")
        //Respuesta en json
        res.json(response);
    } catch (error) {
        //Respuesta de error
        res.status(500).json({ error: error.message });
    }
};
