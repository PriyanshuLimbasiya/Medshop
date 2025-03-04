import React, { useEffect, useState } from "react";
import { addMedicine, getMedicineById, updateMed } from "../services/MedicineService";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const InventoryForm = ({ isEditMode }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const categories = ["Antibiotic", "Painkiller", "Vitamin", "Antiseptic", "Other"];

  const [formData, setFormData] = useState({
    medname: "",
    category: "",
    minStockLevel: "",
    price: "",
    manufacturer: "",
    batchNumber: "",
    quantity: "",
    expiryDate: "",
  });


  const fetchData = async () => {
    try {
      if (isEditMode) {
        const response = await getMedicineById(id);
        setFormData(response);
        if (response.expiryDate) {
          const formattedDate = new Date(response.expiryDate).toISOString().split('T')[0];
          setFormData(prevData => ({
            ...prevData,
            expiryDate: formattedDate,
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateMed(id, formData);
        Swal.fire("Medicine Updated", "Medicine has been updated successfully.", "success");
        navigate("/medicinelist");
      } else {
        await addMedicine(formData);
        Swal.fire("Medicine Added", "Medicine has been added successfully.", "success");
        navigate("/medicinelist");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleReset = () => {
    setFormData({
      medname: "",
      category: "",
      price: "",
      manufacturer: "",
      batchNumber: "",
      quantity: "",
      expiryDate: "",
    });
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h4>
            <i className="fas fa-pills text-primary fa-lg"></i> Medicine Inventory
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="medname" className="form-label">Name</label>
                  <input
                    id="medname"
                    name="medname"
                    value={formData.medname}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Product name"
                  />
                </div>
              </div>

              {/* ✅ Category Dropdown */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="" disabled>Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Price"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="manufacturer" className="form-label">Manufacturer</label>
                  <input
                    id="manufacturer"
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Manufacturer name"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="batchNumber" className="form-label">Batch</label>
                  <input
                    id="batchNumber"
                    name="batchNumber"
                    value={formData.batchNumber}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Batch number"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="quantity" className="form-label">Quantity</label>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Quantity"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                  <input
                    id="expiryDate"
                    name="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end gap-3 pt-3">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={handleReset}
              >
                Reset
              </button>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InventoryForm;
