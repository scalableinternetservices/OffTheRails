import React, { useState, useEffect } from 'react';
import useStyles from './styles';
import { Container, Grid } from '@material-ui/core';
import { getItems } from '../../actions/items';
import { useDispatch } from 'react-redux';
import Items from '../Items/Items';
import Form from '../Form/Form';

const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const classes = useStyles();

    return (
        <Container>
            <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={7}>
                    <Items setCurrentId={setCurrentId}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;