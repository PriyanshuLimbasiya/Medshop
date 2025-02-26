const supplier =require('../models/Supplier.model')
const getSupplier = async (req, res) => {
    try {
        const result = await supplier.find()
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Supplier", error });
    }
};

module.exports=getSupplier;