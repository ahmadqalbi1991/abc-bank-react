import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./components/pages/Home";
import Deposit from "./components/pages/Deposit";
import Transfer from "./components/pages/Transfer";
import Transactions from "./components/pages/Transactions";
import {RequireAuth} from "react-auth-kit";

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/deposit" element={
                    <RequireAuth loginPath="/">
                        <Deposit />
                    </RequireAuth>
                } />
                <Route path="/payments" element={
                    <RequireAuth loginPath="/">
                        <Transfer />
                    </RequireAuth>
                    } />
                <Route path="/transactions" element={
                    <RequireAuth loginPath="/">
                        <Transactions />
                    </RequireAuth>
                    } />
            </Routes>
        </>
    )
}

export default AppRoutes;
