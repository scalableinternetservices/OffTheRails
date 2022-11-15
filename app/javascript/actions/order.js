import { FETCH_UNPURCHASED_ORDER } from '../constants/actionTypes';
import * as api from '../api/index.js';
  
  export const getUnpurchasedOrder = (user) => async (dispatch) => {
    try {
        const { data } = await api.fetchUnpurchasedOrder(user);
        
        dispatch({ type: FETCH_UNPURCHASED_ORDER, payload: data});
    } catch (error) {
        console.log(error);
    }
  }