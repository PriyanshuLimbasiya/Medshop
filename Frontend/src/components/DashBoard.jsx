import React from "react";

const DashBoard = () => {
  const stats = [
    {
      title: "Total Inventory",
      value: "2,543",
      icon: "fas fa-pills",
      bgColor: "bg-primary text-white",
    },
    {
      title: "Today's Sales",
      value: "₹12,845",
      icon: "fas fa-cash-register",
      bgColor: "bg-success text-white",
    },
    {
      title: "Low Stock Items",
      value: "15",
      icon: "fas fa-exclamation-triangle",
      bgColor: "bg-danger text-white",
    },
    {
      title: "Suppliers",
      value: "24",
      icon: "fas fa-truck",
      bgColor: "bg-info text-white",
    },
  ];

  const lowStockMedicines = [
    {
      name: "Paracetamol 500mg",
      stock: 20,
      reorderPoint: 50,
      supplier: "ABC Pharma",
    },
    {
      name: "Amoxicillin 250mg",
      stock: 15,
      reorderPoint: 40,
      supplier: "XYZ Medical",
    },
    {
      name: "Omeprazole 20mg",
      stock: 10,
      reorderPoint: 30,
      supplier: "MedSupply Inc",
    },
  ];

  const recentTransactions = [
    {
      id: "#INV001",
      time: "10:30 AM",
      amount: "₹845",
      items: 3,
      status: "Completed",
    },
    {
      id: "#INV002",
      time: "11:45 AM",
      amount: "₹1,290",
      items: 5,
      status: "Completed",
    },
    {
      id: "#INV003",
      time: "12:15 PM",
      amount: "₹560",
      items: 2,
      status: "Processing",
    },
  ];

  return (
    <div className="container-fluid p-0">
      <div className="bg-light min-vh-100">

        
        <div className="container-fluid px-3 px-lg-4 py-3 py-lg-4">
          
          <div className="row g-3 mb-4">
            {stats.map((stat, index) => (
              <div key={index} className="col-12 col-sm-6 col-lg-3">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body d-flex align-items-center p-3">
                    <div className={`p-3 rounded-3 me-3 ${stat.bgColor}`}>
                      <i className={`${stat.icon} fa-lg`}></i>
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">{stat.title}</h6>
                      <h3 className="mb-0 fw-bold">{stat.value}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

      
          <div className="row g-3">
            
            <div className="col-12 col-xl-6">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-4">Low Stock Alerts</h5>
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Medicine</th>
                          <th>Current Stock</th>
                          <th>Reorder Point</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lowStockMedicines.map((med, index) => (
                          <tr key={index}>
                            <td className="fw-medium">{med.name}</td>
                            <td>
                              <span className="badge bg-danger">
                                {med.stock} units
                              </span>
                            </td>
                            <td>{med.reorderPoint} units</td>
                            <td>
                              <button className="btn btn-outline-primary btn-sm">
                                Order Now
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="col-12 col-xl-6">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-4">Recent Transactions</h5>
                  <div className="d-flex flex-column gap-3">
                    {recentTransactions.map((trans, index) => (
                      <div key={index} className="p-3 bg-light rounded-3">
                        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center">
                          <div className="mb-2 mb-sm-0">
                            <h6 className="mb-1">{trans.id}</h6>
                            <small className="text-muted">
                              <i className="fas fa-clock me-1"></i>
                              {trans.time} • {trans.items} items
                            </small>
                          </div>
                          <div className="text-sm-end">
                            <h6 className="mb-1 text-primary">
                              {trans.amount}
                            </h6>
                            <span className="badge bg-success">
                              {trans.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

         
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-4">Quick Actions</h5>
                  <div className="row g-3">
                   
                    <div className="col-6 col-md-3">
                      <button className="btn btn-light w-100 h-100 p-3 d-flex flex-column align-items-center">
                        <i className="fas fa-plus-circle fa-2x mb-2 text-primary"></i>
                        <span className="text-center">Purchase Medicine</span>
                      </button>
                    </div>
                    <div className="col-6 col-md-3">
                      <button className="btn btn-light w-100 h-100 p-3 d-flex flex-column align-items-center">
                        <i className="fas fa-file-invoice fa-2x mb-2 text-primary"></i>
                        <span className="text-center">Generate Invoice</span>
                      </button>
                    </div>
                    <div className="col-6 col-md-3">
                      <button className="btn btn-light w-100 h-100 p-3 d-flex flex-column align-items-center">
                        <i className="fas fa-chart-bar fa-2x mb-2 text-primary"></i>
                        <span className="text-center">Sales Report</span>
                      </button>
                    </div>
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
