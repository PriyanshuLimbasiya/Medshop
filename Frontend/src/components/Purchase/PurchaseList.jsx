import React, { useEffect, useState } from "react";
import { getallPurchase } from "../services/PurchaseService";
import "bootstrap/dist/css/bootstrap.min.css";

const PurchaseList = () => {
    const [purchase, setPurchase] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await getallPurchase();
                console.log(response);
                setPurchase(response);
            } catch (error) {
                console.error("Purchase Error", error);
            }
        };
        fetchdata();
    }, []);

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header">
                    <h4>Purchase List</h4>
                </div>
                <div className="card-body">
                    <table className="table table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>#</th>
                                <th>Supplier</th>
                                <th>Medicine Name</th>
                                <th>Quantity</th>
                                <th>Price Per Unit</th>
                                <th>Total Price</th>
                                <th>Total Amount</th>
                                <th>Purchase Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchase.length > 0 ? (
                                purchase.flatMap((purchaseItem, index) =>
                                    purchaseItem.items.map((item, idx) => (
                                        <tr key={`${purchaseItem._id}-${idx}`}>
                                            <td>{index + 1}</td>
                                            <td>{purchaseItem.supplier}</td>
                                            <td>{item.medname}</td>
                                            <td>{item.quantity}</td>
                                            <td>₹{item.pricePerUnit}</td>
                                            <td>₹{item.totalPrice}</td>
                                            <td>₹{purchaseItem.totalAmount}</td>
                                            <td>{new Date(purchaseItem.purchaseDate).toLocaleDateString()}</td>
                                        </tr>
                                    ))
                                )
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">
                                        No purchases found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PurchaseList;
