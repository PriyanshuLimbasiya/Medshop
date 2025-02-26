import React, { useEffect, useState } from "react";
import { addMedicine, getMedicineById, updateMed } from "../services/MedicineService";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const InventoryForm = ({ isEditMode }) => {
  const navigate = useNavigate();
  const { id } = useParams();
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


  useEffect(() => {
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
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

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
        const response = await updateMed(id, formData);
        Swal.fire("Medicine Update", "Medicine has been added.", "success");
      }
      else {
        const response = await addMedicine(formData);
        console.log(response);

        Swal.fire("Medicine Added", "Medicine has been added.", "success");
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
      minStockLevel: "",
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
            <i className="fas fa-pills text-primary fa-lg"></i> Medicine
            Inventory
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="medname" className="form-label">
                    Name
                  </label>
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

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    type="text"
                    className="form-control"
                    placeholder="Product category"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="minStockLevel" className="form-label">
                    Stock
                  </label>
                  <input
                    id="minStockLevel"
                    name="minStockLevel"
                    type="number"
                    value={formData.minStockLevel}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Minimum Stock Level"
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
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
                  <label htmlFor="manufacturer" className="form-label">
                    Manufacturer
                  </label>
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
                  <label htmlFor="batchNumber" className="form-label">
                    Batch
                  </label>
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
                  <label htmlFor="quantity" className="form-label">
                    Quantity
                  </label>
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
                  <label htmlFor="expiryDate" className="form-label">
                    Expiry Date
                  </label>
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