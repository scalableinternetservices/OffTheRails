import { FETCH_ALL_RATINGS, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

export default (ratings = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_RATINGS:
      return action.payload;
    case UPDATE:
      return ratings.map((rating) => rating.id === action.payload.id ? action.payload : rating);  
    case CREATE:
        return [...ratings, action.payload];  
    case DELETE:
        return ratings.filter((rating) => rating.id !== action.payload);
    default:
      return ratings;
  }
};