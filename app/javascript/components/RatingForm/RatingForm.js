import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getRatings } from '../../actions/ratings';

import useStyles from './styles';
import { createRating, updateRating, deleteRating } from '../../actions/ratings';

const RatingForm = ( { itemId } ) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const currState = useSelector((state) => state);
    console.log(currState);
    console.log(typeof(currState.ratings));
    useEffect(() => {
        dispatch(getRatings());
    }, []);

    const [ratingData, setRatingData] = useState({score: '', comment: ''});
    //const rating = useSelector((state) => state.ratings ? state.ratings.find((p) => p.id === itemId) : null);
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    // useEffect(() => {
    //     if(ratingData) setRatingData(ratingData);
    // }, [ratingData])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if(itemId === 0) {
            dispatch(createRating({ ...ratingData, user_id: user?.user?.id, item_id: itemId}));
            clear();
        // } else {
        //     dispatch(updateRating(itemId, { ...itemData, user_id: user?.user?.id, item_id: itemId}));
        //     clear();
        // }
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location])

    const clear = () => {
        setCurrentId(0);
        setRatingData({score: '', comment: ''});
    }


    if(!user?.logged_in) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to make a review.
                </Typography>
            </Paper>
        )
    }
    console.log(ratingData);
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{itemId ? `Editing review` : 'Post a review!'}</Typography>
                <TextField name="score" required variant="outlined" placeholder="Score" type="number" label="Rating" fullWidth value={ratingData.score} onChange={(e) => setRatingData({ ...ratingData, score: e.target.value })} />
                <TextField name="comment" required variant="outlined" label="Comment" fullWidth value={ratingData.comment} onChange={(e) => setRatingData({ ...ratingData, comment: e.target.value })} />
                <Button className={classes.buttonSubmit} disabled={!ratingData.score || !ratingData.comment} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                {itemId !== 0 &&
                    <Button className={classes.buttonPad} variant="contained" color="error" size="small" onClick={() => {dispatch(deleteRating(ratingData.id)); clear();}} fullWidth>Delete</Button>
                }
            </form>
        </Paper>
    );
}

export default RatingForm;