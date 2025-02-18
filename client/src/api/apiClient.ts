import axiosClient, {
  AxiosRequestConfig,
  CreateAxiosDefaults
} from "axios";

const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export const axiosInstance = axiosClient.create(options);;

// create a separate client for refreshing the access token
// to avoid infinite loops with the error interceptor
export const TokenRefreshClient = axiosClient.create(options);
TokenRefreshClient.interceptors.response.use((response) => response.data);


/**
 * Replaces main `axios` instance with the custom-one.
 *
 * @param cfg - Axios configuration object.
 * @returns A promise object of a response of the HTTP request with the 'data' object already
 * destructured.
 */
const axios = <T>(cfg: AxiosRequestConfig) =>
  axiosInstance.request<any, T>(cfg);

export default axios;
