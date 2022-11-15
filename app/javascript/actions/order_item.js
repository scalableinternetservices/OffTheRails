import { CREATE_ORDER_ITEM, FETCH_ORDER_ITEMS } from '../constants/actionTypes';
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