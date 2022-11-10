import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Avatar, Toolbar, Button } from '@material-ui/core';
import useStyles from './styles';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signout } from '../../actions/auth';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch(signout(navigate));
        navigate("/");
        setUser(null);
    };

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">OffTheRails</Typography>
        </div>
        <Toolbar className={classes.toolbar}>
            {user?.logged_in ? (
                <div className={classes.profile}>
                    <Avatar component={Link} to="/cart" className={classes.purple} alt="cart">
                        <ShoppingCartIcon />
                    </Avatar>
                    <Typography component={Link} to="/account" className={classes.userName} variant="h6">{user.user.first_name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
            ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            )}
        </Toolbar>
        </AppBar>
    );
};

export default Navbar;