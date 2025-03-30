import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { deleteSalesByID, getAllSales } from "../services/SalesService";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SalesList = () => {
    const navigate = useNavigate();
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useRef(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await getAllSales();
            setSales(response);
            console.log(response);

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

    const generatePDF = () => {
        const doc = new jsPDF();

        // Add title with styling
        doc.setFontSize(20);
        doc.setTextColor(40, 40, 150);
        doc.setFont("helvetica", "bold");
        doc.text("Sales Report", 105, 15, { align: "center" });

        // Add report date
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.setFont("helvetica", "normal");
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 22, { align: "center" });

        // Add company logo (if available)
        // const logoData = 'data:image/png;base64,...';
        // doc.addImage(logoData, 'PNG', 15, 10, 30, 15);

        // Add table with styling
        autoTable(doc, {
            startY: 30,
            head: [["Customer Name", "Invoice #", "Total Amount", "Sale Date", "Payment Method"]],
            body: sales.map((sale) => [
                sale.customerName,
                sale.invoiceNumber,
                `$${parseFloat(sale.totalAmount).toFixed(2)}`,
                new Date(sale.saleDate).toLocaleDateString(),
                sale.paymentMethod,
            ]),
            headStyles: {
                fillColor: [40, 40, 150],
                textColor: 255,
                fontStyle: 'bold',
                fontSize: 10
            },
            bodyStyles: {
                textColor: [40, 40, 40],
                fontSize: 9
            },
            alternateRowStyles: {
                fillColor: [240, 240, 245]
            },
            margin: { top: 30 },
            styles: {
                cellPadding: 4,
                overflow: 'linebreak',
                halign: 'center'
            },
            columnStyles: {
                0: { halign: 'left', cellWidth: 'auto' },
                1: { cellWidth: 'auto' },
                2: { halign: 'right' },
                3: { halign: 'center' },
                4: { halign: 'center' }
            },
            didDrawPage: function (data) {
                // Footer
                doc.setFontSize(8);
                doc.setTextColor(150);
                doc.text(
                    `Page ${data.pageCount}`,
                    data.settings.margin.left,
                    doc.internal.pageSize.height - 10
                );
            }
        });

        // Add summary statistics
        const totalSales = sales.reduce((sum, sale) => sum + parseFloat(sale.totalAmount), 0);
        const salesCount = sales.length;

        doc.setFontSize(12);
        doc.setTextColor(40, 40, 40);
        doc.setFont("helvetica", "bold");
        doc.text(`Total Sales: $${totalSales.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 15);
        doc.text(`Number of Transactions: ${salesCount}`, 14, doc.lastAutoTable.finalY + 25);

        doc.save(`Sales_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
    };

    const generateEachSale = (sale) => {
        const doc = new jsPDF();

        // Set document margins and initial position
        const margin = 15;
        let yPos = margin;

        // Add company header
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(40, 53, 147); // Navy blue
        doc.text("PHARMACY INVOICE", 105, yPos, { align: "center" });
        yPos += 10;

        // Add company details (replace with your actual details)
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100);
        doc.text("Sunrise Pharmacy", 105, yPos, { align: "center" });
        yPos += 5;
        doc.text("123 Medical Street, Health City - 560001", 105, yPos, { align: "center" });
        yPos += 5;
        doc.text("Phone: +91 9876543210 | GSTIN: 22ABCDE1234F1Z5", 105, yPos, { align: "center" });
        yPos += 15;

        // Add invoice title and details section
        doc.setDrawColor(200);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, 200 - margin, yPos);
        yPos += 10;

        // Left column - Invoice info
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("INVOICE #:", margin, yPos);
        doc.setFont("helvetica", "normal");
        doc.text(sale.invoiceNumber, margin + 25, yPos);

        doc.setFont("helvetica", "bold");
        doc.text("DATE:", margin, yPos + 10);
        doc.setFont("helvetica", "normal");
        doc.text(new Date(sale.saleDate).toLocaleDateString(), margin + 25, yPos + 10);
        yPos += 5;

        // Right column - Customer info
        doc.setFont("helvetica", "bold");
        doc.text("BILL TO:", 110, yPos);
        doc.setFont("helvetica", "normal");
        doc.text(sale.customerName, 110, yPos + 10);
        doc.text(`Phone: ${sale.customerPhone}`, 110, yPos + 20);
        yPos += 30;

        // Medicine items table
        autoTable(doc, {
            startY: yPos,
            head: [["#", "Medicine Name", "Batch No.", "Expiry", "Qty", "Price", "Total"]],
            body: sale.items.map((item, index) => [
                index + 1,
                item.medicine,
                item.batchNumber || 'N/A',
                item.expiryDate || 'N/A',
                item.quantity,
                `₹${parseFloat(item.price).toFixed(2)}`,
                `₹${(item.quantity * item.price).toFixed(2)}`,
            ]),
            headStyles: {
                fillColor: [40, 53, 147],
                textColor: 255,
                fontStyle: 'bold',
                fontSize: 10
            },
            bodyStyles: {
                textColor: [40, 40, 40],
                fontSize: 9
            },
            alternateRowStyles: {
                fillColor: [240, 240, 245]
            },
            columnStyles: {
                0: { cellWidth: 10, halign: 'center' },
                1: { cellWidth: 'auto', halign: 'left' },
                2: { cellWidth: 25, halign: 'center' },
                3: { cellWidth: 25, halign: 'center' },
                4: { cellWidth: 15, halign: 'center' },
                5: { cellWidth: 25, halign: 'right' },
                6: { cellWidth: 25, halign: 'right' }
            },
            styles: {
                cellPadding: 3,
                overflow: 'linebreak'
            }
        });

        // Summary section
        yPos = doc.lastAutoTable.finalY + 10;

        // Subtotal
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text("Subtotal:", 160, yPos);
        doc.setFont("helvetica", "normal");
        doc.text(`₹${parseFloat(sale.totalAmount).toFixed(2)}`, 185, yPos, { align: "right" });

        // Tax (example - modify as needed)
        yPos += 7;
        doc.setFont("helvetica", "bold");
        doc.text("GST (5%):", 160, yPos);
        doc.setFont("helvetica", "normal");
        doc.text(`₹${(parseFloat(sale.totalAmount) * 0.05).toFixed(2)}`, 185, yPos, { align: "right" });

        // Total
        yPos += 7;
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Total Amount:", 160, yPos);
        doc.text(`₹${(parseFloat(sale.totalAmount) * 1.05).toFixed(2)}`, 185, yPos, { align: "right" });
        yPos += 15;

        // Payment method
        doc.setFontSize(11);
        doc.text(`Payment Method: ${sale.paymentMethod}`, margin, yPos);

        // Terms and conditions
        yPos += 20;
        doc.setFontSize(8);
        doc.setTextColor(100);
        doc.text("Terms & Conditions:", margin, yPos);
        doc.text("- Goods once sold will not be taken back or exchanged", margin, yPos + 5);
        doc.text("- Please retain this invoice for warranty purposes", margin, yPos + 10);
        doc.text("- All disputes subject to Health City jurisdiction", margin, yPos + 15);

        // Footer
        yPos += 25;
        doc.setDrawColor(200);
        doc.setLineWidth(0.5);
        doc.line(margin, yPos, 200 - margin, yPos);
        yPos += 5;
        doc.setFontSize(8);
        doc.text("Thank you for your business!", 105, yPos, { align: "center" });
        yPos += 5;
        doc.text("For any queries, contact: support@sunrisepharmacy.com", 105, yPos, { align: "center" });

        // Save PDF with invoice number
        doc.save(`Invoice_${sale.invoiceNumber}_${new Date(sale.saleDate).toISOString().slice(0, 10)}.pdf`);
    };


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
                    <div className="d-flex gap-2">
                        <button className="btn btn-success" onClick={() => navigate("/salesform")}>
                            <i className="fas fa-plus"></i> Add Sale
                        </button>
                        <button className="btn btn-primary" onClick={generatePDF}>
                            <i className="fas fa-file-pdf"></i> Download PDF
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <DataTable
                        value={sales}
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        emptyMessage="No sales found"
                        responsiveLayout="scroll"
                        className="p-datatable-sm"
                        stripedRows
                        removableSort
                    >
                        <Column field="customerName" header="Customer Name" sortable />
                        <Column
                            header="Medicine"
                            body={(rowData) => (
                                <ul>
                                    {rowData.items.map((item, index) => (
                                        <li key={index}>{`${index + 1}. ${item.medicine}`}</li>
                                    ))}
                                </ul>
                            )}
                        />
                        <Column field="customerPhone" header="Phone Number" />
                        <Column field="invoiceNumber" header="Invoice" sortable />
                        <Column field="totalAmount" header="Total Amount" body={(rowData) => priceTemplate(rowData, 'totalAmount')} />
                        <Column field="saleDate" header="Sale Date" />
                        <Column field="paymentMethod" header="Payment Method" />
                        <Column
                            header="Actions"
                            body={(rowData) => (
                                <div className="d-flex gap-2">
                                    <button className="btn btn-warning btn-sm" onClick={() => navigate(`/editsalesform/${rowData._id}`)}>
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => {
                                        console.log(rowData._id);

                                        handleDelete(rowData._id)
                                    }}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            )}
                        />
                        <Column
                            header="Invoice"
                            body={(rowData) => (
                                <button className="btn btn-primary btn-sm" onClick={() => generateEachSale(rowData)}>
                                    <i className="fas fa-file-pdf"></i> Download
                                </button>
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
