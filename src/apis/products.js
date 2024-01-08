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

export const getUserOrders = () =>
  axios({
    url: "order/",
    method: "get",
  });

export const getOrders = () =>
  axios({
    url: "order/admin",
    method: "get",
  });

export const createProducts = (data) => {
  axios({
    url: "/products/",
    method: "post",
    data,
  });
};

export const updateProduct = (data, pid) =>
  axios({
    url: "/products/" + pid,
    method: "put",
    data,
  });
export const deleteProduct = (pid) =>
  axios({
    url: "/products/" + pid,
    method: "delete",
  });
