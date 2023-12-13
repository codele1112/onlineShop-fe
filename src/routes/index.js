import { Route, Routes } from "react-router-dom";
import {
  Public,
  Home,
  Login,
  Products,
  Blogs,
  Services,
  DetailProduct,
  FAQ,
  DetailCart,
  FinalRegister,
} from "../pages/public";
import {
  AdminLayout,
  Dashboard,
  ManageOrder,
  ManageProducts,
  ManageUser,
  CreateProducts,
} from "../pages/admin";
import { Checkout, MemberLayout, Personal } from "../pages/member";
import NotFoundPage from "../pages/NotFoundPage";
import path from "../ultils/path";

function Router() {
  return (
    <Routes>
      <Route path={path.CHECK_OUT} element={<Checkout />} />

      <Route path={path.PUBLIC} element={<Public />}>
        <Route path={path.HOME} element={<Home />} />
        <Route
          path={path.DETAIL_PRODUCT_CATEGORY_PID_NAME}
          element={<DetailProduct />}
        />
        <Route path={path.PRODUCTS} element={<Products />} />
        <Route path={path.DETAIL_CART} element={<DetailCart />} />
        <Route path={path.BLOGS} element={<Blogs />} />
        <Route path={path.FAQ} element={<FAQ />} />
        <Route path={path.FINAL_REGISTER} element={<Services />} />
        <Route path={path.OUR_SERVICE} element={<FinalRegister />} />
        {/* <Route path={path.RESET_PASSWORD} element={<ResetPassword />} /> */}
      </Route>

      <Route path={path.ADMIN} element={<AdminLayout />}>
        <Route path={path.DASHBOARD} element={<Dashboard />} />
        <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts />} />
        <Route path={path.MANAGE_USER} element={<ManageUser />} />
        <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
        <Route path={path.CREATE_PRODUCTS} element={<CreateProducts />} />
      </Route>

      <Route path={path.MEMBER} element={<MemberLayout />}>
        <Route path={path.PERSONAL} element={<Personal />} />
      </Route>
      <Route path={path.ALL} element={<NotFoundPage />} />
      <Route path={path.LOGIN} element={<Login />} />
      {/* <Route path={path.FINAL_REGISTER} element={<FinalRegister />}/> */}
    </Routes>
  );
}

export default Router;
