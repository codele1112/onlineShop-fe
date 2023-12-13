import axios from "../axios";

export const getProducts = (params) =>
  axios({
    url: "/products",
    method: "get",
    params,
  });

export const getProductById = (pid) =>
  axios({
    url: "/products/" + pid,
    method: "get",
  });

export const createOrder = (data) =>
  axios({
    url: "/order/",
    method: "post",
    data,
  });

export const createProducts = (data) =>
  axios({
    url: "/products/",
    method: "post",
    data,
  });
