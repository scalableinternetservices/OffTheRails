import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStyles from './styles';
import { getUser } from '../../actions/users';
import { useDispatch, useSelector } from 'react-redux';

const User = () => {
    const { id } = useParams();

    const { user } = useSelector((state) => state.users);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser(id));
    }, [id]);


    if (!user) return null;

    return (
        <div>
            <h1>{user.first_name} {user.last_name}</h1>
        </div>
    );
}

export default User;