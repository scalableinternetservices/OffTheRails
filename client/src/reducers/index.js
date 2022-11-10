import { combineReducers } from 'redux';

import items from './items';
import auth from './auth';
import users from './users';

export const initState = {};
export const reducers = combineReducers({ items, auth, users });