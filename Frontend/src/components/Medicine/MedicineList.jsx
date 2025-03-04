import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { MeterGroup } from 'primereact/metergroup';
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog"; // Import ConfirmDialog
import { deleteMed, medicineList } from "../services/MedicineService";
import { useNavigate } from "react-router-dom";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

const MedicineList = () => {
    const navigate = useNavigate();
    const [medicines, setMedicines] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);
    const values = [{ label: 'Total Medicine', value: medicines.length }];

    const fetchData = async () => {
        try {
            const data = await medicineList();
            setMedicines(data);
            toast.current.show({ 
                severity: 'success', 
                summary: 'Data Loaded', 
                detail: `Successfully loaded ${data.length} medicines`,
                life: 3000
            });
        } catch (error) {
            console.error("Error fetching medicines:", error);
            toast.current.show({ 
                severity: 'error', 
                summary: 'Loading Error', 
                detail: 'Failed to fetch medicine data',
                life: 5000
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteMed(id);
            toast.current.show({
                severity: 'success',
                summary: 'Deleted',
                detail: 'Medicine deleted successfully',
                life: 3000
            });
            fetchData();
        } catch (error) {
            console.error("Error deleting medicine:", error);
            toast.current.show({
                severity: 'error',
                summary: 'Delete Error',
                detail: 'Failed to delete medicine',
                life: 5000
            });
        }
    };

    const confirmDelete = (id) => {
        confirmDialog({
            message: 'Are you sure you want to delete this medicine?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => handleDelete(id),
            reject: () => {
                toast.current.show({
                    severity: 'info',
                    summary: 'Cancelled',
                    detail: 'Delete action cancelled',
                    life: 3000
                });
            }
        });
    };

    const getFormattedDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return isNaN(date) ? "Invalid Date" : date.toLocaleDateString();
    };

    const navigateToAdd = () => {
        navigate("/addmedicine");
    };

    return (
        <div className="p-4 bg-light min-vh-100">
            <Toast ref={toast} />
            <ConfirmDialog />
            
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Medicine Inventory</h5>
                    <button className="btn btn-primary" onClick={navigateToAdd}>
                        <i className="pi pi-plus"></i> Add Medicine
                    </button>
                </div>
                
                <MeterGroup values={values} />
                
                <div className="card-body">
                    <div className="p-inputgroup mb-3">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-search"></i>
                        </span>
                        <InputText
                            placeholder="Search medicines..."
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                        />
                    </div>

                    <DataTable
                        value={medicines}
                        paginator 
                        rows={5} 
                        rowsPerPageOptions={[5, 10, 25, 50]} 
                        tableStyle={{ minWidth: '50rem' }}
                        dataKey="_id"
                        globalFilter={globalFilter}
                        loading={loading}
                        emptyMessage="No medicines found."
                        responsiveLayout="scroll"
                    >
                        <Column field="medname" header="Name" sortable></Column>
                        <Column field="category" header="Category" sortable></Column>
                        <Column field="price" header="Price" sortable></Column>
                        <Column field="manufacturer" header="Manufacturer" sortable></Column>
                        <Column field="batchNumber" header="Batch" sortable></Column>
                        <Column field="quantity" header="Quantity" sortable></Column>
                        <Column
                            field="expiryDate"
                            header="Expiry Date"
                            sortable
                            body={(rowData) => getFormattedDate(rowData.expiryDate)}
                        ></Column>
                        <Column
                            body={(rowData) => (
                                <div className="d-flex gap-2">
                                    <button 
                                        className="btn btn-outline-primary" 
                                        onClick={() => navigate(`/updatemed/${rowData._id}`)}
                                    >
                                        <i className="pi pi-pencil"></i>
                                    </button>
                                    <button 
                                        className="btn btn-outline-danger" 
                                        onClick={() => confirmDelete(rowData._id)}
                                    >
                                        <i className="pi pi-trash"></i>
                                    </button>
                                </div>
                            )}
                            header="Actions"
                        ></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
};

export default MedicineList;