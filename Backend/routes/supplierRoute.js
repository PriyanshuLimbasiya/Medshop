const express = require('express');
const { getSupplier, getSupplierByID, addSupplier, editSupplier, deleteSupplier } = require('../controller/supplierController');

const router = express.Router();

router.get("/getallsupplier",getSupplier)

router.get("/getallsupplier/:id",getSupplierByID)

router.post("/addsupplier",addSupplier);

router.patch("/editsupplier/:id",editSupplier);

router.delete("/deletesupplier/:id",deleteSupplier)

module.exports = router;