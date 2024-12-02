exports.pucherse = (email,price,period,idMovie)=>{
    return`<!DOCTYPE html>
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