import React, {useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "mui-image";
import {
    AccountCircle,
    ArrowRight, AttachMoney,
} from "@mui/icons-material";
import Box from "@mui/material/Box";
import PasswordModal from "../Modals/PasswordModal";
import {useAuthUser} from "react-auth-kit";
import {useForm} from "react-hook-form";

const Deposit = () => {
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [payload, setPayload] = useState([]);
    const {register, reset, handleSubmit, formState: {errors}} = useForm();
    const auth = useAuthUser();

    const handleAmountSubmit = (data, e) => {
        e.preventDefault();
        data.account_number = auth().account?.account_number;
        data.id = auth().id;
        setPayload(data);
        reset();
        setShowPasswordModal(true);
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(handleAmountSubmit)}>
                        <div className="home-page-content">
                            <Typography variant="h5" component="h2" gutterBottom>
                                Deposit Amount to your account
                            </Typography>
                            <Image src="/logo.svg" width={150} fit="contain" errorIcon={true}/>
                            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                <TextField
                                    margin="normal"
                                    id="input-with-sx"
                                    label="Account number"
                                    fullWidth
                                    disabled
                                    defaultValue={auth().account?.account_number}
                                    variant="standard"/>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                <AttachMoney sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                <TextField
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
                            <div className="home-btns">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    endIcon={<ArrowRight />}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </form>
                </Grid>
            </Grid>
            <PasswordModal show={showPasswordModal} setShow={setShowPasswordModal} data={payload} />
        </>
    )
}

export default Deposit;
