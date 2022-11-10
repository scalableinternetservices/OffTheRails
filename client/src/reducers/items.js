import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

export default (items = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case UPDATE:
      return items.map((item) => item.id === action.payload.id ? action.payload : item);  
    case CREATE:
        return [...items, action.payload];  
    case DELETE:
        return items.filter((item) => item.id !== action.payload);
    default:
      return items;
  }
};