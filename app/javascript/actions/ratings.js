import { FETCH_ALL_RATINGS, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getRatings = () => async (dispatch) => {
  try {
    const { data } = await api.fetchRatings();

    dispatch({ type: FETCH_ALL_RATINGS, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const createRating = (rating) => async (dispatch) => {
  try {
      const { data } = await api.createRating(rating);

      dispatch({ type: CREATE, payload: data });
  } catch (error) {
      console.log(error);
  }
}

export const updateRating = (id, rating) => async (dispatch) => {
  try {
      const { data } = await api.updateRating(id, rating);
      dispatch({ type: UPDATE, payload: data });
  } catch (error) {
      console.log(error);
  }
}

export const deleteRating = (id) => async (dispatch) => {
  try {
      await api.deleteRating(id);

      dispatch({ type: DELETE, payload: id });
  } catch (error) {
      console.log(error);
  }
}
