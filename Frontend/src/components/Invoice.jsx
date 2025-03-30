import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Invoice = () => {
    const [invoiceData, setInvoiceData] = useState(null);
    const [billId, setBillId] = useState("");

    const fetchInvoice = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/billing/${billId}`);
            setInvoiceData(response.data);
        } catch (error) {
            console.error("Error fetching invoice:", error);
        }
    };

    const downloadPDF = () => {
        const invoiceElement = document.getElementById("invoice");

        html2canvas(invoiceElement, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
            pdf.save(`invoice_${billId}.pdf`);
        });
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-xl w-2/3 mx-auto">
            <h2 className="text-2xl font-bold mb-4">Invoice Generator</h2>

            {/* Input Field to Enter Bill ID */}
            <div className="mb-4">
                <input
                    type="text"
                    value={billId}
                    onChange={(e) => setBillId(e.target.value)}
                    placeholder="Enter Bill ID"
                    className="border p-2 rounded w-full"
                />
                <button
                    onClick={fetchInvoice}
                    className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Get Invoice
                </button>
            </div>

            {invoiceData && (
                <div id="invoice" className="border p-6 rounded-lg mt-4 bg-gray-100">
                    <h3 className="text-xl font-bold mb-2">Invoice Details</h3>
                    <p><strong>Customer:</strong> {invoiceData.customerName}</p>
                    <p><strong>Phone:</strong> {invoiceData.customerPhone}</p>
                    <p><strong>Email:</strong> {invoiceData.customerEmail || "N/A"}</p>
                    <hr className="my-2" />
                    <h4 className="font-bold">Items Purchased:</h4>
                    <ul>
                        {invoiceData.items.map((item, index) => (
                            <li key={index} className="mb-1">
                                {item.productName} - {item.quantity} x ₹{item.price} = ₹{item.total}
                            </li>
                        ))}
                    </ul>
                    <hr className="my-2" />
                    <p><strong>Total Amount:</strong> ₹{invoiceData.totalAmount}</p>
                    <p><strong>Payment Method:</strong> {invoiceData.paymentMethod}</p>
                    <p><strong>Status:</strong> {invoiceData.paymentStatus}</p>

                    {/* Buttons for Printing and PDF Download */}
                    <div className="mt-4 space-x-2">
                        <button onClick={() => window.print()} className="bg-green-500 text-white py-2 px-4 rounded">
                            Print Invoice
                        </button>
                        <button onClick={downloadPDF} c lassName="bg-red-500 text-white py-2 px-4 rounded">
                            Download PDF
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Invoice;
