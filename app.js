const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 2003;
const url = "localhost"
const app = express();

app.set('trust proxy', true);
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use('/api', require('./router'));

app.listen(port, function() { 
    console.log("Servidor iniciado");
    });