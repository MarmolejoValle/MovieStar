const express = require('express')
const router = express.Router();

const {postAddReview,viewForMovie} = require('../controller/review');

router.post('/add', postAddReview);
router.post('/viewForMovie', viewForMovie);



module.exports = router