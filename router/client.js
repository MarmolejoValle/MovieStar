const express = require('express')
const router = express.Router();

const {postCreateAccount,postLibrary} = require('../controller/client');

router.post('/library', postLibrary);
router.post('/createAccount',postCreateAccount);

module.exports = router