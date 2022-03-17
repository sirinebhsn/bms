import axios from 'axios';
//import Axios from 'axios';
import {
 
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    
} from '../userConstants/userConstants';
export const signin = (email, password) => async (dispatch) => {
    const API_ENDPOINT= process.env.REACT_APP_API_ENDPOINT
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
      const { data } = await axios.get(`${API_ENDPOINT}/sanctum/csrf-cookie`).then(() => {
        axios.post(`${API_ENDPOINT}/api/auth/login`, { email, password }).then(response => { 
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem("userData", JSON.stringify(data))
    });
})}catch (error) {
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };