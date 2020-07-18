import { FETCH_PLACE_FAILURE, FETCH_PLACE_SUCCESS, FETCH_PLACES_SUCCESS } from '../actions/placesActions';


const initialState = {
  places: [],
  place: [],
  error: null,
};


const placesReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLACES_SUCCESS:
      return { ...state, places: action.places };
    case FETCH_PLACE_SUCCESS:
      return { ...state, place: action.place };
    case FETCH_PLACE_FAILURE:
      return { ...state, error: action.error };
    default:
      return state;
  }
};

export default placesReducers;
