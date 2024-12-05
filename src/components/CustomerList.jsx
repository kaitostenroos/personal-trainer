import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Snackbar } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import { getCustomers, deleteCustomer } from "../api";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);

    const [colDefs, setColDeft] = useState([
        { field: "firstname", filter: true },
        { field: "lastname", filter: true },
        { field: "streetaddress", filter: true },
        { field: "postcode", filter: true },
        { field: "email", filter: true },
        { field: "phone", filter: true },
        {
            cellRenderer: params => <Button size="small" color="error" onClick={() => handleDelete(params.data)}>Delete</Button>,
            width: 150
        },
        {
            cellRenderer: params => <EditCustomer data={params.data} handleFetch={handleFetch} />,
            width: 150
        }
    ]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        getCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => console.log(error))
    };

    const handleDelete = (params) => {
        if (window.confirm("Are you sure?")) {
            setOpen(true);
            deleteCustomer(params._links.self.href)
            .then(() => handleFetch())
            .catch(error => console.error(error))
        }
    };

    const handleClose = () => {
        setOpen(false);
      };

    return (
        <>
            <div className="ag-theme-material" style={{ height: 700, width: "90%", margin: "auto" }}>
                <AddCustomer handleFetch={handleFetch}/>
                <AgGridReact
                    rowData={customers}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationAutoPageSize={true}
                    suppressCellFocus={true}
                />
                <Snackbar 
                open={open}
                message="Customer deleted"
                autoHideDuration={3000}
                onClose={handleClose}
                />
            </div>
        </>
    );
}
export default CustomerList;