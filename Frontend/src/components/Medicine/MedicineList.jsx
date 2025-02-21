import React, { useEffect, useState } from "react";
import { medicineList, deleteMed } from "../services/MedicineService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { zoomies } from "ldrs";

const MedicineList = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [loading, setLoading] = useState(true);

  zoomies.register();

  // Fetch Medicines on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await medicineList();
        setMedicines(data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [medicines]);

  // Sorting function for tables
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Format price to INR
  const formatPrice = (price) => {
    if (!price && price !== 0) return "N/A";
    return `₹${Number(price).toLocaleString()}`;
  };

  // Get formatted date
  const getFormattedDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return isNaN(date) ? "Invalid Date" : date.toLocaleDateString();
  };

  // Delete medicine function
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel",
      });

      if (result.isConfirmed) {
        await deleteMed(id);
        Swal.fire("Deleted!", "The medicine has been deleted.", "success");

  
        setMedicines(medicines.filter((medicine) => medicine.id !== id));
      }
    } catch (error) {
      Swal.fire("Error", "There was an error deleting the medicine.", "error");
      console.error("Error deleting medicine:", error);
    }
  };

  // Filter medicines based on search term
  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.medname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort filtered medicines based on sortConfig
  const sortedMedicines = [...filteredMedicines].sort((a, b) => {
    if (!sortConfig.key) return 0;

    if (sortConfig.key === "expiryDate") {
      return sortConfig.direction === "ascending"
        ? new Date(a[sortConfig.key]) - new Date(b[sortConfig.key])
        : new Date(b[sortConfig.key]) - new Date(a[sortConfig.key]);
    } else if (sortConfig.key === "price") {
      return sortConfig.direction === "ascending"
        ? a[sortConfig.key] - b[sortConfig.key]
        : b[sortConfig.key] - a[sortConfig.key];
    } else {
      return sortConfig.direction === "ascending"
        ? a[sortConfig.key].localeCompare(b[sortConfig.key])
        : b[sortConfig.key].localeCompare(a[sortConfig.key]);
    }
  });

  // Display loading spinner
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <l-zoomies
          size="80"
          stroke="5"
          bg-opacity="0.1"
          speed="1.4"
          color="black"
        ></l-zoomies>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4 bg-light min-vh-100">
      <div className="row g-4">
        {/* Stats Cards */}
        <div className="col-12">
          <div className="row g-4">
            <div className="col-sm-6 col-xl-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0">
                      <div className="rounded-3 p-3 bg-primary bg-opacity-10">
                        <i className="fas fa-pills text-primary fa-lg"></i>
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1 text-muted">Total Medicines</h6>
                      <h3 className="mb-0">{medicines.length}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-xl-3">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0">
                      <div className="rounded-3 p-3 bg-danger bg-opacity-10">
                        <i className="fas fa-times-circle text-danger fa-lg"></i>
                      </div>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-1 text-muted">Out of Stock</h6>
                      <h3 className="mb-0">
                        {
                          medicines.filter(
                            (m) => m.status?.toLowerCase() === "out of stock"
                          ).length
                        }
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom border-light py-3">
              <div className="row align-items-center gy-3">
                <div className="col-12 col-sm-auto">
                  <h5 className="card-title mb-0">
                    <i className="fas fa-capsules me-2 text-primary"></i>
                    Medicine Inventory
                  </h5>
                </div>
                <div className="col-12 col-sm">
                  <div className="input-group">
                    <span className="input-group-text border-end-0 bg-transparent">
                      <i className="fas fa-search text-muted"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="Search medicines..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-sm-auto">
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => navigate("/addmedicine")}
                  >
                    <i className="fas fa-plus me-2"></i>Add Medicine
                  </button>
                </div>
              </div>
            </div>

            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      {[
                        { label: "Name", key: "medname" },
                        { label: "Category", key: "category" },
                        { label: "Stock", key: "minStockLevel" },
                        { label: "Price", key: "price" },
                        { label: "Manufacturer", key: "manufacturer" },
                        { label: "Batch", key: "batchNumber" },
                        { label: "Quantity", key: "quantity" },
                        { label: "Expiry Date", key: "expiryDate" },
                      ].map(({ label, key }) => (
                        <th
                          key={key}
                          onClick={() => requestSort(key)}
                          className="text-nowrap border-0 px-4 py-3"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="d-flex align-items-center">
                            <span>{label}</span>
                            <i
                              className={`fas fa-sort ms-2 text-muted ${
                                sortConfig.key === key ? "text-dark" : ""
                              }`}
                            ></i>
                          </div>
                        </th>
                      ))}
                      <th className="text-end border-0 px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedMedicines.map((medicine) => (
                      <tr key={medicine.id}>
                        <td className="px-4">{medicine.medname || "N/A"}</td>
                        <td className="px-4">
                          {medicine.category ? (
                            <span className="badge rounded-pill bg-primary bg-opacity-10 text-primary px-3 py-2">
                              {medicine.category}
                            </span>
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className="px-4">
                          {medicine.minStockLevel ?? "N/A"}
                        </td>
                        <td className="px-4">{formatPrice(medicine.price)}</td>
                        <td className="px-4">
                          {medicine.manufacturer || "N/A"}
                        </td>
                        <td className="px-4">
                          {medicine.batchNumber || "N/A"}
                        </td>
                        
                        <td className="px-4">{medicine.quantity || ""}</td>
                        <td className="px-4">
                          {getFormattedDate(medicine.expiryDate)}
                        </td>

                        <td className="text-end px-4">
                          <div className="btn-group">
                            <button
                              className="btn btn-light btn-sm"
                              title="Edit"
                              onClick={()=>{
                                navigate(`/updatemed/${medicine._id}`)
                              }}
                            >
                              <i className="fas fa-edit text-primary"></i>
                            </button>
                            <button
                              className="btn btn-light btn-sm"
                              title="View Details"
                            >
                              <i className="fas fa-eye text-info"></i>
                            </button>
                            <button
                              className="btn btn-light btn-sm"
                              title="Delete"
                              onClick={() =>{ 
                                console.log(medicine._id);
                                
                                handleDelete(medicine._id)}}
                            >
                              <i className="fas fa-trash text-danger"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineList;
