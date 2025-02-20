const express = require('express');
const { getAllMedicine } = require('../controller/medicineController');

const router = express.Router();

router.get('/getallmedicine', getAllMedicine)

module.exports = router