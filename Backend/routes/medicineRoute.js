const express = require('express');
const { getAllMedicine, addMedicine, deleteMedicine, updateMedicine } = require('../controller/medicineController');

const router = express.Router();


router.get('/getallmedicine', getAllMedicine)

router.post('/addMedicine',addMedicine);

router.delete('/deleteMedicine/:id',deleteMedicine);

router.patch('/updateMedicine/:id',updateMedicine);

module.exports = router