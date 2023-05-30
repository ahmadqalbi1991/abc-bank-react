import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Grid, TextField} from "@mui/material";
import {AttachMoney} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useForm} from "react-hook-form";
import {transferAmount} from "../../requests";
import {toast} from "react-toastify";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const BeneficiaryModel = ({setShow, show, accountDetails}) => {
    const {register, reset, handleSubmit, formState: {errors}} = useForm();

    const transferAmountToAccount = (data) => {
        data.account_number = accountDetails.account_number
        data.id = accountDetails.user.id
        transferAmount(data).then((response) => {
            toast.success(response.data.message)
            reset()
            setShow(false)
        }).catch((error) => {
            toast.error(error.response.data.message)
        })
    }

    return (
        <div>
            <BootstrapDialog
                onClose={() => setShow(false)}
                aria-labelledby="customized-dialog-title"
                open={show}
                maxWidth="lg"
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={() => setShow(false)}>
                    Beneficiary Details
                </BootstrapDialogTitle>
                <form onSubmit={handleSubmit(transferAmountToAccount)}>
                    <DialogContent dividers>
                        <Grid width={500}>
                            <Grid xs={12}>
                                <Box>
                                    <Typography>
                                        <strong>Name:</strong> {accountDetails?.user?.name}
                                    </Typography>
                                    <Typography>
                                        <strong>Account number:</strong> {accountDetails?.account_number}
                                    </Typography>
                                    <Typography>
                                        <strong>Account status:</strong> {accountDetails?.status?.toUpperCase()}
                                    </Typography>
                                </Box>
                                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                    <AttachMoney sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                    <TextField
                                        type="number"
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                        margin="normal"
                                        id="input-with-sx"
                                        label="Amount"
                                        fullWidth
                                        variant="standard"
                                        error={!!errors.amount}
                                        {...register("amount", {
                                            required: {
                                                value: true,
                                                message: 'Amount field is required'
                                            }})}
                                    />
                                </Box>
                                {errors.amount && <span style={{color: '#d32f2f'}}>{errors.amount.message}</span>}
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="success" type="submit">
                            Transfer
                        </Button>
                        <Button variant="contained" color="error" onClick={() => setShow(false)}>
                            Cancel
                        </Button>
                    </DialogActions>
                </form>
            </BootstrapDialog>
        </div>
    );
}

export default BeneficiaryModel;
