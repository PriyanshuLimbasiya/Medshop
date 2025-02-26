const purchase = require('../models/Purchase.model');


const getPurchase = async (req, res) => {
    try {
        const purchases = await purchase.find();
        res.json(purchases);
    } catch (error) {
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