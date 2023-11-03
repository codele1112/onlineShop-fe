import axios from "../axios";

export const register = (data) =>
  axios({
    url: "/users/register",
    method: "post",
    data,
  });

export const login = (data) =>
  axios({
    url: "/auth/login",
    method: "post",
    data,
  });

export const getCurrentUser = () =>
  axios({
    url: "/users/me",
    method: "get",
  });
