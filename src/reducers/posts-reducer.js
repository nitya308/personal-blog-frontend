/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { produce } from 'immer';
import { ActionTypes } from '../actions';

const initialState = {
  all: [],
  current: {},
};

// better version that uses a curried immer function
// note: initialState is passed in as second argument rather than default parameter, and no need to return as produce handles that
const PostsReducer = produce((draftState, action = {}) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      draftState.all = action.payload;
      break;
    case ActionTypes.FETCH_POST:
      // eslint-disable-next-line prefer-destructuring
      draftState.current = action.payload;
      break;
    default:
      break;
  }
}, initialState);

export default PostsReducer;
