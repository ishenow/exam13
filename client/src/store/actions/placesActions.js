import { toast } from 'react-toastify';
import axiosApi from '../../axiosApi';
import { push } from 'connected-react-router';

export const FETCH_PLACES_SUCCESS = 'FETCH_PLACES_SUCCESS';
export const FETCH_PLACE_SUCCESS = 'FETCH_PLACE_SUCCESS';
export const FETCH_PLACE_FAILURE = 'FETCH_PLACE_FAILURE';


export const fetchPlacesSuccess = places => ({ type: FETCH_PLACES_SUCCESS, places });
export const fetchPlaceSuccess = place => ({ type: FETCH_PLACE_SUCCESS, place });
export const fetchPlaceFailure = error => ({ type: FETCH_PLACE_FAILURE, error });

export const getPlaces = () => {
  return async dispatch => {
    const response = await axiosApi.get('/places');
    dispatch(fetchPlacesSuccess(response.data));
  };
};

export const getPlace = (placeId) => {
  return async dispatch => {
    const response = await axiosApi.get('/places/' + placeId);
    dispatch(fetchPlaceSuccess(response.data));
  };
};

export const placeCreate = (placeData) => {
  return async dispatch => {
    try {
      const response = await axiosApi.post('/places', placeData);
      dispatch(getPlaces(response.data.user._id));
      toast.success('New place created!');
      dispatch(push('/'));
    } catch (error) {
      if (error.response) {
        dispatch(fetchPlaceFailure(error.response.data));
        toast.error('Need to fill in all the fields!');
      } else {
        dispatch(fetchPlaceFailure({ Global: 'No connection' }));
      }
    }
  };
};

export const deletePlace = (placeId) => {
  return async dispatch => {
    await axiosApi.delete('/places/' + placeId);
    toast.success('Place has been deleted');
    dispatch(getPlaces());
    dispatch(push('/'));
  };
};
