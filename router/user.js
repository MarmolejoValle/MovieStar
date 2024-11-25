const express = require('express')
const router = express.Router();

const {postSearch,postLibrary} = require('../controller/user');

router.post('/login', postSearch);
router.post('/library', postLibrary);



module.exports = router