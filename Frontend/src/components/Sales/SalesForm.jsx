import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom'
import { getallPurchase } from '../services/PurchaseService';
import { addSales, getSalesByID, updateSales } from '../services/SalesService';

const SalesForm = ({ isSalesEdit }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const generateInvoiceNumber = () => {
        const date = new Date().toISOString().split('T')[0].replace(/-/g, '');
        const random = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
        return `INV-${date}-${random}`;
    };

    const [sale, setSale] = useState({
        customerName: '',
        customerPhone: '',
        items: [{ medicine: '', quantity: 1, pricePerUnit: 0, totalPrice: 0 }],
        totalAmount: 0,
        saleDate: new Date().toISOString().split('T')[0],
        paymentMethod: 'Cash',
        invoiceNumber: generateInvoiceNumber(),
    });

    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        fetchMedicines();
        if (isSalesEdit) fetchSaleData();
    }, []);

    const fetchMedicines = async () => {
        try {
            const response = await getallPurchase();
            const allMedicines = response.flatMap(purchase =>
                purchase.items.map(item => ({
                    name: item.medicinename,
                    pricePerUnit: item.pricePerUnit
                }))
            );

            console.log(allMedicines);

            setMedicines(allMedicines);
        } catch (error) {
            console.error('Error fetching medicines:', error);
        }
    };


    const fetchSaleData = async () => {
        try {
            const response = await getSalesByID(id);
            setSale(response);
            if (response.saleDate) {
                const formattedDate = new Date(response.saleDate).toISOString().split('T')[0];
                setSale(prev => ({ ...prev, saleDate: formattedDate }));
            }
        } catch (error) {
            console.error('Error fetching sale data:', error);
        }
    };

    const updateItem = (index, field, value) => {
        const updatedItems = [...sale.items];
        updatedItems[index][field] = value;

        if (field === 'medicine') {
            const selectedMedicine = medicines.find(m => m.name === value);
            updatedItems[index].pricePerUnit = selectedMedicine ? selectedMedicine.pricePerUnit : 0;
        }

        updatedItems[index].totalPrice = updatedItems[index].quantity * updatedItems[index].pricePerUnit;
        setSale({
            ...sale,
            items: updatedItems,
            totalAmount: updatedItems.reduce((sum, item) => sum + item.totalPrice, 0)
        });
    };


    const addItem = () => {
        setSale({ ...sale, items: [...sale.items, { medicine: '', quantity: 1, pricePerUnit: 0, totalPrice: 0 }] });
    };

    const removeItem = (index) => {
        const updatedItems = sale.items.filter((_, i) => i !== index);
        setSale({ ...sale, items: updatedItems, totalAmount: updatedItems.reduce((sum, item) => sum + item.totalPrice, 0) });
    };

    const handleChange = (e) => {
        setSale({ ...sale, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSalesEdit) {
                await updateSales(id, sale);
                alert('Sale Updated Successfully');
            } else {
                sale.invoiceNumber = generateInvoiceNumber(); // Ensure invoice is set before submitting
                await addSales(sale);
                alert('Sale Added Successfully');
            }
            navigate('/sales');
        } catch (error) {
            console.error('Error saving sale:', error);
            alert('Failed to save sale. Try again.');
        }
    };

    return (
        <div className="container py-4">
            <form onSubmit={handleSubmit} className="card p-4 shadow">
                <h3>{isSalesEdit ? 'Edit' : 'Add'} Sale</h3>

                <div className="mb-3">
                    <label className="form-label">Customer Name</label>
                    <input type="text" name="customerName" className="form-control" value={sale.customerName} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Customer Phone</label>
                    <input type="text" name="customerPhone" className="form-control" value={sale.customerPhone} onChange={handleChange} required />
                </div>

                {sale.items.map((item, index) => (
                    <div key={index} className="row g-3 align-items-center mb-3">
                        <div className="col-md-4">
                            <label className="form-label">Medicine</label>
                            <select className="form-select" value={item.medicine}
                                onChange={(e) => updateItem(index, 'medicine', e.target.value)} required>
                                <option value="" disabled>Select Medicine</option>
                                {medicines.map((m, idx) => (
                                    <option key={idx} value={m.name}>{m.name}</option>
                                ))}
                            </select>

                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Quantity</label>
                            <input type="number" className="form-control" value={item.quantity} onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))} min="1" required />
                        </div>
                        <div className="col-md-3">
                            <label className="form-label">Price Per Unit</label>
                            <input type="number" className="form-control" value={item.pricePerUnit} readOnly />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label">Total Price</label>
                            <span className="form-control bg-light">{item.totalPrice}</span>
                        </div>
                        <div className="col-md-1">
                            <label className="form-label">Action</label>
                            <button type="button" className="btn btn-danger" onClick={() => removeItem(index)} disabled={sale.items.length === 1}>Remove</button>
                        </div>
                    </div>
                ))}

                <button type="button" className="btn btn-primary mb-3" onClick={addItem}>Add Item</button>

                <div className="mb-3">
                    <label className="form-label">Sale Date</label>
                    <input type="date" name="saleDate" className="form-control" value={sale.saleDate} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Payment Method</label>
                    <select name="paymentMethod" className="form-select" value={sale.paymentMethod} onChange={handleChange} required>
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                        <option value="UPI">UPI</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Invoice Number</label>
                    <input type="text" className="form-control" value={sale.invoiceNumber} readOnly />
                </div>

                <p className="fw-bold">Total Amount: {sale.totalAmount}</p>

                <button type="submit" className="btn btn-success">{isSalesEdit ? 'Update' : 'Create'} Sale</button>
            </form>
        </div>
    );
};

export default SalesForm;
