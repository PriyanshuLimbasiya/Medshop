const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema(
    {
        medname: { type: String, required: true },

        manufacturer: { type: String, required: true },

        price: { type: Number, required: true, min: 0 },

        quantity: { type: Number, required: true, min: 0 },

        expiryDate: { type: Date, required: true },

        batchNumber: { type: String, required: true, unique: true },

        category: { type: String, enum: ['Antibiotic', 'Painkiller', 'Vitamin', 'Antiseptic', 'Other'], required: true },

        minStockLevel: { type: Number, default: 10, min: 0 }

    }, { timestamps: true });

module.exports = mongoose.model('Medicine', medicineSchema);