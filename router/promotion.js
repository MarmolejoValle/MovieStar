const express = require('express')
const router = express.Router();

const { postaddPromotion ,getviewAllPromotions,postdeletePromotion} = require('../controller/promotion');

//EndPoint para la gestion de promociones
router.post('/add', postaddPromotion);
router.get('/viewAll', getviewAllPromotions);
router.post('/delete', postdeletePromotion);

module.exports = router