import { CREATE_ORDER_ITEM, FETCH_ORDER_ITEMS, UPDATE_ORDER_ITEM, DELETE_ORDER_ITEM } from '../constants/actionTypes';

export default (order_items = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_ITEM:
        return [...order_items, action.payload];  
    case FETCH_ORDER_ITEMS:
      return action.payload;
    case UPDATE_ORDER_ITEM:
      return order_items.map((order_item) => order_item.id === action.payload.id ? action.payload : order_item); 
    case DELETE_ORDER_ITEM:
      return {...order_items.filter((order_item) => order_item.id !== action.payload)};
    default:
      return order_items;
  }
};