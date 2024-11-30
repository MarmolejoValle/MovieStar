const express = require('express')
const router = express.Router();

const { postaddPromotion ,getviewAllPromotions,postdeletePromotion} = require('../controller/promotion');

router.post('/promotion/add', postaddPromotion);
router.get('/promotion/viewAll', getviewAllPromotions);
router.post('/promotion/delete', postdeletePromotion);

module.exports = router