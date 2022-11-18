import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getOrderItems} from '../../actions/order_item';

import useStyles from './styles';

const Order = () => {
    const classes = useStyles();
    const { id } = useParams();
    const orderItems = useSelector((state) => state.order_items);
    const user = JSON.parse(localStorage.getItem('profile'));
    const [ totalPrice, set_total_price ] = useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ newQuantity, set_new_quantity ] = useState(0);

    useEffect(() => {
        dispatch(getOrderItems(id));
    }, [id]);

    useEffect(() => {
        set_total_price(getTotal());
    }, [orderItems]);

    const openItem = (item_id) => {    
        navigate(`/items/${item_id}`);
    };

    const getTotal = () => {
        let totalPrice = 0;
        for (let i = 0; i < orderItems.length; i++ ) {
            totalPrice += orderItems[i].item.price * orderItems[i].quantity;
        }
        return totalPrice;
    }

    if(user?.logged_out){
        return(
            <div>
                <h1>Log in to view your order history</h1>
                <Link to='/Auth'>Log in</Link>
            </div>
        )
    }

    else if (!orderItems.length) {
        return (
            <div>
                <h1>Empty Order</h1>
                <p>This is a mistake. Contact Surya Pugal.</p>
                <Link to='/'>Return to Home</Link>
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
                                        <CardContent onClick={() => openItem(orderItem?.item.id)} >
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
                <br></br>
                <br></br>
                <div align="center">
                    <Card sx={{margin: 1}, {boxShadow: 10}, { maxWidth: 345 }} align="center">
                        <CardContent>
                            <p className={classes.totalPrice}>Total Price: ${Number(totalPrice).toFixed(2)}</p>
                        </CardContent>
                    </Card>  
                </div> 
            </div>
        );
    }
}

export default Order;