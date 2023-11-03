import axios from "../axios";

export const getProducts = (params) =>
  axios({
    url: "/products/",
    method: "get",
    params,
  });

export const getProductById = (pid) =>
  axios({
    url: "/products/" + pid,
    method: "get",
  });
