const med = require("../models/Medicine.model");

const getAllMedicine = async (req, res) => {
  try {
    const medicines = await med.find();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addMedicine = async (req, res) => {
  try {
    const {
      medname,
      manufacturer,
      price,
      quantity,
      expiryDate,
      batchNumber,
      category,
      minStockLevel,
    } = req.body;

    if (
      !medname ||
      !manufacturer ||
      !price ||
      !quantity ||
      !expiryDate ||
      !batchNumber ||
      !category
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingMedicine = await med.findOne({ batchNumber });
    if (existingMedicine) {
      return res.status(400).json({ error: "Batch number already exists" });
    }

    const newMedicine = new med({
      medname,
      manufacturer,
      price,
      quantity,
      expiryDate,
      batchNumber,
      category,
      minStockLevel: minStockLevel || 10,
    });

    await newMedicine.save();
    res.status(201).json({ message: "Medicine added successfully" });
  } catch (error) {
    console.error("Error in /addmedicine:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteMedicine = async (req, res) => {
  const { id } = req.params;
  try {
    const medicine = await med.findByIdAndDelete(id);

    if (!medicine) {
      return res.status(404).json({ message: "Medicine not found" });
    }

    return res
      .status(200)
      .json({ message: "Medicine deleted successfully", medicine });
  } catch (error) {
    console.error("Error deleting medicine:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateMedicine = async (req, res) => {
    const { id } = req.params;
    const updateFields = req.body; 

    try {
        const medicine = await med.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });

        if (!medicine) {
            return res.status(404).json({ message: "Medicine not found" });
        }

        return res.status(200).json({ message: "Medicine details updated", medicine });
    } catch (error) {
        console.error("Error in updateMedicine:", error);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = {
  getAllMedicine,
  addMedicine,
  deleteMedicine,
  updateMedicine,
};
