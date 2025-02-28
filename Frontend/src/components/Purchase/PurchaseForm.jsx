import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './purchaseform.css';
import { getAllSupplier } from '../services/SupplierService';
import { addPurchase } from '../services/PurchaseService';
import { useNavigate } from 'react-router-dom';

const PurchaseForm = ({ isPurchaseEdit }) => {
  const navigate=useNavigate();
  const [purchase, setPurchase] = useState({
    supplier:"",
    items: [{ medicinename: '', quantity: 0, pricePerUnit: 0, totalPrice: 0 }],
    totalAmount: 0,
    purchaseDate: new Date().toISOString().split('T')[0],
    paymentStatus: "Pending",
  });

  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await getAllSupplier();
      setSuppliers(response);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const updateItem = (index, field, value) => {
    const updatedItems = [...purchase.items];
    updatedItems[index][field] = value;
    updatedItems[index].totalPrice = updatedItems[index].quantity * updatedItems[index].pricePerUnit;
    setPurchase({ ...purchase, items: updatedItems, totalAmount: updatedItems.reduce((sum, item) => sum + item.totalPrice, 0) });
  };

  const addItem = () => {
    setPurchase({ ...purchase, items: [...purchase.items, { medicinename: '', quantity: 0, pricePerUnit: 0, totalPrice: 0 }] });
  };

  const removeItem = (index) => {
    const updatedItems = purchase.items.filter((_, i) => i !== index);
    setPurchase({ ...purchase, items: updatedItems, totalAmount: updatedItems.reduce((sum, item) => sum + item.totalPrice, 0) });
  };

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setPurchase({ ...purchase, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {      
      await addPurchase(purchase); 
      alert("Purchase Added Successfully!");
      navigate("/purchase"); 
    } catch (error) {
      console.error("Error adding purchase:", error);
      alert("Failed to add purchase. Please try again.");
    }
  };

  return (
    <div className="container py-4">
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <div className="mb-3">
          <label className="form-label">Supplier</label>
          <select name="supplier" className="form-select" value={purchase.supplier} onChange={handleChange} required>
            <option value="" disabled>Select a supplier</option>
            {suppliers.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
          </select>
        </div>

        {purchase.items.map((item, index) => (
          <div key={index} className="row g-3 align-items-center mb-3">
            <div className="col-md-4">
              <label className="form-label">Medicine Name</label>
              <input type="text" className="form-control" placeholder='medicine name' value={item.medicinename} onChange={(e) => updateItem(index, 'medicinename', e.target.value)} required />
            </div>
            <div className="col-md-2">
              <label className="form-label">Quantity</label>
              <input type="number" className="form-control" value={item.quantity} onChange={(e) => updateItem(index, 'quantity', e.target.value)} required />
            </div>
            <div className="col-md-3">
              <label className="form-label">Price Per Unit</label>
              <input type="number" className="form-control" value={item.pricePerUnit} onChange={(e) => updateItem(index, 'pricePerUnit', e.target.value)} required />
            </div>
            <div className="col-md-2">
              <label className="form-label">Total Price</label>
              <span className="form-control bg-light">{item.totalPrice}</span>
            </div>
            <div className="col-md-1">
            <label className="form-label">Action</label>
              <button type="button" className="btn btn-danger" onClick={() => removeItem(index)} disabled={purchase.items.length === 1}>Remove</button>
            </div>
          </div>
        ))}

        <button type="button" className="btn btn-primary mb-3" onClick={addItem}>Add Item</button>
        
        <div className="mb-3">
          <label className="form-label">Purchase Date</label>
          <input type="date" name="purchaseDate" className="form-control" value={purchase.purchaseDate} onChange={handleChange} required />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Payment Status</label>
          <select name="paymentStatus" className="form-select" value={purchase.paymentStatus} onChange={handleChange} required>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        
        <p className="fw-bold">Total Amount: {purchase.totalAmount}</p>
        <button type="submit" onClick={()=>{
          
          
        }} className="btn btn-success">{isPurchaseEdit ? 'Update' : 'Create'} Purchase</button>
      </form>
    </div>
  );
};

export default PurchaseForm;
