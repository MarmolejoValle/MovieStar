const express = require('express')
const router = express.Router();

const {getsaleTop10,postAddSale,postclientCheck} = require('../controller/sale');

router.get('/top10', getsaleTop10);
router.post('/add', postAddSale);
router.post('/check', postclientCheck);




module.exports = router