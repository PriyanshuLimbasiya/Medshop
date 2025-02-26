import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { MeterGroup } from 'primereact/metergroup';
import { medicineList, deleteMed } from "../services/MedicineService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

const MedicineList = () => {
    const navigate = useNavigate();
    const [medicines, setMedicines] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const values = [{ label: 'Total Medicine', value: medicines.length }]
    const categories = ['Antibiotic', 'Painkiller', 'Vitamin', 'Antiseptic', 'Other'];
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await medicineList();
                setMedicines(data);
            } catch (error) {
                console.error("Error fetching medicines:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [medicines]);



    const handleDelete = async (id) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "This action cannot be undone!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, cancel",
            });

            if (result.isConfirmed) {
                await deleteMed(id);
                Swal.fire("Deleted!", "The medicine has been deleted.", "success");
                setMedicines(medicines.filter((medicine) => medicine.id !== id));
            }
        } catch (error) {
            Swal.fire("Error", "There was an error deleting the medicine.", "error");
            console.error("Error deleting medicine:", error);
        }
    };

    const getFormattedDate = (dateString) => {
        if (!dateString) return "N/A";
        const date = new Date(dateString);
        return isNaN(date) ? "Invalid Date" : date.toLocaleDateString();
    };

    return (
        <div className="p-4 bg-light min-vh-100">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Medicine Inventory</h5>
                    <button className="btn btn-primary" onClick={() => navigate("/addmedicine")}>
                        <i className="fas fa-plus"></i> Add Medicine
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
                        paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}
                        dataKey="id"
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
                                    <button className="btn btn-outline-primary" onClick={() => navigate(`/updatemed/${rowData._id}`)}>
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="btn btn-outline-danger" onClick={() => handleDelete(rowData._id)}>
                                        <i className="fas fa-trash"></i>
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
