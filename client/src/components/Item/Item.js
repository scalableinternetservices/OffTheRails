import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
import Rating from '@mui/material/Rating';
import Ratings from '../Ratings/Ratings';

const Item = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { item } = useSelector((state) => state.items);
    const { user } = useSelector((state) => state.users);
    
    useEffect(() => {
        dispatch(getItem(id));
    }, [id]);

    useEffect(() => {
        if (item) {
            dispatch(getUser(item.seller_id))
        }
    }, [item]);

    if (!item)
        return null;


    return (
        <div>
            <div>
                <Card sx={{ minWidth: 275 }}>
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
                        ${item.price}
                    </Typography>
                    <Typography variant="body2">
                        item description here
                    </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Add to Cart</Button>
                    </CardActions>
                </Card>
            </div>

            <Ratings title="my review" reviewer="sydney" review="mid"></Ratings>


        </div>
    );
}

export default Item;