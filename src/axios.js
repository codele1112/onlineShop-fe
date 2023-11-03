import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URI,
});
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log("config", config);
    let localStorageData = window.localStorage.getItem("persist:shop/user");

    if (localStorageData && typeof localStorageData === "string") {
      // console.log("localStorage", localStorageData);
      localStorageData = JSON.parse(localStorageData);
      const accessToken = localStorageData["token"].replaceAll(`\"`, "");
      // console.log("token", accessToken);

      config.headers = { authorization: `Bearer ${accessToken}` };
      // console.log(config.headers);
      return config;
    } else return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
