const express = require('express');
const { getPurchase, addPurchase } = require('../controller/purchaseController');


const router = express.Router();

router.get("/getallpurchase", getPurchase);

router.post("/addpurchase",addPurchase);

module.exports = router;