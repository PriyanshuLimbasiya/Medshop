import React from 'react';

const DashBoard = () => {
    const stats = [
        { title: 'Total Inventory', value: '2,543', icon: 'fas fa-pills', bgColor: 'bg-primary' },
        { title: 'Today\'s Sales', value: '₹12,845', icon: 'fas fa-cash-register', bgColor: 'bg-success' },
        { title: 'Low Stock Items', value: '15', icon: 'fas fa-exclamation-triangle', bgColor: 'bg-danger' },
        { title: 'Suppliers', value: '24', icon: 'fas fa-truck', bgColor: 'bg-info' }
    ];

    const lowStockMedicines = [
        { name: 'Paracetamol 500mg', stock: 20, reorderPoint: 50, supplier: 'ABC Pharma' },
        { name: 'Amoxicillin 250mg', stock: 15, reorderPoint: 40, supplier: 'XYZ Medical' },
        { name: 'Omeprazole 20mg', stock: 10, reorderPoint: 30, supplier: 'MedSupply Inc' }
    ];

    const recentTransactions = [
        { id: '#INV001', time: '10:30 AM', amount: '₹845', items: 3, status: 'Completed' },
        { id: '#INV002', time: '11:45 AM', amount: '₹1,290', items: 5, status: 'Completed' },
        { id: '#INV003', time: '12:15 PM', amount: '₹560', items: 2, status: 'Processing' }
    ];

    return (
        <div className='container-fluid'>
<div className="bg-light min-vh-100">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                <div className="container-fluid">
                    <a className="navbar-brand d-flex align-items-center" href="#">
                        <i className="fas fa-mortar-pestle text-primary me-2"></i>
                        <span className="fw-bold text-primary">MediCare Shop</span>
                    </a>
                    <div className="d-flex align-items-center">
                        <div className="input-group me-3">
                            <span className="input-group-text bg-white border-end-0">
                                <i className="fas fa-search text-muted"></i>
                            </span>
                            <input type="text" className="form-control border-start-0" placeholder="Search medicines..." />
                        </div>
                        <div className="d-flex align-items-center">
                            <button className="btn btn-link text-muted me-3" title="Notifications">
                                <i className="fas fa-bell fa-lg"></i>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    3
                                </span>
                            </button>
                            <button className="btn btn-primary">
                                <i className="fas fa-plus me-2"></i>New Sale
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="container-fluid py-4">
                {/* Stats Row */}
                <div className="row g-4 mb-4">
                    {stats.map((stat, index) => (
                        <div key={index} className="col-md-6 col-lg-3">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <div className="d-flex align-items-center">
                                        <div className={`${stat.bgColor} p-3 rounded-3 text-white me-3`}>
                                            <i className={`${stat.icon} fa-lg`}></i>
                                        </div>
                                        <div>
                                            <h6 className="mb-1 text-muted">{stat.title}</h6>
                                            <h3 className="mb-0 fw-bold">{stat.value}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Two Column Layout */}
                <div className="row g-4">
                    {/* Low Stock Alerts */}
                    <div className="col-lg-6">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h5 className="card-title mb-0">Low Stock Alerts</h5>
                                    <button className="btn btn-outline-primary btn-sm">
                                        <i className="fas fa-download me-2"></i>Export
                                    </button>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
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
                                                    <td>{med.name}</td>
                                                    <td>
                                                        <span className="badge bg-danger">{med.stock} units</span>
                                                    </td>
                                                    <td>{med.reorderPoint} units</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-outline-primary">
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

                    {/* Recent Transactions */}
                    <div className="col-lg-6">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h5 className="card-title mb-0">Recent Transactions</h5>
                                    <button className="btn btn-outline-primary btn-sm">View All</button>
                                </div>
                                <div className="list-group">
                                    {recentTransactions.map((trans, index) => (
                                        <div key={index} className="list-group-item border-0 bg-light rounded-3 mb-2">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h6 className="mb-1">{trans.id}</h6>
                                                    <small className="text-muted">
                                                        <i className="fas fa-clock me-2"></i>
                                                        {trans.time} • {trans.items} items
                                                    </small>
                                                </div>
                                                <div className="text-end">
                                                    <h6 className="mb-1 text-primary">{trans.amount}</h6>
                                                    <span className="badge bg-success">{trans.status}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="col-12">
                        <div className="card border-0 shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title mb-4">Quick Actions</h5>
                                <div className="row g-3">
                                    <div className="col-md-3">
                                        <button className="btn btn-light w-100 p-4 d-flex flex-column align-items-center">
                                            <i className="fas fa-plus-circle fa-2x mb-2 text-primary"></i>
                                            Add New Medicine
                                        </button>
                                    </div>
                                    <div className="col-md-3">
                                        <button className="btn btn-light w-100 p-4 d-flex flex-column align-items-center">
                                            <i className="fas fa-file-invoice fa-2x mb-2 text-primary"></i>
                                            Generate Invoice
                                        </button>
                                    </div>
                                    <div className="col-md-3">
                                        <button className="btn btn-light w-100 p-4 d-flex flex-column align-items-center">
                                            <i className="fas fa-truck fa-2x mb-2 text-primary"></i>
                                            Place Order
                                        </button>
                                    </div>
                                    <div className="col-md-3">
                                        <button className="btn btn-light w-100 p-4 d-flex flex-column align-items-center">
                                            <i className="fas fa-chart-bar fa-2x mb-2 text-primary"></i>
                                            Sales Report
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