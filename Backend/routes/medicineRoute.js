const express = require('express');
const { getAllMedicine, addMedicine, deleteMedicine, updateMedicine, getMedicineById } = require('../controller/medicineController');

const router = express.Router();


router.get('/getallmedicine', getAllMedicine)

router.get('/getallmedicine/:id', getMedicineById)

router.post('/addMedicine', addMedicine);

router.delete('/deleteMedicine/:id', deleteMedicine);

router.patch('/updateMedicine/:id', updateMedicine);



module.exports = router