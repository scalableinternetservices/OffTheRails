import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import useStyles from './styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { getItems } from '../../actions/items';
import { useDispatch } from 'react-redux';

const Home = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getItems());
    }, []);

    const items = useSelector((state) => state.items);

    return (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {items.map((item) => (
                <Grid key={item._id} item xs={12} sm={6} md={6}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={item.image_link}
                                alt={item.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                ${item.price}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>                
                </Grid>
            ))}
        </Grid>
    );
};

export default Home;