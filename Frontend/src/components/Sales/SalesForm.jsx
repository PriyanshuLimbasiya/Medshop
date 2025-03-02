import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getallPurchase } from '../services/PurchaseService';

import 'bootstrap/dist/css/bootstrap.min.css';
import { addSales, getSalesByID, updateSales } from '../services/SalesService';

const SalesForm = ({ isEdit }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [sales, setSales] = useState({
        customerName: '',
        customerPhone: '',
        items: [],
        totalAmount: 0,
        saleDate: new Date().toISOString().split('T')[0],
        paymentMethod: 'Cash',
        invoiceNumber: generateInvoiceNumber(), // Auto-generate invoice number
    });

    const [purchases, setPurchases] = useState([]);

    // Function to generate a random invoice number
    function generateInvoiceNumber() {
        return 'INV-' + Math.floor(100000 + Math.random() * 900000);
    }

    // Fetch available medicines
    const fetchPurchases = async () => {
        try {
            const response = await getallPurchase();
            setPurchases(response);
        } catch (error) {
            console.error('Error fetching purchases:', error);
        }
    };

    // Fetch existing sales data if editing
    const fetchSalesData = async () => {
        if (isEdit) {
            try {
                const response = await getSalesByID(id);
                setSales(response);
            } catch (error) {
                console.error('Error fetching sales data:', error);
            }
        }
    };

    // Handle changes in form inputs
    const handleChange = (e) => {
        setSales({ ...sales, [e.target.name]: e.target.value });
    };

    // Handle adding a medicine to the sales list
    const addMedicine = (medicineId) => {
        const selectedMedicine = purchases.find(m => m._id === medicineId);
        if (selectedMedicine) {
            const newItem = {
                medicine: medicineId,
                medicinename: selectedMedicine.medicinename,
                quantity: 1,
                pricePerUnit: selectedMedicine.pricePerUnit || 0,
                totalPrice: selectedMedicine.pricePerUnit || 0,
            };
            const updatedItems = [...sales.items, newItem];
            setSales({
                ...sales,
                items: updatedItems,
                totalAmount: updatedItems.reduce((sum, item) => sum + item.totalPrice, 0),
            });
        }
    };

    // Handle quantity change for items
    const updateQuantity = (index, value) => {
        const updatedItems = [...sales.items];
        updatedItems[index].quantity = parseInt(value, 10) || 1;
        updatedItems[index].totalPrice = updatedItems[index].quantity * updatedItems[index].pricePerUnit;
        setSales({
            ...sales,
            items: updatedItems,
            totalAmount: updatedItems.reduce((sum, item) => sum + item.totalPrice, 0),
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await updateSales(id, sales);
                alert('Sales record updated successfully!');
            } else {
                await addSales(sales);
                alert('Sales record added successfully!');
            }
            navigate('/sales');
        } catch (error) {
            console.error('Error saving sales:', error);
            alert('Failed to save sales record. Please try again.');
        }
    };

    useEffect(() => {
        fetchPurchases();
        if (isEdit) fetchSalesData();
    }, []);

    return (
        <div className="container py-4">
            <form onSubmit={handleSubmit} className="card p-4 shadow">
                <h3 className="text-center">{isEdit ? 'Edit' : 'Create'} Sales</h3>

                <div className="mb-3">
                    <label className="form-label">Customer Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="customerName"
                        value={sales.customerName}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Customer Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        name="customerPhone"
                        value={sales.customerPhone}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Select Medicine</label>
                    <select className="form-select" onChange={(e) => addMedicine(e.target.value)}>
                        <option value="">-- Select Medicine --</option>
                        {purchases.map(p => (
                            <option key={p._id} value={p._id}>{p.medicinename}</option>
                        ))}
                    </select>
                </div>

                {sales.items.length > 0 && (
                    <div className="mb-3">
                        <label className="form-label">Selected Medicines</label>
                        <ul className="list-group">
                            {sales.items.map((item, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    {item.medicinename} - ₹{item.pricePerUnit} per unit
                                    <input
                                        type="number"
                                        className="form-control w-25"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(index, e.target.value)}
                                    />
                                    <span className="badge bg-success">₹{item.totalPrice}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="mb-3">
                    <label className="form-label">Total Amount</label>
                    <input type="text" className="form-control" value={`₹${sales.totalAmount}`} disabled />
                </div>

                <div className="mb-3">
                    <label className="form-label">Sale Date</label>
                    <input
                        type="date"
                        className="form-control"
                        name="saleDate"
                        value={sales.saleDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Payment Method</label>
                    <select name="paymentMethod" className="form-select" value={sales.paymentMethod} onChange={handleChange} required>
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                        <option value="UPI">UPI</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Invoice Number</label>
                    <input type="text" className="form-control" value={sales.invoiceNumber} disabled />
                </div>

                <button type="submit" className="btn btn-success">{isEdit ? 'Update' : 'Create'} Sale</button>
            </form>
        </div>
    );
};

export default SalesForm;
