import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getCustomers, saveTraining } from '../api';

export default function AddTraining(props) {
    const [training, setTraining] = useState({
        date: "",
        duration: "",
        activity: "",
        customer: ""
    });

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleFetch = () => {
        getCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => console.log(error))
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        saveTraining({ ...training, date: new Date(training.date).toISOString() })
            .then(() => {
                props.handleFetch();
                handleClose();
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Add Training</DialogTitle>
                <DialogContent>
                    <TextField
                        maring="dense"
                        name="date"
                        type="datetime-local"
                        value={training.date}
                        onChange={(event) => setTraining({ ...training, date: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        maring="dense"
                        name="duration"
                        label="Duration"
                        type='number'
                        value={training.duration}
                        onChange={(event) => setTraining({ ...training, duration: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        maring="dense"
                        name="activity"
                        label="Activity"
                        value={training.activity}
                        onChange={(event) => setTraining({ ...training, activity: event.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    <Select
                        label="Customer"
                        value={training.customer}
                        onChange={(event) => setTraining({ ...training, customer: event.target.value })}
                        fullWidth
                        variant="standard"
                    >
                        {customers.map((customer) => (
                            <MenuItem key={customer._links.self.href} value={customer._links.self.href}>
                                {customer.firstname} {customer.lastname}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}