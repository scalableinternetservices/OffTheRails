import { FETCH_UNPURCHASED_ORDER, UPDATE_ORDER } from '../constants/actionTypes';

export default (orders = {}, action) => {
  switch (action.type) {
    case FETCH_UNPURCHASED_ORDER:
      return { ...orders, order: action.payload };
    case UPDATE_ORDER:
      return orders.map((order) => order.id === action.payload.id ? action.payload : order); 
    default:
      return orders;
  }
};