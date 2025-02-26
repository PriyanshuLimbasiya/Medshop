import React, { useEffect, useState, useRef } from "react";
import { getallPurchase } from "../services/PurchaseService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputText } from "primereact/inputtext";
import { confirmDialog } from "primereact/confirmdialog";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "bootstrap/dist/css/bootstrap.min.css";

const PurchaseList = () => {
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
                    purchaseId: purchaseItem._id, // Keep original ID for reference
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

    const handleEdit = (rowData) => {
        // Implement navigation to edit page with ID
        console.log("Edit purchase:", rowData);
        // Example: navigate(`/purchases/edit/${rowData.purchaseId}`);
    };

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

    const handleAddPurchase = () => {
        // Navigate to create page
        console.log("Add Purchase Clicked");
        // Example: navigate('/purchases/create');
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
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    placeholder="Search..."
                    onInput={(e) => setGlobalFilter(e.target.value)}
                />
            </span>
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
                    <Button
                        label="Add Purchase"
                        icon="pi pi-plus"
                        className="p-button-success"
                        onClick={handleAddPurchase}
                    />
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
                    >
                        <Column field="supplier" header="Supplier" sortable filter filterPlaceholder="Search by supplier" />
                        <Column field="medname" header="Medicine Name" sortable filter filterPlaceholder="Search by medicine" />
                        <Column field="quantity" header="Quantity" sortable />
                        <Column field="pricePerUnit" header="Price Per Unit" body={(rowData) => priceTemplate(rowData, 'pricePerUnit')} sortable />
                        <Column field="totalPrice" header="Total Price" body={(rowData) => priceTemplate(rowData, 'totalPrice')} sortable />
                        <Column field="totalAmount" header="Total Amount" body={(rowData) => priceTemplate(rowData, 'totalAmount')} sortable />
                        <Column field="purchaseDate" header="Purchase Date" sortable />
                        <Column
                            header="Actions"
                            body={(rowData) => (
                                <div className="d-flex gap-2">
                                    <Button
                                        icon="pi pi-pencil"
                                        className="p-button-warning p-button-sm"
                                        onClick={() => handleEdit(rowData)}
                                        tooltip="Edit"
                                        tooltipOptions={{ position: 'top' }}
                                    />
                                    <Button
                                        icon="pi pi-trash"
                                        className="p-button-danger p-button-sm"
                                        onClick={() => handleDelete(rowData)}
                                        tooltip="Delete"
                                        tooltipOptions={{ position: 'top' }}
                                    />
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