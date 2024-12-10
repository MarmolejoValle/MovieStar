exports.pucherse = (email, price, period, idMovie) => {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de Compra - MovieStar</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    table {
      width: 100%;
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #2c3e50;
      color: #ffffff;
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .header h1 {
      font-size: 28px;
      margin: 0;
    }
    .content {
      padding: 30px;
      color: #333;
    }
    .content h2 {
      font-size: 22px;
      color: #2c3e50;
      margin-bottom: 20px;
    }
    .movie-details {
      background-color: #ecf0f1;
      padding: 20px;
      border-radius: 10px;
      margin-top: 20px;
    }
    .movie-details h3 {
      margin-top: 0;
      font-size: 20px;
      color: #34495e;
    }
    .movie-details p {
      margin: 8px 0;
      font-size: 14px;
      color: #34495e;
    }
    .button {
      display: inline-block;
      background-color: #e74c3c;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      margin-top: 20px;
      text-transform: uppercase;
      transition: background-color 0.3s ease;
    }
    .button:hover {
      background-color: #c0392b;
    }
    .footer {
      background-color: #ecf0f1;
      text-align: center;
      padding: 15px;
      font-size: 12px;
      color: #7f8c8d;
      border-radius: 0 0 10px 10px;
    }
    .footer a {
      color: #7f8c8d;
      text-decoration: none;
    }
    .footer a:hover {
      color: #2c3e50;
    }
  </style>
</head>
<body>
  <table>
    <tr>
      <td class="header">
        <h1>Gracias por tu compra en MovieStar</h1>
      </td>
    </tr>

    <tr>
      <td class="content">
        <h2>¡Hola ${email}!</h2>
        <p>
          Gracias por tu compra. Estamos encantados de que hayas elegido MovieStar para disfrutar de tus películas y series favoritas. Aquí tienes los detalles de tu pedido:
        </p>

        <div class="movie-details">
          <h3>Detalles de tu compra</h3>
          <p><strong>Título:</strong> ${idMovie}</p>
          <p><strong>Tipo de compra:</strong> ${period}</p>
          <p><strong>Precio:</strong> ${price}</p>
        </div>

        <p style="margin-top: 20px;">
          Si tienes alguna duda o necesitas soporte, no dudes en <a href="#">contactarnos</a>.
        </p>
      </td>
    </tr>

    <tr>
      <td class="footer">
        <p>© 2024 MovieStar. Todos los derechos reservados.</p>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
exports.createAccount = (name, lastName, email) => {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registro Exitoso - MovieStar</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    table {
      width: 100%;
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 10px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #2c3e50;
      color: #ffffff;
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .header h1 {
      font-size: 28px;
      margin: 0;
    }
    .content {
      padding: 30px;
      color: #333;
    }
    .content h2 {
      font-size: 22px;
      color: #2c3e50;
      margin-bottom: 20px;
    }
    .message {
      background-color: #ecf0f1;
      padding: 20px;
      border-radius: 10px;
      margin-top: 20px;
    }
    .message p {
      margin: 8px 0;
      font-size: 14px;
      color: #34495e;
    }
    .button {
      display: inline-block;
      background-color: #e74c3c;
      color: #ffffff;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      margin-top: 20px;
      text-transform: uppercase;
      transition: background-color 0.3s ease;
    }
    .button:hover {
      background-color: #c0392b;
    }
    .footer {
      background-color: #ecf0f1;
      text-align: center;
      padding: 15px;
      font-size: 12px;
      color: #7f8c8d;
      border-radius: 0 0 10px 10px;
    }
    .footer a {
      color: #7f8c8d;
      text-decoration: none;
    }
    .footer a:hover {
      color: #2980b9;
    }
  </style>
</head>
<body>
  <table>
    <tr>
      <td class="header">
        <h1>¡Bienvenido a MovieStar!</h1>
      </td>
    </tr>

    <tr>
      <td class="content">
        <h2>Hola ${name},</h2>
        <p>
          Te damos la bienvenida a MovieStar. Tu registro ha sido completado exitosamente y ahora puedes disfrutar de nuestra amplia variedad de películas y series. Estamos felices de tenerte como parte de nuestra comunidad.
        </p>

        <div class="message">
          <h3>Detalles de tu cuenta</h3>
          <p><strong>Correo electrónico:</strong> ${email}</p>
          <p><strong>Usuario:</strong> ${name, lastName} </p>
        </div>


        <p style="margin-top: 20px;">
          Si tienes alguna pregunta o necesitas ayuda, no dudes en <a href="#">contactarnos</a>.
        </p>
      </td>
    </tr>

    <tr>
      <td class="footer">
        <p>© 2024 MovieStar. Todos los derechos reservados.</p>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}
exports.promotion = (dateStart, dateEnd, discount, name) => {
  return `
  <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Promoción Especial</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f6f6f6;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #13161A;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .promo-banner {
            width: 100%;
            height: auto;
            position: relative;
        }
        .discount-overlay {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #ffffff;
            font-size: 150px; 
            font-weight: bold; 
            text-shadow: 
                5px 5px 10px rgba(0, 0, 0, 0.8),  
                -5px -5px 15px rgba(0, 0, 0, 0.6), 
                0px 5px 10px rgba(0, 0, 0, 0.5),  
                0px -5px 10px rgba(0, 0, 0, 0.5), 
                2px 2px 15px rgba(0, 0, 0, 0.5);  
            letter-spacing: 4px; 
            text-align: center;
            z-index: 10; 
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content h2 {
            color: #333333;
            margin: 10px 0;
        }
        .content p {
            color: #555555;
            font-size: 16px;
            margin: 10px 0;
        }
        .cta-button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #A62940;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .cta-button:hover {
            background-color: #2c8c46;
        }
        .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #888888;
        }
        .footer a {
            color: #4285f4;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>¡Gran Promoción!</h1>
        </div>

        <div style="position: relative;">
            <img src="https://img.freepik.com/fotos-premium/marco-gran-venta-fondo-rojo-brillante-esferas-porcentajes-3d-render_521642-141.jpg" alt="Banner de Promoción" class="promo-banner">
            <div class="discount-overlay">50%</div>
        </div>

        <div class="content">
            <h2>¡${name} !  </h2>
            <p>Obtén hasta un <strong>${discount * 100} % de descuento</strong> en productos seleccionados. Esta oferta estará disponible por tiempo limitado (${dateStart} - ${dateEnd}), ¡así que aprovecha ahora!</p>
        </div>

        <div class="footer">
            <p>Recibiste este correo porque eres un cliente valioso de nuestra marca.</p>
        </div>
    </div>
</body>
</html>

  `;
}