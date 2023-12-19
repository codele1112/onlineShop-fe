import React, { useEffect } from "react";
import Router from "./routes";
import { Cart, Modal } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "./store/categories/asyncActions";
import { showCart } from "./store/categories/categoriesSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DetailProduct } from "./pages/public";

function App() {
  const dispatch = useDispatch();
  const { isShowModal, detailProduct, isShowCart } = useSelector(
    (state) => state.categories
  );
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // console.log("detailProduct", detailProduct);
  return (
    <div className=" font-main h-screen relative">
      {isShowCart && (
        <div
          onClick={() => dispatch(showCart())}
          className="absolute inset-0 bg-overlay z-50 flex justify-end"
        >
          <Cart />
        </div>
      )}

      <Router />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="colored"
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {isShowModal && (
        <Modal>
          <DetailProduct
            isQuickview={!detailProduct.isQuickview}
            data={detailProduct?.data}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
