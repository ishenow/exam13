import { FETCH_COMMENTS_SUCCESS } from '../actions/commentsActions';

const initialState = {
  comments: [],
};


const commentsReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENTS_SUCCESS:
      return { ...state, comments: action.comments };
    default:
      return state;
  }
};

export default commentsReducers;
