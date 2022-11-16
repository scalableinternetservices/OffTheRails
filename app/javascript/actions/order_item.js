import { CREATE_ORDER_ITEM, FETCH_ORDER_ITEMS, UPDATE_ORDER_ITEM, DELETE_ORDER_ITEM } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const createOrderItem = (item) => async (dispatch) => {
  try {
      const { data } = await api.createOrderItem(item);

      dispatch({ type: CREATE_ORDER_ITEM, payload: data });
  } catch (error) {
      console.log(error);
  }
}

export const getOrderItems = (order) => async (dispatch) => {
  try {
    const { data } = await api.fetchOrderItems(order);

    dispatch({ type: FETCH_ORDER_ITEMS, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const updateOrderItem = (id, orderItem) => async (dispatch) => {
  try {
    const { data } = await api.updateOrderItem(id, orderItem);
    
    dispatch({ type: UPDATE_ORDER_ITEM, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const deleteOrderItem = (id) => async (dispatch) => {
  try {
    const { data } = await api.deleteOrderItem(id);

    dispatch({ type: DELETE_ORDER_ITEM, payload: data });
  } catch (error) {
    console.log(error);
  }
}