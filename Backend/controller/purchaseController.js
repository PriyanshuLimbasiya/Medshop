const SupplierModel = require('../models/Supplier.model');
const PurchaseModel = require('../models/Purchase.model');


const getPurchase = async (req, res) => {
    try {
        const purchases = await PurchaseModel.find().populate("supplier", "name");

        res.json(purchases);
    } catch (error) {
        console.log("error", error);

        res.status(500).json({ message: "Error fetching purchases", error });
    }
};

const getPurchasebyID = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await purchase.findById(id);
        res.status(200).json(result);
    } catch (error) {
        console.log("Error", error);
    }
}

module.exports = {
    getPurchase,
    getPurchasebyID
}