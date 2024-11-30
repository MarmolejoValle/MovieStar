const express = require('express')
const router = express.Router();

const {postAddSale,postCreateAccount,postLibrary} = require('../controller/client');

router.post('/library', postLibrary);
router.post('/addSale', postAddSale);
router.post('/createAccount',postCreateAccount);

module.exports = router