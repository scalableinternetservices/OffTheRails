import { FETCH_ONE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchUser(id);
    dispatch({ type: FETCH_ONE, payload: data });
  } catch (error) {
    console.log(error);
  }
}

