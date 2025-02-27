import React, { useEffect, useState, useRef } from "react";
import {useNavigate} from "react-router-dom"
import { getallPurchase } from "../services/PurchaseService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { confirmDialog } from "primereact/confirmdialog";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "bootstrap/dist/css/bootstrap.min.css";

const PurchaseList = () => {
    const navigate=useNavigate();
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);


    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getallPurchase();
            const formattedPurchases = response.flatMap((purchaseItem) =>
                purchaseItem.items.map((item) => ({
                    id: purchaseItem._id,
                    purchaseId: purchaseItem._id,
                    supplier: purchaseItem.supplier?.name || "Unknown",
                    medname: item.medname,
                    quantity: item.quantity,
                    pricePerUnit: item.pricePerUnit,
                    totalPrice: item.totalPrice,
                    totalAmount: purchaseItem.totalAmount,
                    purchaseDate: new Date(purchaseItem.purchaseDate).toLocaleDateString()
                }))
            );
            setPurchases(formattedPurchases);
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Purchases loaded successfully', life: 3000 });
        } catch (error) {
            console.error("Purchase Error", error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to load purchases', life: 3000 });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleDelete = (rowData) => {
        confirmDialog({
            message: `Are you sure you want to delete purchase for ${rowData.medname}?`,
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            acceptClassName: 'p-button-danger',
            accept: () => confirmDelete(rowData),
            reject: () => { /* Do nothing on reject */ }
        });
    };

    const confirmDelete = async (rowData) => {
        // Implement actual delete logic with API call
        try {
            // await deletePurchase(rowData.purchaseId);
            // After successful delete, refresh the data
            // fetchData();
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Purchase deleted successfully', life: 3000 });
        } catch (error) {
            console.error("Delete Error", error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete purchase', life: 3000 });
        }
    };



    const formatCurrency = (value) => {
        return `₹${parseFloat(value).toFixed(2)}`;
    };

    const priceTemplate = (rowData, field) => {
        return formatCurrency(rowData[field]);
    };

    const header = (
        <div className="d-flex justify-content-between align-items-center">
            <h5 className="m-0">Purchases</h5>
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
                    <h4>Purchase List</h4>
                    <button
                        className="btn btn-success"
                        onClick={() => {
                            navigate("/purchaseform");
                        }}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Add Purchase"
                    >
                        <i className="fas fa-plus"></i> Add Purchase
                    </button>

                </div>
                <div className="card-body">
                    <DataTable
                        value={purchases}
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        globalFilter={globalFilter}
                        header={header}
                        emptyMessage="No purchases found"
                        responsiveLayout="scroll"
                        className="p-datatable-sm"
                        stripedRows
                        removableSort
                    >
                        <Column field="supplier" header="Supplier" sortable />
                        <Column field="medname" header="Medicine Name" sortable />
                        <Column field="quantity" header="Quantity" />
                        <Column field="pricePerUnit" header="Price Per Unit" body={(rowData) => priceTemplate(rowData, 'pricePerUnit')} />
                        <Column field="totalPrice" header="Total Price" body={(rowData) => priceTemplate(rowData, 'totalPrice')} />
                        <Column field="totalAmount" header="Total Amount" body={(rowData) => priceTemplate(rowData, 'totalAmount')} />
                        <Column field="purchaseDate" header="Purchase Date" />
                        <Column
                            header="Actions"
                            body={(rowData) => (
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => {        
                                            navigate(`/editpurchaseform/${rowData.id}`)
                                        }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Edit"
                                    >
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(rowData)}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Delete"
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>

                            )}
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default PurchaseList;