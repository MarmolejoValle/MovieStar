const express = require('express')
const router = express.Router();

const {postSearch,postLibrary,postAddSale,postCreateAccount} = require('../controller/user');

router.post('/login', postSearch);
router.post('/library', postLibrary);
router.post('/addSale', postAddSale);
router.post('/createAccount',postCreateAccount);


module.exports = router