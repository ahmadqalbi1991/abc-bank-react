import React, {useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "mui-image";
import Box from "@mui/material/Box";
import {AccountCircle, ArrowRight} from "@mui/icons-material";
import BeneficiaryModel from "../Modals/BeneficiaryModel";
import {useForm} from "react-hook-form";
import {getBeneficiary} from "../../requests";
import {toast} from "react-toastify";

const Transfer = () => {
    const [showBeneficiaryModel, setShowBeneficiaryModel] = useState(false);
    const [accountDetails, setAccountDetails] = useState([]);
    const {register, reset, handleSubmit, formState: {errors}} = useForm();

    const getAccountDetails = (data) => {
        getBeneficiary(data).then((response) => {
            setAccountDetails(response.data.account);
            setShowBeneficiaryModel(true);
            reset()
        }).catch((error) => {
            toast.error(error.response.data.message)
        })
    }

    return (
        <>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <div className="home-page-content">
                        <Typography variant="h5" component="h2" gutterBottom>
                            Transfer amount
                        </Typography>
                        <Image src="/logo.svg" width={150} fit="contain" errorIcon={true}/>
                        <form onSubmit={handleSubmit(getAccountDetails)}>
                            <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                                <AccountCircle sx={{color: 'action.active', mr: 1, my: 0.5}}/>
                                <TextField
                                    margin="normal"
                                    id="input-with-sx"
                                    label="Account number"
                                    fullWidth
                                    variant="standard"
                                     error={!!errors.account_number}
                                    {...register("account_number", {
                                        required: {
                                            value: true,
                                            message: 'Account Number field is required'
                                        }})}
                                    />
                            </Box>
                            {errors.account_number && <span style={{color: '#d32f2f'}}>{errors.account_number.message}</span>}
                            <div className="home-btns">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    endIcon={<ArrowRight/>}
                                >
                                    Next
                                </Button>
                            </div>
                        </form>
                    </div>
                </Grid>
            </Grid>
            <BeneficiaryModel accountDetails={accountDetails} setShow={setShowBeneficiaryModel} show={showBeneficiaryModel}/>
        </>
    )
}

export default Transfer;
