import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createItem, updateItem, deleteItem } from '../../actions/items';

const Form = ( { currentId, setCurrentId }) => {
    const [itemData, setItemData] = useState({name: '', price: '', image_link: ''});
    const item = useSelector((state) => currentId ? state.items.find((p) => p.id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(item) setItemData(item);
    }, [item])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(currentId === 0) {
            dispatch(createItem({ ...itemData, seller_id: user?.user?.id}));
            clear();
        } else {
            dispatch(updateItem(currentId, { ...itemData, seller_id: user?.user?.id}));
            clear();
        }
    }

    const clear = () => {
        setCurrentId(0);
        setItemData({name: '', price: '', image_link: ''});
    }


    if(!user?.logged_in) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to add your items and view your order history.
                </Typography>
            </Paper>
        )
    }
    console.log(itemData);
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing item: "${item.name}"` : 'Sell an item!'}</Typography>
                <TextField name="name" required variant="outlined" label="Item Name" fullWidth value={itemData.name} onChange={(e) => setItemData({ ...itemData, name: e.target.value })} />
                <TextField name="price" required variant="outlined" placeholder="Price" type="number" label="Price" fullWidth value={itemData.price} onChange={(e) => setItemData({ ...itemData, price: e.target.value })} />
                <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({base64}) => setItemData({ ...itemData, image_link: base64 })} /></div>
                <Button className={classes.buttonSubmit} disabled={!itemData.name || !itemData.price || !itemData.image_link} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                {currentId !== 0 &&
                    <Button variant="contained" color="error" size="small" onClick={() => {dispatch(deleteItem(item.id)); clear();}} fullWidth>Delete</Button>
                }
            </form>
        </Paper>
    );
}

export default Form;