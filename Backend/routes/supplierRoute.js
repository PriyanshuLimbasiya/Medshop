const express = require('express');
const getSupplier = require('../controller/supplierController');

const router = express.Router();

router.get("/getallsupplier",getSupplier)

module.exports = router;