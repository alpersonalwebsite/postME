import {
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  SCORE_UP_COMMENT,
  SCORE_DOWN_COMMENT } from '../actions/types';

  export default function(state = [], action) {

    if (action.error !== true) {
      switch (action.type) {
        case RECEIVE_COMMENTS:
        return action.payload.data;

        case ADD_COMMENT:
        return [...state, action.payload.data];

        case EDIT_COMMENT:
        return state.map(element => {
          if (element.id === action.payload.data.id) {
            return {
              ...element,
              body: action.payload.data.body,
              timestamp: action.payload.data.timestamp
            }
          }
          return element
        });

        case DELETE_COMMENT:
        return state.filter(element => element.id !== action.payload.data.id)

        case SCORE_UP_COMMENT:
        return state.map(element => {
          if (element.id === action.payload.data.id) {
            return {
              ...element,
              voteScore: action.payload.data.voteScore
            }
          }
          return element
        });

        case SCORE_DOWN_COMMENT:
        return state.map(element => {
          if (element.id === action.payload.data.id) {
            return {
              ...element,
              voteScore: action.payload.data.voteScore
            }
          }
          return element
        });

        default:
        return state;
      }

    }
  }
