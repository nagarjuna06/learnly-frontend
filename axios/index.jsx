import axios from "axios";
import Cookies from "js-cookie";
import { setError } from "../redux/slice/errorSlice";

export const initialAuthenticate = (returned = true) => {
  const token = Cookies.get("_token");
  if (token) {
    axios.defaults.headers.common = {
      Authorization: "Bearer " + token,
    };
  }
  if (returned) {
    return !!token;
  }
};

export const API = import.meta.env.VITE_API;

const setupAxiosInterceptors = (Store) => {
  axios.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      if (!error.response) {
        Store.dispatch(
          setError({
            msg: "Server connection is interrupted",
          })
        );
      } else {
        const { data, status } = error.response;
        if (status === 500) {
          Store.dispatch(setError({ msg: `Error ${status}: ${data.msg}` }));
          return Promise.reject({ msg: null });
        }
      }
      return Promise.reject(error.response.data);
    }
  );
};

export default setupAxiosInterceptors;
