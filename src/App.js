import React, { useEffect } from "react";
import Router from "./routes";
import { Cart } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "./store/categories/asyncActions";
import { showCart } from "./store/categories/categoriesSlice";
import { Modal } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChidren, isShowCart } = useSelector(
    (state) => state.categories
  );
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className=" font-main relative">
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
