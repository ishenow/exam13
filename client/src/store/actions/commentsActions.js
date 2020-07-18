import axiosApi from '../../axiosApi';
import { toast } from 'react-toastify';

export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';

export const fetchCommentsSuccess = comments => ({ type: FETCH_COMMENTS_SUCCESS, comments });

export const getComments = (placeId) => {
  return async dispatch => {
    const response = await axiosApi.get('/comments/' + placeId);
    dispatch(fetchCommentsSuccess(response.data));
  };
};

export const commentsCreate = (commentsData) => {
  return async (dispatch, getState) => {
    const token = getState().users.user.token;
    const placeId = commentsData.place;
    await axiosApi.post('/comments', commentsData, { headers: { 'Authorization': token } });
    dispatch(getComments(placeId));
  };
};

export const deleteComments = (commentId, placeId) => {
  return async dispatch => {
    await axiosApi.delete('/comments/' + commentId);
    toast.success('Comment has been deleted');
    dispatch(getComments(placeId));
  };
};
