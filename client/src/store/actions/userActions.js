import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import axiosApi from '../../axiosApi';

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER = 'LOGOUT_USER';

const registerUserSuccess = (user) => ({ type: REGISTER_USER_SUCCESS, user });

const registerUserFailure = error => ({ type: REGISTER_USER_FAILURE, error });

const loginUserSuccess = user => ({ type: LOGIN_USER_SUCCESS, user });
const loginUserFailure = error => ({ type: LOGIN_USER_FAILURE, error });

export const logoutUser = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().users.user.token;
      const config = { headers: { 'Authorization': token } };

      await axiosApi.delete('/users/sessions', config);
      dispatch({ type: LOGOUT_USER });
      toast.success('You are logged out!');
    } catch (error) {
      toast.error('Could not logged!');
    }
  };
};

export const registerUser = userData => {
  return async dispatch => {
    try {
      const response = await axiosApi.post('/users', userData);
      dispatch(registerUserSuccess(response.data.user));
      toast.success('New user created!');
      dispatch(push('/'));
    } catch (error) {
      if (error.response) {
        dispatch(registerUserFailure(error.response.data));
      } else {
        dispatch(registerUserFailure({ global: 'No connection' }));
      }
    }
  };
};

export const loginUser = userData => {
  return async dispatch => {
    try {
      const response = await axiosApi.post('/users/sessions', userData);
      dispatch(loginUserSuccess(response.data.user));
      toast.success('You are logged in!');
      dispatch(push('/'));
    } catch (error) {
      if (error.response) {
        dispatch(loginUserFailure(error.response.data));
      } else {
        dispatch(loginUserFailure({ global: 'No connection' }));
      }
    }
  };
};
