import { FETCH_UNPURCHASED_ORDER, UPDATE_ORDER, FETCH_ORDERS, FETCH_ONE_ORDER } from '../constants/actionTypes';
import * as api from '../api/index.js';
  
  export const getUnpurchasedOrder = (user) => async (dispatch) => {
    try {
        const { data } = await api.fetchUnpurchasedOrder(user);
        
        dispatch({ type: FETCH_UNPURCHASED_ORDER, payload: data});
    } catch (error) {
        console.log(error);
    }
  }

  export const updateOrder = (id, order) => async(dispatch) => {
    try {
      const { data } = await api.updateOrder(id, order);
      dispatch({ type: UPDATE_ORDER, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  export const fetchOrders = (user) => async (dispatch) => {
    try {
      const { data } = await api.fetchOrders(user);

      dispatch({ type: FETCH_ORDERS, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  export const fetchOrder = (id) => async (dispatch) => {
    try {
      const { data } = await api.fetchOrder(id);

      dispatch({type: FETCH_ONE_ORDER, payload: data});
    } catch (error) {
      console.log(error);
    }
  }