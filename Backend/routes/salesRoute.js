const express = require('express');
const { getSales, getSalesByID, addSales, deleteSales, updateSales } = require('../controller/salesController');

const router = express.Router();

router.get("/getsales", getSales);
router.get("/getsales/:id", getSalesByID);
router.post("/addsales", addSales);
router.delete("/deletesales/:id", deleteSales);
router.patch("/editsales/:id", updateSales);

module.exports = router;
