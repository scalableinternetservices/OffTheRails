import { FETCH_ALL_ITEM, FETCH_ONE_ITEM, CREATE, UPDATE, DELETE, FETCH_ALL_ITEM_OBJECTS } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getItems = () => async (dispatch) => {
  try {
    const { data } = await api.fetchItems();

    dispatch({ type: FETCH_ALL_ITEM, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const getItem = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchItem(id);

    dispatch({ type: FETCH_ONE_ITEM, payload: data });
  } catch (error) {
    console.log(error);
  }
}
export const createItem = (item) => async (dispatch) => {
  try {
      const { data } = await api.createItem(item);

      dispatch({ type: CREATE, payload: data });
  } catch (error) {
      console.log(error);
  }
}

export const updateItem = (id, item) => async (dispatch) => {
  try {
      const { data } = await api.updateItem(id, item);
      dispatch({ type: UPDATE, payload: data });
  } catch (error) {
      console.log(error);
  }
}

export const deleteItem = (id) => async (dispatch) => {
  try {
      await api.deleteItem(id);

      dispatch({ type: DELETE, payload: id });
  } catch (error) {
      console.log(error);
  }
}

export const getOrderItemObjects = (order) => async (dispatch) => {
  try {
    const { data } = await api.fetchOrderItemObjects(order);

    dispatch({ type: FETCH_ALL_ITEM_OBJECTS, payload: data });
  } catch (error) {
    console.log(error);
  }
}
