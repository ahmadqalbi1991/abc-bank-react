import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Image from "mui-image";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {getTransactions} from "../../requests";
import {toast} from "react-toastify";
import dayjs from "dayjs";

const Transactions = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [rows, setRows] = useState([]);

    const columns = [
        { id: 'amount', label: 'Amount', minWidth: 170 },
        { id: 'type', label: 'Transaction Type', minWidth: 100 },
        { id: 'created_at', label: 'Date', minWidth: 170 },
    ];

    function createData(amount, type, created_at) {
        return { amount, type, created_at };
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getTransactionsRecords = () => {
        getTransactions().then((response) => {
            let transactions = response.data.transactions;
            if (transactions) {
                let transactionsRecords = [];
                transactions.map((transaction, index) => {
                    transactionsRecords[index] = createData('$' + transaction.amount,
                        transaction.type.toUpperCase(),
                        dayjs(transaction.created_at).format('DD MMM, YYYY').toString())
                })

                setRows(transactionsRecords);
            }
        }).catch((errors) => {
            toast.error(errors.response.data.message)
        })
    }

    useEffect(() => {
        getTransactionsRecords()
    }, [rows.length === 0])

    return (
        <Grid container>
            <Grid item xs={12}>
                <div className="home-page-content">
                    <Typography variant="h5" component="h2" gutterBottom>
                        Transactions
                    </Typography>
                    <Image src="/logo.svg" width={150} fit="contain" errorIcon={true}/>
                    <div className="transaction-table">
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                        {columns.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {column.format && typeof value === 'number'
                                                                        ? column.format(value)
                                                                        : value}
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </div>
                </div>
            </Grid>
        </Grid>
    )
}

export default Transactions
