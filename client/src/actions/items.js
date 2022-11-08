import { FETCH_ALL, CREATE, UPDATE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getItems = () => async (dispatch) => {
  try {
    const { data } = await api.fetchItems();

    dispatch({ type: FETCH_ALL, payload: data });
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
