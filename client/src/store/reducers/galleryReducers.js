import { FETCH_GALLERY_SUCCESS } from '../actions/galleryActions';


const initialState = {
  gallery: [],
};


const galleryReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GALLERY_SUCCESS:
      return { ...state, gallery: action.gallery };
    default:
      return state;
  }
};

export default galleryReducers;
