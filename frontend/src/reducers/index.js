import { combineReducers } from 'redux';
import CategoryReducer from './category';
import PostReducer from './post';
import CommentReducer from './comment';

const rootReducer = combineReducers({
  categories: CategoryReducer,
  posts: PostReducer,
  comments: CommentReducer
});

export default rootReducer;
