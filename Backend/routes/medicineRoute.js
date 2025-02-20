const express = require('express');
const { getAllMedicine, addMedicine } = require('../controller/medicineController');

const router = express.Router();


router.get('/getallmedicine', getAllMedicine)

router.post('/addMedicine',addMedicine);


module.exports = router