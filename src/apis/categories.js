import axios from "../axios";

export const getCategories = () =>
  axios({
    url: "/productcategories",
    method: "get",
  });
