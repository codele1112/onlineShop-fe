const path = {
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PRODUCTS: "products",
  PRODUCTS_CATEGORY: ":category",
  ABOUT: "about",
  FAQ: "faqs",
  DETAIL_PRODUCT_CATEGORY_PID_NAME: ":category/:pid/:name",
  FINAL_REGISTER: "final-registration/:status",
  RESET_PASSWORD: "reset-password/:token",
  CHECK_OUT: "check-out/",
  DETAIL_CART: "my-cart/",

  // admin:
  ADMIN: "admin",
  DASHBOARD: "dashboard",
  MANAGE_USER: "manage-user",
  MANAGE_PRODUCTS: "manage-products",
  MANAGE_ORDER: "manage-order",
  CREATE_PRODUCTS: "create-products",

  // member

  MEMBER: "member",
  PERSONAL: "personal",
  MY_CART: "my-cart/",
  HISTORY: "order-history",
  WISHLIST: "wishlist",
};

export default path;
