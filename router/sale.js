const express = require('express')
const router = express.Router();

const {getsaleTop10,postAddSale} = require('../controller/sale');

router.get('/top10', getsaleTop10);
router.post('/add', postAddSale);



module.exports = router