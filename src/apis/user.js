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

export const forgotPassword = (data) =>
  axios({
    url: "/auth/forgotpassword",
    method: "get",
    data,
  });
export const getCurrentUser = () =>
  axios({
    url: "/users/me",
    method: "get",
  });

export const getUsers = (params) =>
  axios({
    url: "/users",
    method: "get",
    params,
  });

export const updateUser = (data, uid) =>
  axios({
    url: "/users/" + uid,
    method: "put",
    data,
  });

export const deleteUser = (uid) =>
  axios({
    url: "/users/" + uid,
    method: "delete",
  });

export const updateCart = (data) =>
  axios({
    url: "/users/cart/",
    method: "put",
    data,
  });

export const removeProductInCart = (pid) =>
  axios({
    url: "/users/remove-cart/" + pid,
    method: "delete",
  });
