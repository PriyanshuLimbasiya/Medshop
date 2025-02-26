const mongoose = require('mongoose');

const categories = ['Antibiotic', 'Painkiller', 'Vitamin', 'Antiseptic', 'Other'];

const medicineSchema = new mongoose.Schema(
  {
    medname: { type: String, required: true },
    manufacturer: { type: String, required: true },
    price: { type: Number, required: true, min: 0, max: 10000 }, 
    quantity: { type: Number, required: true, min: 0 },
    expiryDate: { 
      type: Date, 
      required: true, 
      validate: {
        validator: function(value) {
          return value > Date.now(); 
        },
        message: 'Expiry date must be in the future',
      },
    },
    batchNumber: { 
      type: String, 
      required: true, 
      unique: true, 
      match: /^[A-Za-z0-9]+$/, // Alphanumeric validation for batch number
    },
    category: { type: String, enum: categories, required: true },
  },
  { timestamps: true }
);


module.exports = mongoose.model('Medicine', medicineSchema);
