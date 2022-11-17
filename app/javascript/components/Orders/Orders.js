import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchOrders } from '../../actions/order';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import useStyles from './styles';

const Orders = () => {
    const classes = useStyles();
    const orders = useSelector((state) => state.orders);
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrders(user?.user?.id));
    }, []);

    const openOrder = (order) => {
        navigate(`/orders/${order.id}`);
    }
    
    if (user?.logged_in) {
        if (orders) {
            return (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simmple table">
                        <TableHead>
                            <TableRow key="header">
                                <TableCell align="center"><b>Orders</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.from(orders).filter(order => order.purchased == true).map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell align="center" onClick={() => openOrder(order)}>{order.updated_at}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        } else {
            return (
             <div>this shouldn't ever happen I don't think</div>
            );
        }
    } else {
        return (
            <div>
                <h1>Log in to view your order history</h1>
                <Link to='/Auth'>Log In</Link>
            </div>
        );
    }
}

export default Orders;