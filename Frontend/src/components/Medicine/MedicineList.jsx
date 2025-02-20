import React, { useEffect, useState } from "react";
import { medicineList } from "../services/MedicineService";
import { useNavigate } from "react-router-dom";
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
  useEffect(() => {
    const fetchData = async () => {
      const data = await medicineList();
      setMedicines(data);
      setLoading(false);
      
    };
    fetchData();
  }, [setMedicines]);

  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.medname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedMedicines = [...filteredMedicines].sort((a, b) => {
    if (!sortConfig.key) return 0;
    return sortConfig.direction === "ascending"
      ? a[sortConfig.key].localeCompare(b[sortConfig.key])
      : b[sortConfig.key].localeCompare(a[sortConfig.key]);
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getStatusBadgeClass = (status) => {
    if (!status) return "bg-secondary bg-opacity-10 text-secondary";

    switch (status.toLowerCase()) {
      case "in stock":
        return "bg-success bg-opacity-10 text-success";
      case "low stock":
        return "bg-warning bg-opacity-10 text-warning";
      case "out of stock":
        return "bg-danger bg-opacity-10 text-danger";
      default:
        return "bg-secondary bg-opacity-10 text-secondary";
    }
  };

  const getFormattedDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return "Invalid Date";
    }
  };

  const formatPrice = (price) => {
    if (!price && price !== 0) return "N/A";
    return `₹${Number(price).toLocaleString()}`;
  };

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
                    onClick={() => {
                      navigate("/addmedicine");
                    }}
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
                        "name",
                        "category",
                        "stock",
                        "price",
                        "supplier",
                        "batch",
                        "quantity",
                        "expiryDate",
                        "status",
                      ].map((key) => (
                        <th
                          key={key}
                          onClick={() => requestSort(key)}
                          className="text-nowrap border-0 px-4 py-3"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="d-flex align-items-center">
                            <span>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </span>
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
                        <td className="px-4">
                          <span
                            className={`badge rounded-pill ${getStatusBadgeClass(
                              medicine.status
                            )} px-3 py-2`}
                          >
                            {medicine.status || "Unknown"}
                          </span>
                        </td>
                        <td className="text-end px-4">
                          <div className="btn-group">
                            <button
                              className="btn btn-light btn-sm"
                              title="Edit"
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
