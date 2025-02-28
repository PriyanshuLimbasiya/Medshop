const SupplierModel = require('../models/Supplier.model');
const PurchaseModel = require('../models/Purchase.model');


const getPurchase = async (req, res) => {
    try {
        const purchases = await PurchaseModel.find()
            .populate("supplier", "name")
            .lean();

        if (!purchases.length) {
            return res.status(404).json({ message: "No purchases found" });
        }

        res.status(200).json(purchases);
    } catch (error) {
        console.error("Error fetching purchases:", error);
        res.status(500).json({ message: "Error fetching purchases", error: error.message });
    }
};


const getPurchasebyID = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await PurchaseModel.findById(id).populate("supplier", "name");
        res.status(200).json(result);
    } catch (error) {
        console.log("Error", error);
    }
}

const addPurchase = async (req, res) => {
    try {
        const purchase = new PurchaseModel(req.body);
        const result = await purchase.save();
        res.status(200).json(result)
    } catch (error) {
        console.error("Purchase Adding Error", error);
    }
}

const deletePurchase = async (req, res) => {
    const { id } = req.params;
    try {
        const purchase = await PurchaseModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Purchase Has Been Deleted", purchase })
    } catch (error) {
        console.error("Error deleting Purchase:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

const updatePurchase = async (req, res) => {
    const { id } = req.params;
    const updatefields = req.body;

    try {
        const purchase = await PurchaseModel.findByIdAndUpdate(id, updatefields, { new: true, runValidators: true })
        if (!purchase) {
            return res.status(404).json({ message: "Purchase not found" });
        }

        return res.status(200).json({ message: "Purchase details updated", purchase });
    } catch (error) {
        console.error("Error in updatePurchase:", error);
        res.status(500).json({ error: "Server error" });
    }
}

module.exports = {
    getPurchase,
    getPurchasebyID,
    addPurchase,
    deletePurchase,
    updatePurchase
}