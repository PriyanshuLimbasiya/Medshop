const express = require('express');
const { getPurchase, addPurchase, deletePurchase, updatePurchase, getPurchasebyID } = require('../controller/purchaseController');


const router = express.Router();

router.get("/getallpurchase", getPurchase);

router.get("/getallpurchase/:id", getPurchasebyID);

router.post("/addpurchase", addPurchase);

router.delete("/deletepurchase/:id", deletePurchase);

router.patch("/editpurchase/:id", updatePurchase);

module.exports = router;