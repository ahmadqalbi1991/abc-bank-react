import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Grid, TextField} from "@mui/material";
import {Abc, AccountCircle, Email, Lock} from "@mui/icons-material";
import Box from "@mui/material/Box";
import {DatePicker} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import {userRegister} from "../../requests";
import {toast} from "react-toastify";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
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
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const Register = ({setShow, show}) => {
    const [gender, setGender] = useState('male');
    const [dob, setDob] = useState(dayjs('2000-01-01'));
    const { register, handleSubmit, reset, formState: { errors }} = useForm();

    const handleChange = (
        event,
        newGender,
    ) => {
        setGender(newGender);
    };

    const onSubmit = (data) => {
        data.dob = dob;
        data.gender = gender;
        userRegister(data).then((response) => {
            reset()
            toast.success(`${response.data.message}. Please login to your account`)
            setShow(false)
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
                    Customer Registration
                </BootstrapDialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent dividers>
                    <Grid width={500}>
                        <Grid xs={12} spacing={2}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Abc sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    margin="normal"
                                    label="Full Name"
                                    fullWidth
                                    variant="standard"
                                    error={!!errors.name}
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: 'Name field is required'
                                        }})}
                                />
                            </Box>
                            {errors.name && <span style={{color: '#d32f2f'}}>{errors.name.message}</span>}
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    margin="normal"
                                    label="Username"
                                    fullWidth
                                    variant="standard"
                                    error={!!errors.username}
                                    {...register("username", {
                                        required: {
                                            value: true,
                                            message: 'Username field is required'
                                        },
                                        minLength: {
                                            value: 8,
                                            message: 'Username cannot be less than 8 characters'
                                        }
                                    })}
                                />
                            </Box>
                            {errors.username && <span style={{color: '#d32f2f'}}>{errors.username.message}</span>}
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Email sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    margin="normal"
                                    label="Email"
                                    fullWidth
                                    variant="standard"
                                    error={!!errors.email}
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: 'Email field is required'
                                        },
                                        pattern: {
                                            value: /\S+@\S+\.\S+/,
                                            message: "Please enter valid email"
                                        }
                                    })}
                                />
                            </Box>
                            {errors.email && <span style={{color: '#d32f2f'}}>{errors.email.message}</span>}
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Lock sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                <TextField
                                    margin="normal"
                                    label="Password"
                                    fullWidth
                                    type="password"
                                    variant="standard"
                                    error={!!errors.password}
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: 'Password field is required'
                                        },
                                        minLength: {
                                            value: 8,
                                            message: 'Password cannot be less than 8 characters'
                                        }
                                    })}
                                />
                            </Box>
                            {errors.password && <span style={{color: '#d32f2f'}}>{errors.password.message}</span>}
                            <Grid container margin="10px 0" spacing={2}>
                                <Grid item xs={6}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <DatePicker
                                            label="Date of birth"
                                            value={dob}
                                            minDate={dayjs('1950-01-01')}
                                            onChange={(e) => {
                                                setDob(e)
                                            }}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={gender}
                                        exclusive
                                        onChange={handleChange}
                                        aria-label="Platform"
                                    >
                                        <ToggleButton value="male">Male</ToggleButton>
                                        <ToggleButton value="female">Female</ToggleButton>
                                        <ToggleButton value="other">Other</ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" type="submit" color="primary">
                        Sign up
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

export default Register;
