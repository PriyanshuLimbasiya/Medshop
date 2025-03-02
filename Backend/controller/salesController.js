const PurchaseModel=require("../models/Purchase.model")
const SalesModel = require('../models/Sales.model');

const getSales = async (req, res) => {
    try {
        const sales = await SalesModel.find().populate("purchase","medicinename")
        if (!sales.length) {
            return res.status(404).json({ message: "No sales found" });
        }
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: "Error fetching sales", error: error.message });
    }
};

const getSalesByID = async (req, res) => {
    const { id } = req.params;
    try {
        const sale = await SalesModel.findById(id);
        if (!sale) {
            return res.status(404).json({ message: "Sale not found" });
        }
        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({ message: "Error fetching sale", error: error.message });
    }
};

const addSales = async (req, res) => {
    try {
        const sales = new SalesModel(req.body);
        const result = await sales.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error adding sale", error: error.message });
    }
};

const deleteSales = async (req, res) => {
    const { id } = req.params;
    try {
        const sale = await SalesModel.findByIdAndDelete(id);
        if (!sale) {
            return res.status(404).json({ message: "Sale not found" });
        }
        res.status(200).json({ message: "Sale deleted", sale });
    } catch (error) {
        res.status(500).json({ message: "Error deleting sale", error: error.message });
    }
};

const updateSales = async (req, res) => {
    const { id } = req.params;
    try {
        const sale = await SalesModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!sale) {
            return res.status(404).json({ message: "Sale not found" });
        }
        res.status(200).json({ message: "Sale updated", sale });
    } catch (error) {
        res.status(500).json({ message: "Error updating sale", error: error.message });
    }
};

module.exports = {
    getSales,
    getSalesByID,
    addSales,
    deleteSales,
    updateSales
};
