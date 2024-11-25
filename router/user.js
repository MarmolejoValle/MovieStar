const express = require('express')
const router = express.Router();

const {postSearch,postLibrary,postAddSale} = require('../controller/user');

router.post('/login', postSearch);
router.post('/library', postLibrary);
router.post('/addSale', postAddSale);



module.exports = router