import { FETCH_ALL_ITEM, FETCH_ONE_ITEM, CREATE, UPDATE, DELETE, FETCH_ALL_ITEM_OBJECTS } from '../constants/actionTypes';

export default (items = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_ITEM:
      return action.payload;
    case FETCH_ALL_ITEM_OBJECTS:
      return action.payload;
    case FETCH_ONE_ITEM:
      return { ...items, item: action.payload };
    case UPDATE:
      return items.map((item) => item.id === action.payload.id ? action.payload : item);  
    case CREATE:
        return [...items, action.payload];  
    case DELETE:
        return {...items.filter((item) => item.id !== action.payload)};
    default:
      return items;
  }
};