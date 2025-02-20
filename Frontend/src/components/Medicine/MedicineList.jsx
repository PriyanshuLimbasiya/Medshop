import React, { useEffect, useState } from 'react';
import medicineList from '../services/MedicineListService';

const MedicineList = () => {
    const [medicines, setMedicines] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    useEffect(() => {
        const fetchData = async () => {
            const data = await medicineList();
            setMedicines(data);
        };
        fetchData();
    }, []);

    const filteredMedicines = medicines.filter(medicine =>
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedMedicines = [...filteredMedicines].sort((a, b) => {
        if (!sortConfig.key) return 0;
        return sortConfig.direction === 'ascending'
            ? a[sortConfig.key].localeCompare(b[sortConfig.key])
            : b[sortConfig.key].localeCompare(a[sortConfig.key]);
    });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getStatusBadgeClass = (status) => {
        return status === "In Stock" ? "bg-success" : "bg-warning";
    };

    return (
        <div className="container-fluid">
            <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3">
                    <h5 className="card-title mb-0">Medicine Inventory</h5>
                </div>
                <div className="card-body">
                    <div className="row mb-4">
                        <div className="col-12 col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search medicines..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    {['name', 'category', 'stock', 'price', 'supplier', 'expiryDate', 'status'].map((key) => (
                                        <th key={key} onClick={() => requestSort(key)} style={{ cursor: 'pointer' }}>
                                            {key.charAt(0).toUpperCase() + key.slice(1)}
                                            <i className="fas fa-sort ms-1"></i>
                                        </th>
                                    ))}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedMedicines.map((medicine) => (
                                    <tr key={medicine.id}>
                                        <td>{medicine.name}</td>
                                        <td>{medicine.category}</td>
                                        <td>{medicine.stock}</td>
                                        <td>₹{medicine.price}</td>
                                        <td>{medicine.supplier}</td>
                                        <td>{medicine.expiryDate}</td>
                                        <td>
                                            <span className={`badge ${getStatusBadgeClass(medicine.status)}`}>
                                                {medicine.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn btn-outline-primary btn-sm mx-1">
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm mx-1">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                            <button className="btn btn-outline-info btn-sm mx-1">
                                                <i className="fas fa-eye"></i>
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
    );
};

export default MedicineList;
