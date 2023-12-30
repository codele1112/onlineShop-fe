import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categories/categoriesSlice";
import productsSlice from "./products/productsSlice";
import userSlice from "./user/userSlice";
const commonConfig = {
  storage: storage,
};

const userConfig = {
  ...commonConfig,
  whitelist: ["isLoggedIn", "token", "current", "currentCart"],
  key: "shop/user",
};

const productConfig = {
  ...commonConfig,
  whitelist: ["dealDaily"],
  key: "shop/deal",
};

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    products: persistReducer(productConfig, productsSlice),
    user: persistReducer(userConfig, userSlice),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
