import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';


const Ratings = (props) => {
    return (
        <div>
           <Card sx={{ minWidth: 275, marginTop: 1 }}>
                <CardContent>
                <Typography variant="h5" component="div">
                    {props.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {props.reviewer}
                </Typography>
                <Rating name="read-only" value={props.stars} readOnly />
                <Typography variant="body2">
                    {props.review}
                </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default Ratings;