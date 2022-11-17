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
    const [ loading, set_loading ] = useState(true);

    // useEffect(() => {
    //     if (loading && user?.logged_in) {
    //         dispatch(fetchOrders(user?.user?.id)).then((res) => {
    //             set_loading(false);       
    //         });
    //     }
    // });

    useEffect(() => {
        dispatch(fetchOrders(user?.user?.id));
    }, []);
    
    if (orders) {
        return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simmple table">
                    <TableHead>
                        <TableRow key="header">
                            <TableCell align="center">Orders</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from(orders).filter(order => order.purchased == true).map((order) => (
                            <TableRow key={order.id}>
                                <TableCell align="center">{order.updated_at}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    } else {
        return (
         <div>hi</div>
        );
    }
}

export default Orders;