const express = require('express')
const router = express.Router();

const {postSearch} = require('../controller/user');

router.post('/login', postSearch);



module.exports = router