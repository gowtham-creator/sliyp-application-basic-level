import api from "../../api"
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, SAVE_PROFILE } from "./actionTypes"
import { toast } from "react-toastify";
import {useSelector} from "react-redux";

export const postLoginData = (email, password,otp) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const { data } = await api.post('/user/login', { email, password,otp });
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('token', data.token);
    toast.success(data.msg);

  }
  catch (error) {
    const msg = error.response?.data || error.message;
    dispatch({
      type: LOGIN_FAILURE,
      payload: { msg }
    })
    toast.error(msg);
  }
}



export const saveProfile = (token) => async (dispatch) => {
  try {
    const { data } = await api.get('/user/profile', {
      headers: { Authorization: "Bearer "+token }
    });
    dispatch({
      type: SAVE_PROFILE,
      payload: { user: data, token },
    });
  }
  catch (error) {
    // console.log(error);
  }
}



export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: LOGOUT });
  document.location.href = '/';
}