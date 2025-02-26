import React, { useEffect, useState } from "react";
import { getallPurchase } from "../services/PurchaseService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";


const PurchaseList = () => {
    const [purchase, setPurchase] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await getallPurchase();
                setPurchase(response);
            } catch (error) {
                console.error("Purchase Error", error);

            }
        }
        fetchdata()
    }, [purchase]);

    return (
        <div>
            <DataTable value={purchase} tableStyle={{ minWidth: '50rem' }}>
                <Column field="totalamount" header="Amount"></Column>
            </DataTable>
        </div>
    )
};

export default PurchaseList;
