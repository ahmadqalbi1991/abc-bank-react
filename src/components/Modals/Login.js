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
import {AccountCircle, Lock} from "@mui/icons-material";
import Box from "@mui/material/Box";
import {userLogin} from "../../requests";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import { useSignIn } from 'react-auth-kit';

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

const Login = ({setShow, show}) => {
    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const signIn = useSignIn();

    const onSubmit = (data) => {
        userLogin(data).then((response) => {
            if (signIn({
                token: response.data.token,
                expiresIn: 1440,
                tokenType: "Bearer",
                authState: response.data.user
            })) {
                localStorage.setItem('token', response.data.token);
                reset();
                setShow(false);
            } else {
                toast.error('Something went wrong');
            }
        }).catch((errors) => {
            toast.error(errors.response.data.message)
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
                    Customer Login
                </BootstrapDialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent dividers>
                        <Grid width={500}>
                            <Grid xs={12}>
                                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                    <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                    <TextField
                                        margin="normal"
                                        label="Username/Email"
                                        fullWidth
                                        variant="standard"
                                        error={!!errors.email}
                                        {...register("email", {
                                            required: {
                                                value: true,
                                                message: 'Username/Email field is required'
                                            }})}
                                    />
                                </Box>
                                {errors.email && <span style={{color: '#d32f2f'}}>{errors.email.message}</span>}
                                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                    <Lock sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                    <TextField margin="normal"
                                               type="password"
                                               label="Password"
                                               fullWidth
                                               variant="standard"
                                               error={!!errors.password}
                                               {...register("password", {
                                                   required: {
                                                       value: true,
                                                       message: 'Password field is required'
                                                   }})}
                                    />
                                </Box>
                                {errors.password && <span style={{color: '#d32f2f'}}>{errors.password.message}</span>}
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="success" type="submit">
                            Login
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

export default Login;
