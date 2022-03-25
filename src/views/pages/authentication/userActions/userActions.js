import axios from 'axios';
import Axios from 'axios';
//import Axios from 'axios';
import {
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    
} from '../userConstants/userConstants';
export const signin = (email, password) => async (dispatch) => {
    const baseUrl= process.env.REACT_APP_API_ENDPOINT
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
    const {data} = await axios.post(`${baseUrl}/api/auth/login`, {email, password})
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
     // useJwt .setToken(response.data.accessToken)
      //localStorage.setItem('accessToken', response.data.accessToken);
}
    catch (error) {
      dispatch({
        type: USER_SIGNIN_FAIL,




        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };