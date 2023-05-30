import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {useIsAuthenticated} from 'react-auth-kit';
import Image from "mui-image";
import {useState} from "react";
import SideBar from "./SideBar";
import {PowerSettingsNew} from "@mui/icons-material";
import { useSignOut } from 'react-auth-kit';
import {setUserDetail} from "../../features/User/UserSlice";
import {useDispatch} from "react-redux";

const Header = () => {
    const [showSideBar, setShowSideBar] = useState(false);
    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut()
    const dispatch = useDispatch();

    const userLogout = () => {
        dispatch(setUserDetail([]));
        signOut();
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar
                    position="relative"
                    color="default"
                    open={showSideBar}
                >
                    <Toolbar>
                        {
                            isAuthenticated() ? (
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                    onClick={() => {
                                        setShowSideBar(true)
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            ) : ''
                        }
                        <Typography component="div" sx={{ flexGrow: 1 }}>
                            <a href="/">
                                <Image
                                    src="/logo.svg"
                                    width={100}
                                    fit="contain"
                                />
                            </a>
                        </Typography>
                        {
                            isAuthenticated() ? (
                                <div>
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="menu-appbar"
                                        aria-haspopup="true"
                                        color="inherit"
                                        onClick={() => userLogout()}
                                    >
                                        <PowerSettingsNew />
                                    </IconButton>
                                </div>
                            ) : ''
                        }
                    </Toolbar>
                </AppBar>
                <SideBar
                    setShowSideBar={setShowSideBar}
                    showSideBar={showSideBar}
                />
            </Box>
        </>
    );
}

export default Header
