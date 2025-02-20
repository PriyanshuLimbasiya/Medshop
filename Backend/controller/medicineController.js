const med = require('../models/Medicine.model');

const getAllMedicine = async (req, res) => {
    try {
        const medicines = await med.find();
        res.status(200).json(medicines);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addMedicine = async (req, res) => {
  try {
      console.log("Received data:", req.body);

      const { medname, manufacturer, price, quantity, expiryDate, batchNumber, category, minStockLevel } = req.body;

      if (!medname || !manufacturer || !price || !quantity || !expiryDate || !batchNumber || !category) {
          return res.status(400).json({ error: "All fields are required" });
      }

      const existingMedicine = await Medicine.findOne({ batchNumber });
      if (existingMedicine) {
          return res.status(400).json({ error: "Batch number already exists" });
      }

      const newMedicine = new Medicine({
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
}
  

module.exports = {
    getAllMedicine,
    addMedicine

}