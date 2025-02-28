const express = require('express');
const { getPurchase, addPurchase, deletePurchase } = require('../controller/purchaseController');


const router = express.Router();

router.get("/getallpurchase", getPurchase);

router.post("/addpurchase",addPurchase);

router.delete("/deletepurchase/:id",deletePurchase);

module.exports = router;