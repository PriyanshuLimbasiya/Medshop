const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    items: [
        {
            medicine: {
                type:String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            pricePerUnit: {
                type: Number,
                required: true
            },
            totalPrice: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    saleDate: {
        type: Date,
        default: Date.now
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Card', 'UPI'],
        required: true
    },
    invoiceNumber: {
        type: String,
        unique: true,
        required: true
    }
});

module.exports = mongoose.model('Sales', salesSchema);
