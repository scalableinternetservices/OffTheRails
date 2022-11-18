import React, { useState, useEffect } from 'react';
import { Grid, LinearProgress, Button  } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import useStyles from './styles';

const Items = ({ setCurrentId }) => {
    const classes = useStyles();
    const items = useSelector((state) => state.items);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();
    const navigate = useNavigate();

    const openItem = (item) => {
        navigate(`/items/${item.id}`);
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    return (
        !items.length ? <LinearProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {items.map((item) => (
                (item.show && item.quantity > 0) || (user.user && item.seller_id == user.user.id) ? (
                <Grid key={item.id} item xs={12} sm={6} md={6}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea >
                            <CardMedia onClick={() => openItem(item)}
                                component="img"
                                height="140"
                                image={item.image_link}
                                alt={item.name}
                            />
                            {( user?.user?.id === item?.seller_id) && (
                                <div className={classes.overlay2}>
                                    <Button style={{color: 'white', backgroundColor: 'rgba(0,0,0,0.26)'}} size="small" onClick={() => {setCurrentId(item.id)}}>
                                        <EditIcon fontSize="medium" />
                                    </Button>
                                </div>
                            )}
                            <CardContent onClick={() => openItem(item)}>
                                <Typography gutterBottom variant="h5" component="div">
                                {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                ${Number(item.price).toFixed(2)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                Quantity: {item.quantity}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>                
                </Grid>): null
            ))}
        </Grid>
        )  
    );
}

export default Items;