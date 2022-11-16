import { FETCH_ALL_RATINGS, CREATE_RATINGS, UPDATE_RATINGS, DELETE_RATINGS } from '../constants/actionTypes';
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

      dispatch({ type: CREATE_RATINGS, payload: data });
  } catch (error) {
      console.log(error);
  }
}

export const updateRating = (id, rating) => async (dispatch) => {
  try {
      const { data } = await api.updateRating(id, rating);
      dispatch({ type: UPDATE_RATINGS, payload: data });
  } catch (error) {
      console.log(error);
  }
}

export const deleteRating = (id) => async (dispatch) => {
  try {
      await api.deleteRating(id);

      dispatch({ type: DELETE_RATINGS, payload: id });
  } catch (error) {
      console.log(error);
  }
}
