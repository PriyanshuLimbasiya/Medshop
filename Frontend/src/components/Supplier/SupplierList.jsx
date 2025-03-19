import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { deleteSupplier, getAllSuppliers } from "../services/SupplierService";

const SupplierList = () => {
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getAllSuppliers();
            setSuppliers(response);
            toast.current?.show({ severity: "success", summary: "Success", detail: "Suppliers loaded successfully", life: 3000 });
        } catch (error) {
            console.error("Error fetching suppliers", error);
            toast.current?.show({ severity: "error", summary: "Error", detail: "Failed to load suppliers", life: 3000 });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (id) => {
        confirmDialog({
            message: "Are you sure you want to delete this supplier?",
            header: "Confirm Delete",
            icon: "pi pi-exclamation-triangle",
            acceptClassName: "p-button-danger",
            accept: () => confirmDelete(id),
            reject: () => { }
        });
    };

    const confirmDelete = async (id) => {
        try {
            await deleteSupplier(id);
            toast.current?.show({ severity: "success", summary: "Success", detail: "Supplier deleted successfully", life: 3000 });
            fetchData();
        } catch (error) {
            console.error("Error deleting supplier", error);
            toast.current?.show({ severity: "error", summary: "Error", detail: "Failed to delete supplier", life: 3000 });
        }
    };

    const header = (
        <div className="d-flex justify-content-between align-items-center">
            <h5 className="m-0">Suppliers</h5>
            <div className="input-group">
                <span className="input-group-text">
                    <i className="fas fa-search"></i>
                </span>
                <input
                    type="search"
                    className="form-control form-control-sm"
                    placeholder="Search..."
                    onInput={(e) => setGlobalFilter(e.target.value)}
                />
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
                <ProgressSpinner />
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <Toast ref={toast} />

            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h4>Supplier List</h4>
                    <button className="btn btn-success" onClick={() => navigate("/supplierform")}>
                        <i className="fas fa-plus"></i> Add Supplier
                    </button>
                </div>
                <div className="card-body">
                    <DataTable
                        value={suppliers}
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        globalFilter={globalFilter}
                        header={header}
                        emptyMessage="No suppliers found"
                        responsiveLayout="scroll"
                        className="p-datatable-sm"
                        stripedRows
                        removableSort
                    >
                        <Column field="name" header="Supplier Name" sortable />
                        <Column field="contactPerson" header="Contact Person" sortable />
                        <Column field="phone" header="Phone" />
                        <Column field="email" header="Email" />
                        <Column field="address" header="Address" />
                        <Column
                            header="Actions"
                            body={(rowData) => (
                                <div className="d-flex gap-2">
                                    <button className="btn btn-warning btn-sm" onClick={() => navigate(`/editsupplierform/${rowData._id}`)}>
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(rowData._id)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            )}
                        />
                    </DataTable>
                </div>
            </div>
            <ConfirmDialog />
        </div>
    );
};

export default SupplierList;