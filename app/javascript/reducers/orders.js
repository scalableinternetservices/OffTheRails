import { FETCH_UNPURCHASED_ORDER } from '../constants/actionTypes';

export default (orders = [], action) => {
  switch (action.type) {
    case FETCH_UNPURCHASED_ORDER:
      return { ...orders, order: action.payload };
    default:
      return orders;
  }
};