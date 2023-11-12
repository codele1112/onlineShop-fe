import React, { useEffect } from "react";
import Router from "./routes";
import { Cart } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "./store/categories/asyncActions";
import { Modal } from "@mui/base";
import { showCart } from "./store/categories/categoriesSlice";

function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChidren, isShowCart } = useSelector(
    (state) => state.categories
  );
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="h-screen font-main relative">
      {isShowCart && (
        <div
          onClick={() => dispatch(showCart())}
          className="absolute inset-0 bg-overlay z-50 flex justify-end"
        >
          <Cart />
        </div>
      )}

      {isShowModal && <Modal>{modalChidren}</Modal>}

      <Router />
    </div>
  );
}

export default App;
