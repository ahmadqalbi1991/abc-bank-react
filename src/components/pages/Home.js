import React, {useState} from "react";
import {Button, Grid, Icon, SvgIcon} from "@mui/material";
import Image from "mui-image";
import {
    AddCircleOutline, Cached,
    LockPerson,
    Payments, ReceiptLong,
    Savings
} from "@mui/icons-material";
import LoginModal from "../Modals/Login";
import Register from "../Modals/Register";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom";
import {useIsAuthenticated} from "react-auth-kit";
import {getBalance} from "../../requests";
import {toast} from "react-toastify";
import {useAuthUser} from 'react-auth-kit';

const Home = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showAmount, setShowAmount] = useState(false);
    const [amount, setAmount] = useState(0);
    const isAuthenticated = useIsAuthenticated();
    const auth = useAuthUser();

    const showUserAmount = () => {
        getBalance(auth().id).then((response) => {
            setAmount(response.data.amount);
            setShowAmount(true)
        }).catch((error) => {
            toast.error(error.response.data.message);
        });
    }

    console.log('fuck')

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} className="text-center">
                    <div className="home-page-content">
                        <Typography variant="h5" component="h2" gutterBottom>
                            {
                                isAuthenticated() ? "Welcome Ahmed Qalbi" : "Customer portal"
                            }
                        </Typography>
                        <Typography gutterBottom>
                            {
                                isAuthenticated() ? `Account# ${auth().account?.account_number}` : "Login / Register to access your Bank Dashboard"
                            }
                        </Typography>
                        <Image src="/logo.svg" width={250} fit="contain" errorIcon={true}/>
                        {
                            showAmount && isAuthenticated() ? (
                                <Typography variant="h4">
                                    <strong>${amount.toFixed(2)}</strong>
                                    <span className="hover">
                                        <SvgIcon
                                            component={Cached}
                                            color="primary"
                                            onClick={() => showUserAmount()}/>
                                    </span>
                                </Typography>
                            ) : ''
                        }
                        <div className="home-btns">
                            {
                                isAuthenticated() ?
                                    <>
                                        {
                                            !showAmount ? (
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => showUserAmount()}
                                                >
                                                    Show Balance
                                                </Button>
                                            ) : ''
                                        }
                                        <Box sx={{display: 'flex'}}>
                                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                <Link className="bank-action" to="/payments">
                                                    <SvgIcon component={Payments}/>
                                                </Link>
                                                Transfer
                                            </Box>
                                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                <Link className="bank-action" to="/deposit">
                                                    <SvgIcon component={Savings}/>
                                                </Link>
                                                Deposit
                                            </Box>
                                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                <Link className="bank-action" to="/transactions">
                                                    <SvgIcon component={ReceiptLong}/>
                                                </Link>
                                                Transactions
                                            </Box>
                                        </Box>
                                    </>
                                    : (
                                        <>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                startIcon={<LockPerson/>}
                                                onClick={() => {
                                                    setShowLoginModal(true)
                                                }}
                                            >
                                                Login
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<AddCircleOutline/>}
                                                onClick={() => {
                                                    setShowRegisterModal(true)
                                                }}
                                            >
                                                Register
                                            </Button>
                                        </>
                                    )
                            }
                        </div>
                    </div>
                </Grid>
            </Grid>
            {
                showLoginModal ? (
                    <LoginModal setShow={setShowLoginModal} show={showLoginModal}/>
                ) : ''
            }
            {
                showRegisterModal ? (
                    <Register setShow={setShowRegisterModal} show={showRegisterModal}/>
                ) : ''
            }
        </>
    )
}

export default Home;
