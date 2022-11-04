import { FETCH_ALL } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getItems = () => async (dispatch) => {
    try {
      const { data } = await api.fetchItems();
  
      dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
      console.log(error);
    }
  };