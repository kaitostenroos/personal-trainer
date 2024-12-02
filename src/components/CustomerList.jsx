import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { getCustomers } from "../api";

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [colDefs, setColDeft] = useState([
        { field: "firstname", filter: true },
        { field: "lastname", filter: true },
        { field: "streetaddress", filter: true },
        { field: "postcode", filter: true},
        { field: "email", filter: true },
        { field: "phone", filter: true },
    ]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        getCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => console.log(error))
    };

    return (
        <>
            <div className="ag-theme-material" style={{ height: 700, width: "90%", margin: "auto" }}>
                <AgGridReact
                    rowData={customers}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
            </div>
        </>
    );
}
export default CustomerList;