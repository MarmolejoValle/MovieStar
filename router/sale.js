const express = require('express')
const router = express.Router();

const {getsaleTop10,postAddSale,postclientCheck,getStatistics} = require('../controller/sale');

router.get('/all/:pag', getsaleTop10);
router.post('/add', postAddSale);
router.post('/check', postclientCheck);
router.get('/statistics/:id', getStatistics);





module.exports = router