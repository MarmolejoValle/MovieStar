const express = require('express')
const router = express.Router();

const {postLogin} = require('../controller/user');

router.post('/login', postLogin);



module.exports = router