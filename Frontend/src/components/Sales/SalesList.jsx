import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { deleteSalesByID, getAllSales } from "../services/SalesService";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "bootstrap/dist/css/bootstrap.min.css";


const SalesList = () => {
    const navigate = useNavigate();
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getAllSales();
            setSales(response);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Sales loaded successfully', life: 3000 });
        } catch (error) {
            console.error("Sales Error", error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to load sales', life: 3000 });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (id) => {
        confirmDialog({
            message: `Are you sure you want to delete this sale?`,
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: () => confirmDelete(id),
        });
    };

    const confirmDelete = async (id) => {
        try {
            await deleteSalesByID(id);
            toast.current?.show({ severity: 'success', summary: 'Success', detail: 'Sale deleted successfully', life: 3000 });
            fetchData();
        } catch (error) {
            console.error("Delete Error", error);
            toast.current?.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete sale', life: 3000 });
        }
    };

    const formatCurrency = (value) => `₹${parseFloat(value).toFixed(2)}`;

    const priceTemplate = (rowData, field) => formatCurrency(rowData[field]);

    const header = (
        <div className="d-flex justify-content-between align-items-center">
            <h5 className="m-0">Sales</h5>
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
                    <h4>Sales List</h4>
                    <button
                        className="btn btn-success"
                        onClick={() => navigate("/salesform")}
                    >
                        <i className="fas fa-plus"></i> Add Sale
                    </button>
                </div>
                <div className="card-body">
                    <DataTable
                        value={sales}
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        globalFilter={globalFilter}
                        header={header}
                        emptyMessage="No sales found"
                        responsiveLayout="scroll"
                        className="p-datatable-sm"
                        stripedRows
                        removableSort
                    >
                        <Column field="customerName" header="Customer Name" sortable />
                        <Column field="customerPhone" header="Phone Number" sortable />
                        <Column field="invoiceNumber" header="Invoice" sortable />
                        <Column field="totalAmount" header="Total Amount" body={(rowData) => priceTemplate(rowData, 'totalAmount')} />
                        <Column field="saleDate" header="Sale Date" sortable />
                        <Column field="paymentMethod" header="Payment Method" sortable />
                        <Column
                            header="Actions"
                            body={(rowData) => (
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => navigate(`/editsalesform/${rowData.id}`)}
                                    >
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(rowData.id)}
                                    >
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

export default SalesList;
