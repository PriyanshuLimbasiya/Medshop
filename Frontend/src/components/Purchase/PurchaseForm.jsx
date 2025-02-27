import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './purchaseform.css'; // For custom styles
import { getallPurchase } from '../services/PurchaseService';

const PurchaseForm = ({ isPurchaseEdit = false }) => {
  const [items, setItems] = useState([
    { id: 1, name: '', quantity: '', price: '', total: 0 }
  ]);
  const [totalAmount, setTotalAmount] = useState(0);



  const calculateItemTotal = (qty, price) => {
    return (parseFloat(qty || 0) * parseFloat(price || 0)).toFixed(2);
  };


  const updateItem = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    
    if (field === 'quantity' || field === 'price') {
      updatedItems[index].total = calculateItemTotal(
        field === 'quantity' ? value : updatedItems[index].quantity,
        field === 'price' ? value : updatedItems[index].price
      );
    }
    
    setItems(updatedItems);
    

    const newTotal = updatedItems.reduce((sum, item) => 
      sum + parseFloat(item.total || 0), 0
    );
    
    setTotalAmount(newTotal.toFixed(2));
  };

  // Add new item row
  const addItem = () => {
    setItems([
      ...items, 
      { 
        id: items.length + 1, 
        name: '', 
        quantity: '', 
        price: '', 
        total: 0 
      }
    ]);
  };

  // Remove item row
  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    
    // Update total amount
    const newTotal = updatedItems.reduce((sum, item) => 
      sum + parseFloat(item.total || 0), 0
    );
    
    setTotalAmount(newTotal.toFixed(2));
  };

  return (
    <div className="container py-4">
      <div className="purchase-card">
        <div className="purchase-header">
          <h3>{isPurchaseEdit ? 'Edit Purchase' : 'New Purchase'}</h3>
          <p className="text-muted mb-0">Complete the form below to {isPurchaseEdit ? 'update' : 'create'} a purchase order</p>
        </div>

        <div className="purchase-body">
          <form>
            {/* Supplier Section */}
            <div className="form-floating mb-4">
              <select className="form-select" id="supplierSelect" required>
                <option value="" selected disabled>Select a supplier</option>
                <option value="1">MedPharm Distributors</option>
                <option value="2">Global Health Supplies</option>
                <option value="3">PharmaWholesale Inc.</option>
              </select>
              <label htmlFor="supplierSelect">Supplier</label>
            </div>

            {/* Items Section */}
            <div className="items-section">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Items</h5>
                <button 
                  type="button" 
                  className="btn btn-primary btn-sm add-item-btn"
                  onClick={addItem}
                >
                  <i className="bi bi-plus-circle me-2"></i>Add Item
                </button>
              </div>

              {/* Items List */}
              {items.map((item, index) => (
                <div key={item.id} className="item-row">
                  <div className="row g-3 align-items-end">
                    <div className="col-md-4">
                      <label htmlFor={`medicineName${index}`} className="form-label">Medicine Name</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id={`medicineName${index}`}
                        placeholder="Enter medicine name" 
                        value={item.name}
                        onChange={(e) => updateItem(index, 'name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-2">
                      <label htmlFor={`quantity${index}`} className="form-label">Quantity</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        id={`quantity${index}`}
                        placeholder="Qty" 
                        min="1" 
                        value={item.quantity}
                        onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                        required
                      />
                    </div>
                    <div className="col-md-3">
                      <label htmlFor={`price${index}`} className="form-label">Price Per Unit</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input 
                          type="number" 
                          className="form-control" 
                          id={`price${index}`}
                          placeholder="0.00" 
                          step="0.01" 
                          min="0"
                          value={item.price}
                          onChange={(e) => updateItem(index, 'price', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-2">
                      <label htmlFor={`total${index}`} className="form-label">Total</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input 
                          type="text" 
                          className="form-control bg-light" 
                          id={`total${index}`}
                          value={item.total}
                          readOnly 
                        />
                      </div>
                    </div>
                    <div className="col-md-1 text-end">
                      <button 
                        type="button" 
                        className={`btn btn-outline-danger btn-sm remove-btn ${items.length === 1 ? 'invisible' : ''}`}
                        onClick={() => removeItem(index)}
                        disabled={items.length === 1}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Card */}
            <div className="summary-card">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="fw-bold mb-0">Total Amount</h5>
                  <p className="text-muted small mb-0">{items.length} item(s)</p>
                </div>
                <div className="total-amount">${totalAmount}</div>
              </div>
            </div>

            {/* Payment Status */}
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="form-floating">
                  <select className="form-select" id="paymentStatus">
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                  <label htmlFor="paymentStatus">Payment Status</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input 
                    type="date" 
                    className="form-control" 
                    id="purchaseDate" 
                    defaultValue={new Date().toISOString().split('T')[0]}
                  />
                  <label htmlFor="purchaseDate">Purchase Date</label>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="form-actions">
              <button type="button" className="btn btn-outline-secondary">Cancel</button>
              <button type="submit" className="btn btn-success">
                {isPurchaseEdit ? 'Update' : 'Create'} Purchase
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PurchaseForm;