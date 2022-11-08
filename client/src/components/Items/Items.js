import React from 'react';
import { Grid, LinearProgress, Button  } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import useStyles from './styles';

const Items = ({ setCurrentId }) => {
    const classes = useStyles();
    const items = useSelector((state) => state.items);
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        !items.length ? <LinearProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {items.map((item) => (
                <Grid key={item.id} item xs={12} sm={6} md={6}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={item.image_link}
                                alt={item.name}
                            />
                            {( user?.user?.id === item?.seller_id) && (
                                <div className={classes.overlay2}>
                                    <Button style={{color: 'white'}} size="small" onClick={() => {setCurrentId(item.id)}}>
                                        <MoreHorizIcon fontSize="medium" />
                                    </Button>
                                </div>
                            )}
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
        )  
    );
}

export default Items;