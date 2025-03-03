import jsPDF from "jspdf";
import "jspdf-autotable";

const generateSalesReport = (transactions) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Sales Report", 14, 15);

    const tableColumn = ["Invoice ID", "Time", "Amount", "Items", "Status"];
    const tableRows = transactions.map(trans => [
        trans.id,
        trans.time,
        trans.amount,
        trans.items,
        trans.status
    ]);

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 25,
    });

    doc.save("sales_report.pdf");
};
