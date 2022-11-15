import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, LinearProgress, Button  } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getUnpurchasedOrder } from '../../actions/order';
import { getOrderItems } from '../../actions/order_item';

import useStyles from './styles';

const Cart = () => {
    const classes = useStyles();
    const orderItems = useSelector((state) => state.order_items);
    const { order } = useSelector((state) => state.orders);
    const user = JSON.parse(localStorage.getItem('profile'));
    const [ loading, set_loading ] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (loading) {
            dispatch(getUnpurchasedOrder(user?.user?.id)).then((res) => {
                dispatch(getOrderItems(order?.id));
                set_loading(false);       
            });
        }
    });

    const openItem = (item_id) => {    
        navigate(`/items/${item_id}`);
    };

    return (
        !orderItems.length ? <LinearProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {orderItems.map((orderItem) => (
                <Grid key={orderItem?.id} orderItem xs={12} sm={6} md={6}>
                        <Card sx={{ maxWidth: 345 }} onClick={() => openItem(orderItem?.item_id)}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={orderItem?.item.image_link}
                                    alt={orderItem.item.name}
                                    sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                                />
                                {( user?.user?.id === orderItem?.item.seller_id) && (
                                    <div className={classes.overlay2}>
                                        <Button style={{color: 'white'}} size="small">
                                            <MoreHorizIcon fontSize="medium" />
                                        </Button>
                                    </div>
                                )}
                                <CardContent >
                                    <Typography gutterBottom variant="h5" component="div">
                                    {orderItem?.item.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    ${Number(orderItem?.item.price).toFixed(2)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Quantity: {orderItem?.quantity}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>      
                </Grid>
            ))}
        </Grid>
        )  
    );
}

export default Cart;