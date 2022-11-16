import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useStyles from './styles';
import { getItem, getRating } from '../../actions/items';
import { getUser } from '../../actions/users';
import { useDispatch, useSelector } from 'react-redux';
import CardMedia from '@mui/material/CardMedia';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getUnpurchasedOrder } from '../../actions/order';
import { createOrderItem } from '../../actions/order_item';
import { TextField } from '@material-ui/core';
import Rating from '@mui/material/Rating';
import Ratings from '../Ratings/Ratings';

const Item = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { item } = useSelector((state) => state.items);
    const { user } = useSelector((state) => state.users);

    const logged_in_user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();

    const { order } = useSelector((state) => state.orders);
    const [ unpurchased_order_id, set_unpurchased_order_id ] = useState();
    const [quantity, set_quantity] = useState(1);

    const [ loading, set_loading ] = useState(true);
    
    useEffect(() => {
        dispatch(getItem(id));
    }, [id]);

    useEffect(() => {
        if (item) {
            dispatch(getUser(item.seller_id))
        }
    }, [item]);

    useEffect(() => {
        if (loading) {
            dispatch(getUnpurchasedOrder(logged_in_user?.user?.id)).then((res) => {
                set_unpurchased_order_id(order?.id);
                set_loading(false);
            });
        }
    });

    const addToCart = () => {
        dispatch(createOrderItem({order_item: {quantity: quantity, order_id: unpurchased_order_id, item_id: id}}));
        navigate(`/cart`);
    };

    if (!item)
        return null;


    return (
        <div>
            <div>
                <Card sx={{ minWidth: 275, marginBottom: 2 }}>
                    <CardMedia
                        component="img"
                        height="500"
                        image={item.image_link}
                        alt={item.name}
                        sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
                    />

                    <CardContent>
                    <Typography variant="h5" component="div">
                        {item.name}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Seller: {user ? user.first_name : "N/A"}
                    </Typography>
                    <Rating name="read-only" value={3} readOnly />
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        ${Number(item.price).toFixed(2)}
                    </Typography>
                    <Typography variant="body2">
                        item description here
                    </Typography>
                    </CardContent>
                    <CardActions>
                        <TextField name="quantity" variant="outlined" placeholder="1" type="number" label="Quantity" fullWidth value={quantity} onChange={(e) => set_quantity(e.target.value)} />
                        <Button size="small" onClick={() => addToCart() }>Add to Cart</Button>
                    </CardActions>
                </Card>
            </div>

            {
                item ? item.ratings.map((r) => <Ratings title="Review" reviewer={`${r.user.first_name} ${r.user.last_name}`} review={r.comment} stars={r.score}></Ratings>) : null
            }
        </div>
    );
}

export default Item;