import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Button  } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { TextField } from '@material-ui/core';
import { useNavigate, Link } from 'react-router-dom';
import { getUnpurchasedOrder, updateOrder } from '../../actions/order';
import { getOrderItems, updateOrderItem, deleteOrderItem } from '../../actions/order_item';

import useStyles from './styles';

const Cart = () => {
    const classes = useStyles();
    const orderItems = useSelector((state) => state.order_items);
    const { order } = useSelector((state) => state.orders);
    const user = JSON.parse(localStorage.getItem('profile'));
    const [ loading, set_loading ] = useState(true);
    const [ totalPrice, set_total_price ] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ currentOrderItemId, set_order_item_id ] = useState(-10);
    const [ editing, set_editing ] = useState(false);
    const [ newQuantity, set_new_quantity ] = useState(0);
    const currState = useSelector((state) => state);

    useEffect(() => {
        if (loading && user?.logged_in) {
            dispatch(getUnpurchasedOrder(user?.user?.id)).then((res) => {
                dispatch(getOrderItems(order?.id));
                set_total_price(getTotal());
                set_loading(false);       
            });
        }
    });

    useEffect(() => {
        set_total_price(getTotal());
    }, [orderItems]);

    const openItem = (item_id) => {    
        navigate(`/items/${item_id}`);
    };

    const purchaseOrder = () => {
        dispatch(updateOrder(order?.id, {user_id: user?.user?.id, purchased: true})).then((res) => {
            navigate(`/`);
        });
    }

    const getTotal = () => {
        let totalPrice = 0;
        for (let i = 0; i < orderItems.length; i++ ) {
            totalPrice += orderItems[i].item.price * orderItems[i].quantity;
        }
        return totalPrice;
    }

    const setUpOrderItemEdit = (id) => {
        set_order_item_id(id);
        set_editing(!editing);
    }

    const updateOrderItemQuantity = (id, updatedOrderItemId, updatedOrderItemQuantity) => {
        dispatch(updateOrderItem(id, {order_id: order?.id, item_id: updatedOrderItemId, quantity: updatedOrderItemQuantity}));
        set_editing(false);
    }

    const deleteItemFromOrder = (id) => {
        dispatch(deleteOrderItem(id));
        console.log(currState);
    }

    if(user?.logged_out){
        return(
            <div>
                <h1>Log in to view your cart!</h1>
                <Link to='/Auth'>Log in here!</Link>
            </div>
        )
    }

    else if (!orderItems.length) {
        return (
            <div>
                <h1>Cart is empty</h1>
                <Link to='/'>Browse Items</Link>
            </div>
        );
    }

    else {
        return (
            <div>
                <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                    {orderItems.map((orderItem) => (
                        <Grid key={orderItem?.id} orderItem xs={12} sm={6} md={6}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardActionArea>
                                        <CardMedia onClick={() => openItem(orderItem?.item.id)}
                                            component="img"
                                            height="140"
                                            image={orderItem?.item.image_link}
                                            alt={orderItem.item.name}
                                            sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                                        />
                                        <div className={classes.overlay2}>
                                            <Button style={{color: 'black'}} size="small" onClick={() => {setUpOrderItemEdit(orderItem?.id)}}>
                                                <MoreHorizIcon fontSize="medium" />
                                            </Button>
                                            <Button style={{color: 'black'}} size="small" onClick={() => {deleteItemFromOrder(orderItem?.id)}}>
                                                <DeleteIcon fontSize="medium" />
                                            </Button>
                                        </div>
                                        <CardContent onClick={() => openItem(orderItem?.item.id)} >
                                            <Typography gutterBottom variant="h5" component="div">
                                            {orderItem?.item.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                            ${Number(orderItem?.item.price).toFixed(2)}
                                            </Typography>
                                            {!((orderItem?.id == currentOrderItemId) && (editing)) && (
                                                <Typography variant="body2" color="text.secondary">
                                                Quantity: {orderItem?.quantity}
                                                </Typography>
                                            )}
                                        </CardContent>
                                        {(orderItem?.id == currentOrderItemId) && (editing) && (
                                            <CardActions>
                                                <TextField name="quantity" variant="outlined" placeholder="1" type="number" label="Quantity" fullWidth value={newQuantity} onChange={(e) => {set_new_quantity(e.target.value)}} />
                                                <Button size="small" onClick={() => {updateOrderItemQuantity(orderItem?.id, orderItem?.item.id, newQuantity)} }>Update</Button>
                                            </CardActions>
                                        )}
                                            
                                    </CardActionArea>
                                </Card>      
                        </Grid>
                    ))}
                </Grid>
                <br></br>
                <br></br>
                <p>Total Price: ${Number(totalPrice).toFixed(2)}</p>
                <Button onClick={() => purchaseOrder() }>Purchase Order</Button>
            </div>
        );
    }
}

export default Cart;