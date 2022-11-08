import { FETCH_ALL, CREATE, UPDATE } from '../constants/actionTypes';

export default (items = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case UPDATE:
      return items.map((item) => item.id === action.payload.id ? action.payload : item);  
    case CREATE:
        return [...items, action.payload];  
    default:
      return items;
  }
};