import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Payments, PowerSettingsNew, ReceiptLong, Savings} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import {useSignOut} from "react-auth-kit";
import {useDispatch} from "react-redux";
import {setUserDetail} from "../../features/User/UserSlice";

const SideBar = ({setShowSideBar, showSideBar}) => {
    const signOut = useSignOut()
    const dispatch = useDispatch();

    const userLogout = () => {
        dispatch(setUserDetail([]));
        signOut();
    }

    const list = () => (
        <Box
            role="presentation"
            onClick={() => setShowSideBar(false)}
            onKeyDown={() => setShowSideBar(false)}
        >
            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Payments/>
                        </ListItemIcon>
                        <div className="list-text">
                            <Link to="/payments">Transfers</Link>
                        </div>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Savings/>
                        </ListItemIcon>
                        <div className="list-text">
                            <Link to="/deposit">Deposit</Link>
                        </div>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ReceiptLong/>
                        </ListItemIcon>
                        <div className="list-text">
                            <Link to="/transactions">Transactions</Link>
                        </div>
                    </ListItemButton>
                </ListItem>
                <Divider/>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => userLogout()}>
                        <ListItemIcon>
                            <PowerSettingsNew/>
                        </ListItemIcon>
                        <ListItemText primary="Logout"/>
                    </ListItemButton>
                </ListItem>
                <Divider/>
            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment>
                <Drawer
                    elevation={16}
                    open={showSideBar}
                    onClose={() => setShowSideBar(false)}
                >
                    {list()}
                </Drawer>
            </React.Fragment>
        </div>
    );
}

export default SideBar;
