import { CREATE_ORDER_ITEM, FETCH_ORDER_ITEMS } from '../constants/actionTypes';

export default (order_items = [], action) => {
  switch (action.type) {
    case CREATE_ORDER_ITEM:
        return [...order_items, action.payload];  
    case FETCH_ORDER_ITEMS:
      return action.payload;
    default:
      return order_items;
  }
};