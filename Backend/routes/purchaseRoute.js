const express = require('express');
const { getPurchase } = require('../controller/purchaseController');


const router = express.Router();

router.get("/getallpurchase", getPurchase)

module.exports = router;