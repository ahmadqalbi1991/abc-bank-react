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
import {Lock} from "@mui/icons-material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useForm} from "react-hook-form";
import {addBalance, verifyPassword} from "../../requests";
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

const PasswordModal = ({setShow, show, data}) => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    const verifyPasswordRequest = (formData) => {
        formData.id = data.id;
        verifyPassword(data).then((response) => {
            let payload = {
                'id': data.id,
                'amount': data.amount,
                'account_number': data.account_number
            };
            addBalanceToUser(payload);
        }).catch((errors) => {
            toast.error(errors.response.data.message);
        })
    }

    const addBalanceToUser = (payload) => {
        addBalance(payload).then((response) => {
            setShow(false);
            reset();
            toast.success(response.data.message);
        }).catch((errors) => {
            toast.error(errors.response.data.message);
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
                    Enter your password
                </BootstrapDialogTitle>
                <form onSubmit={handleSubmit(verifyPasswordRequest)}>
                    <DialogContent dividers>
                        <Typography>
                            Please enter your password for process transaction
                        </Typography>
                        <Grid width={500}>
                            <Grid xs={12}>
                                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                    <Lock sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                    <TextField
                                        margin="normal"
                                        type="password"
                                        label="Password"
                                        fullWidth
                                        variant="standard"
                                        error={!!errors.password}
                                        {...register("password", {
                                            required: {
                                                value: true,
                                                message: 'Password field is required'
                                            }
                                        })}
                                    />
                                </Box>
                                {errors.password && <span style={{color: '#d32f2f'}}>{errors.password.message}</span>}
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="success" type="submit">
                            Deposit
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

export default PasswordModal;
