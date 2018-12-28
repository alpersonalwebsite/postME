import { RECEIVE_CATEGORIES } from '../actions/types';

export default function(state = [], action) {
  if (action.error !== true) {
    switch (action.type) {
      case RECEIVE_CATEGORIES:
      return action.payload.data.categories;
      default:
      return state;
    }
  }
}
