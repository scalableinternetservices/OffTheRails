import { FETCH_ALL_RATINGS, CREATE_RATINGS, UPDATE_RATINGS, DELETE_RATINGS } from '../constants/actionTypes';

export default (ratings = [], action) => {
  switch (action.type) {
    case FETCH_ALL_RATINGS:
      return action.payload;
    case UPDATE_RATINGS:
      return ratings.map((rating) => rating.id === action.payload.id ? action.payload : rating);  
    case CREATE_RATINGS:
      return [...ratings, action.payload];  
    case DELETE_RATINGS:
      return ratings.filter((rating) => rating.id !== action.payload);
    default:
      return ratings;
  }
};