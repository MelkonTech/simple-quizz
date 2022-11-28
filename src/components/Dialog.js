import * as React from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom';
import {Box} from '@mui/system';
import {DialogActions, Dialog, TextField, DialogTitle} from "@mui/material";
import {CustomNextButton} from "../assets/custom-components/CustomNextButton"
import {CustomTransition} from "../assets/custom-components/CustomTransition"
import {CustomArrowRightIcon} from "../assets/custom-components/CustomArrowRightIcon"
import {addUser} from "../redux/actions";

export default function AlertDialogSlide() {
    const history = useHistory();
    const [name, setName] = React.useState('')
    const [open, setOpen] = React.useState(true);
    const [error, setError] = React.useState(false)

    const dispatch = useDispatch();

    const Next = () => {
        if (name !== '') {
            dispatch(addUser({name: name}));
            setOpen(false);
            history.push('/settings');
        } else {
            setError(true)
        }
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={CustomTransition}
            aria-describedby='alert-dialog-slide-description'
            maxWidth='sm'
            keepMounted
            fullWidth
            disableEscapeKeyDown={true}
            onClose={(e, reason) => {
                if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
                    setOpen(false);
                }
            }}
        >
            <Box sx={{padding: '24px 32px'}}>
                <DialogTitle style={{fontSize: '24px'}} sx={{p: '0'}}>Enter your name</DialogTitle>

                <Box my={2}>
                    <TextField
                        placeholder='John Smith'
                        variant='outlined'
                        fullWidth
                        value={name}
                        error={error}
                        helperText={error && 'Text field is empty'}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError(false)
                        }}
                    />
                </Box>

                <DialogActions sx={{p: '0'}}>
                    <CustomNextButton onClick={Next}>
                        Next
                        <CustomArrowRightIcon/>
                    </CustomNextButton>
                </DialogActions>
            </Box>
        </Dialog>
    );
}
