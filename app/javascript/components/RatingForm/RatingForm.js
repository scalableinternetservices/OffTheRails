import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getItem } from '../../actions/items';

import useStyles from './styles';
import { createRating, updateRating, deleteRating } from '../../actions/ratings';

const RatingForm = ( { itemId, item } ) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useLocation();
    const currState = useSelector((state) => state);
    const ratings = useSelector((state) => state.ratings);

    // useEffect(() => {
    //     dispatch(getRatings());
    // }, []);

    const [ratingData, setRatingData] = useState({score: '', comment: '', validScore: false});
    
    const [myRating, setMyRating] = useState(false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    // gets most up-to-date stats
    useEffect(() => {
        setMyRating(false);
        item.ratings.forEach(rating => {
            if (rating.user.id === user?.user?.id) {
                setMyRating(true);
                setRatingData({score: rating.score, comment: rating.comment, validScore: validateRating(rating.score) });
            }
        });

    }, [item]);

    useEffect(() => {
        dispatch(getItem(itemId)); // getItem triggers parent component to rerender (displaying updated ratings w/o refreshing page)
    }, [ratings]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!myRating) {
            dispatch(createRating({ ...ratingData, user_id: user?.user?.id, item_id: itemId }));
        } else {
            item.ratings.forEach(rating => {
                if (rating.user.id === user?.user?.id) {
                    dispatch(updateRating(rating.id, { ...ratingData, user_id: user?.user?.id, item_id: itemId}));
                }
            });
        }
    };

    const handleDelete = () => {
        item.ratings.forEach(rating => {
            if (rating.user.id === user?.user?.id) {
                dispatch(deleteRating(rating.id));
            }
        });
        clear();
    };

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const clear = () => {
        setRatingData({score: '', comment: '', validScore: false});
    }

    const validateRating = (rating) => {
        const ratingInt = parseInt(rating);
        return ratingInt >= 0 && ratingInt <= 5;
    }

    if(!user?.logged_in) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to make a review.
                </Typography>
            </Paper>
        );
    }
    
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{myRating ? `Editing review` : 'Post a review!'}</Typography>
                <TextField name="score" required variant="outlined" placeholder="Score" type="number" label="Rating" fullWidth value={ratingData.score} onChange={(e) => setRatingData({ ...ratingData, score: e.target.value, validScore: validateRating(e.target.value) })} />
                <TextField name="comment" required variant="outlined" label="Comment" fullWidth value={ratingData.comment} onChange={(e) => setRatingData({ ...ratingData, comment: e.target.value })} />
                <Button className={classes.buttonSubmit} disabled={!ratingData.score || !ratingData.comment || !ratingData.validScore} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                {myRating &&
                    <Button className={classes.buttonPad} variant="contained" color="error" size="small" onClick={handleDelete} fullWidth>Delete</Button>
                }
            </form>
        </Paper>
    );
}

export default RatingForm;