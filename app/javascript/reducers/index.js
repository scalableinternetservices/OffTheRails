import { combineReducers } from 'redux';

import items from './items';
import auth from './auth';
import users from './users';
import orders from './orders';
import ratings from './ratings';
import order_items from './order_items';

export const initState = {};
export const reducers = combineReducers({ items, auth, users, orders, order_items, ratings });
