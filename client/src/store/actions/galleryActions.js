import axiosApi from '../../axiosApi';
import { toast } from 'react-toastify';

export const FETCH_GALLERY_SUCCESS = 'FETCH_GALLERY_SUCCESS';


export const fetchGallerySuccess = gallery => ({ type: FETCH_GALLERY_SUCCESS, gallery });

export const getGallery = (placeId) => {
  return async dispatch => {
    const response = await axiosApi.get('/gallery/' + placeId);
    dispatch(fetchGallerySuccess(response.data));
  };
};

export const addImage = (imageData, placeId) => {
  return async dispatch => {
    await axiosApi.post('/gallery', imageData);
    dispatch(getGallery(placeId));
  };
};

export const deleteGallery = (galleryId, placeId) => {
  return async dispatch => {
    await axiosApi.delete('/gallery/' + galleryId);
    toast.success('Image has been deleted');
    dispatch(getGallery(placeId));
  };
};
