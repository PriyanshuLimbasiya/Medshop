const med = require('../models/Medicine.model');

const getAllMedicine = async (req, res) => {
    try {
        const medicines = await med.find();
        res.status(200).json(medicines);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllMedicine
}