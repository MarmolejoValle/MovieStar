const nodemailer = require('nodemailer');
require('dotenv').config();


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'moviestarsup@gmail.com',
        pass: process.env.KEY_EMAIL_GMAIL
    }
});


exports.sendMail = (desTo, subject, text) => {
    // Definir el contenido del correo
    const mailOptions = {
        from: 'moviestarsup@gmail.com',         // Remitente
        to: desTo,     // Destinatario
        subject: subject,        // Asunto del correo
        text: text  // Cuerpo del mensaje (texto)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error al enviar el correo:', error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
}
