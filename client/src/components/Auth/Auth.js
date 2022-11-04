import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin, signup, signout} from '../../actions/auth';


const initialState = { first_name: '', last_name: '', email: '', password: '', password_confirmation: ''};

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const user = JSON.parse(localStorage.getItem('profile'));


    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
    };
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const switchMode = () => {
        setIsSignup((prevSignUp) => !prevSignUp);
        setShowPassword(false);
    }

    console.log(user);

    if (user?.logged_in) {
        return (
            <Button onClick={() => dispatch(signout(navigate))}>
                { "Log Out"}
            </Button>
        )
    }
    
    
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        { isSignup && (
                            <>
                                <Input name="first_name" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="last_name" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        { isSignup && (
                        <Input name="password_confirmation" label="Repeat Password" handleChange={handleChange} type="password" />
                        )}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}> {isSignup ? 'Sign Up' : 'Sign In'}</Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                { isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
