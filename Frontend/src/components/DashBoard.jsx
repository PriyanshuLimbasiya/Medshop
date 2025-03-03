import React, { useEffect, useState } from "react";
import { medicineList } from "./services/MedicineService";
import { getAllSupplier } from "./services/SupplierService";
import { useNavigate } from "react-router-dom";
import { getAllSales } from "./services/SalesService";

const DashBoard = () => {
  const navigate = useNavigate();
  const [length, setLength] = useState({
    medicineLength: 0,
    supplierLength: 0
  });
  const [lowstocks, setLowStocks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [todaySales, setTodaySales] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const response = await getAllSales();
      setTransactions(response);

      const today = new Date().toISOString().split('T')[0];
      const todayTransactions = response.filter(
        transaction => new Date(transaction.saleDate).toISOString().split('T')[0] === today
      );

      const totalSalesToday = todayTransactions.reduce(
        (total, transaction) => total + transaction.totalAmount, 0
      );

      setTodaySales(totalSalesToday);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  }

  const fetchSupplier = async () => {
    try {
      const supplier = await getAllSupplier();
      setLength(prev => ({ ...prev, supplierLength: supplier.length }));
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  }

  const fetchInventory = async () => {
    try {
      const medicine = await medicineList();
      setLength(prev => ({ ...prev, medicineLength: medicine.length }));

      const lowStockItems = medicine.filter(m => m.quantity <= 20);
      setLowStocks(lowStockItems);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchInventory(),
        fetchSupplier(),
        fetchTransactions()
      ]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const stats = [
    {
      title: "Total Inventory",
      value: length.medicineLength,
      icon: "fas fa-pills",
      bgColor: "bg-primary text-white",
      gradient: "linear-gradient(135deg, #3a8eff 0%, #1565C0 100%)"
    },
    {
      title: "Today's Sales",
      value: `₹${todaySales.toLocaleString()}`,
      icon: "fas fa-cash-register",
      bgColor: "bg-success text-white",
      gradient: "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)"
    },
    {
      title: "Low Stock Items",
      value: lowstocks.length,
      icon: "fas fa-exclamation-triangle",
      bgColor: "bg-danger text-white",
      gradient: "linear-gradient(135deg, #FF5252 0%, #D32F2F 100%)"
    },
    {
      title: "Suppliers",
      value: length.supplierLength,
      icon: "fas fa-truck",
      bgColor: "bg-info text-white",
      gradient: "linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)"
    },
  ];

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.saleDate) - new Date(a.saleDate))
    .slice(0, 3);

  if (loading) {
    return (
      <div className="container-fluid p-0">
        <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading dashboard data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0">
      <div className="bg-light min-vh-100">
        <div className="container-fluid px-3 px-lg-4 py-4">
          <h4 className="mb-4 fw-bold text-dark">Pharmacy Dashboard</h4>

          <div className="row g-3 mb-4">
            {stats.map((stat, index) => (
              <div key={index} className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100 overflow-hidden">
                  <div className="card-body p-0">
                    <div
                      className="p-3 d-flex justify-content-between align-items-center"
                      style={{
                        background: stat.gradient
                      }}
                    >
                      <div>
                        <h6 className="text-white mb-0">{stat.title}</h6>
                        <h3 className="text-white mb-0 fw-bold">{stat.value}</h3>
                      </div>
                      <div className="p-3 rounded-circle bg-white bg-opacity-25">
                        <i className={`${stat.icon} fa-lg text-white`}></i>
                      </div>
                    </div>
                    <div className="p-3 bg-white">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-chart-line text-success me-2"></i>
                        <small className="text-muted">Updated just now</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="row g-3">
            <div className="col-12 col-xl-6">
              <div className="card border-0 shadow-sm rounded-4">
                {/* Card Header */}
                <div className="card-header bg-white border-0 py-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0 fw-bold text-primary">Low Stock Alerts</h5>
                    <button
                      className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2 px-3 py-2 rounded-3 shadow-sm"
                      onClick={() => navigate("/addmedicine")}
                    >
                      <i className="fas fa-plus"></i>
                      <span>Order Medicines</span>
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th className="ps-3">Medicine</th>
                          <th>Current Stock</th>
                          <th>Reorder Point</th>
                          <th className="pe-3 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lowstocks.length > 0 ? (
                          lowstocks.map((med, index) => (
                            <tr key={index}>
                              <td className="fw-medium ps-3">{med.medname}</td>
                              <td>
                                <span className="badge bg-danger rounded-pill px-3 py-2">
                                  {med.quantity} units
                                </span>
                              </td>
                              <td>50 units</td>
                              <td className="pe-3 text-center">
                                {med.quantity <= 10 ? (
                                  <span className="badge bg-danger px-3 py-2 rounded-3">Critical</span>
                                ) : (
                                  <span className="badge bg-warning text-dark px-3 py-2 rounded-3">Low</span>
                                )}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4" className="text-center py-5">
                              <i className="fas fa-check-circle text-success fa-3x mb-3"></i>
                              <p className="mb-0 text-muted fw-semibold">All inventory levels are good</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>


            <div className="col-12 col-xl-6">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-0 py-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0 fw-bold">Recent Transactions</h5>
                    <button className="btn btn-sm btn-outline-primary" onClick={() => navigate("/saleslist")}>
                      <i className="fas fa-list me-1"></i> View All
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-column gap-3">
                    {recentTransactions.length > 0 ? (
                      recentTransactions.map((trans, index) => (
                        <div key={index} className="bg-light rounded-3 overflow-hidden border">
                          <div className="p-3">
                            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center">
                              <div className="mb-2 mb-sm-0 d-flex align-items-center">
                                <div className="rounded-circle bg-primary bg-opacity-10 p-2 me-3">
                                  <i className="fas fa-receipt text-primary"></i>
                                </div>
                                <div>
                                  <h6 className="mb-0">{trans.invoiceNumber || `#${trans._id.substring(0, 6)}`}</h6>
                                  <small className="text-muted d-flex align-items-center">
                                    <i className="fas fa-calendar-alt me-1"></i>
                                    {formatDate(trans.saleDate)} &nbsp;
                                    <i className="fas fa-clock ms-2 me-1"></i>
                                    {formatTime(trans.saleDate)} &nbsp;•&nbsp;
                                    <span className="ms-1">{trans.items.length} items</span>
                                  </small>
                                </div>
                              </div>
                              <div className="text-sm-end">
                                <h6 className="mb-1 fw-bold text-primary">
                                  ₹{trans.totalAmount.toLocaleString()}
                                </h6>
                                <span className={`badge ${trans.paymentMethod === "Cash" ? "bg-success" : "bg-info"} px-3 py-2`}>
                                  <i className={`fas ${trans.paymentMethod === "Cash" ? "fa-money-bill-wave" : "fa-credit-card"} me-1`}></i>
                                  {trans.paymentMethod || "Completed"}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="px-3 py-2 border-top bg-white">
                            <small className="text-muted">
                              <span className="fw-medium">Customer:</span> {trans.customerName} ({trans.customerPhone})
                            </small>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center p-4">
                        <i className="fas fa-receipt text-muted fa-2x mb-2"></i>
                        <p className="mb-0">No recent transactions</p>
                        <button
                          className="btn btn-sm btn-primary mt-3"
                          onClick={() => navigate("/addSale")}
                        >
                          Create New Sale
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;