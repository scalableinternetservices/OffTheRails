import { FETCH_ONE } from '../constants/actionTypes';

export default (users = {}, action) => {
  switch (action.type) {
    case FETCH_ONE:
      return { ...users, user: action.payload };
    default:
      return users;
  }
};