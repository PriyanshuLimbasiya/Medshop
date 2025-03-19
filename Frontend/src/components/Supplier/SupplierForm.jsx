import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addSupplier, getSupplierByID, updateSupplier } from '../services/SupplierService';
import { useNavigate, useParams } from 'react-router-dom';

const SupplierForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({
    name: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    if (isEdit) {
      fetchSupplierData();
    }
  }, []);

  const fetchSupplierData = async () => {
    try {
      const response = await getSupplierByID(id);
      setSupplier(response);
    } catch (error) {
      console.error("Error fetching supplier data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await updateSupplier(id, supplier);
        alert("Supplier details updated successfully");
      } else {
        await addSupplier(supplier);
        alert("Supplier added successfully");
      }
      navigate("/suppliers");
    } catch (error) {
      console.error("Error saving supplier:", error);
      alert("Failed to save supplier details");
    }
  };

  return (
    <div className="container py-4">
      <form onSubmit={handleSubmit} className="card p-4 shadow">
        <h4>{isEdit ? "Edit Supplier" : "Add Supplier"}</h4>
        <div className="mb-3">
          <label className="form-label">Supplier Name</label>
          <input type="text" className="form-control" name="name" value={supplier.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Contact Person</label>
          <input type="text" className="form-control" name="contactPerson" value={supplier.contactPerson} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input type="tel" className="form-control" name="phone" value={supplier.phone} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={supplier.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea className="form-control" name="address" value={supplier.address} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">{isEdit ? "Update" : "Create"} Supplier</button>
      </form>
    </div>
  );
};

export default SupplierForm;
