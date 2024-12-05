import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Snackbar } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"

import { getTrainings, deleteTraining } from "../api";
import AddTraining from "./AddTraining";


function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const [open, setOpen] = useState(false);

  const [colDefs, setColDefs] = useState([
    {field: "date", filter: true, cellRenderer: (data) => formatDate(data.value)},
    {field: "duration", filter: true},
    {field: "activity", filter: true},
    {
      headerName: "Customer",
      valueGetter: (params) => `${params.data.customer?.firstname} ${params.data.customer?.lastname}`,
      filter: true
    },
    {
      cellRenderer: params => <Button size="small" color="error" onClick={() => handleDelete(params.data)}>Delete</Button>,
      width: 150
    },
  ]);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    handleFetch();
  }, []);
  
  const handleFetch = () => {
    getTrainings()
      .then(data => setTrainings(data))
      .catch(error => console.log(error))
  };

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Intl.DateTimeFormat('fi-FI', options).format(new Date(date));
  };

  const handleDelete = (params) => {
    if (window.confirm("Are you sure?")) {
        setOpen(true);
        deleteTraining(params.id)
        .then(() => handleFetch())
        .catch(error => console.error(error))
    }
};
  
  return (
    <>
      <div className="ag-theme-material" style={{ height: 700, width: "90%", margin: "auto" }}>
        <AddTraining handleFetch={handleFetch}/>
        <AgGridReact
          rowData={trainings}
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
  )
}
export default TrainingList;