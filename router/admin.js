const express = require('express')
const router = express.Router();

const { postaddPromotion ,getviewAllPromotions} = require('../controller/promotion');

router.post('/promotion/add', postaddPromotion);
router.get('/promotion/viewAll', getviewAllPromotions);

module.exports = router