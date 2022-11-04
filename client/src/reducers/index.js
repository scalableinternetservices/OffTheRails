import { combineReducers } from 'redux';

import items from './items';
import auth from './auth';

export const reducers = combineReducers({ items, auth });