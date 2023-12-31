import { Route, Routes } from "react-router-dom";
import {
  Public,
  Home,
  Login,
  Products,
  DetailProduct,
  FAQ,
  DetailCart,
  FinalRegister,
  ResetPassword,
  About,
} from "../pages/public";
import {
  AdminLayout,
  ManageOrder,
  ManageProducts,
  ManageUser,
  CreateProducts,
} from "../pages/admin";
import {
  Checkout,
  History,
  MemberLayout,
  Personal,
  Wishlist,
} from "../pages/member";
import NotFoundPage from "../pages/NotFoundPage";
import path from "../ultils/path";
import Dashboard from "../pages/admin/Dashboard";

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
        <Route path={path.PRODUCTS_CATEGORY} element={<Products />} />
        <Route path={path.DETAIL_CART} element={<DetailCart />} />
        <Route path={path.FAQ} element={<FAQ />} />
        <Route path={path.ABOUT} element={<About />} />
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
      </Route>

      <Route path={path.ADMIN} element={<AdminLayout />}>
        <Route path={path.DASHBOARD} element={<Dashboard />} />
        {/* updated */}
        <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts />} />
        <Route path={path.MANAGE_USER} element={<ManageUser />} />
        <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
        <Route path={path.CREATE_PRODUCTS} element={<CreateProducts />} />
      </Route>

      <Route path={path.MEMBER} element={<MemberLayout />}>
        <Route path={path.PERSONAL} element={<Personal />} />
        <Route path={path.MY_CART} element={<DetailCart />} />
        <Route path={path.WISHLIST} element={<Wishlist />} />
        <Route path={path.HISTORY} element={<History />} />
      </Route>
      <Route path={path.ALL} element={<NotFoundPage />} />
      <Route path={path.CHECK_OUT} element={<Checkout />} />
      <Route path={path.LOGIN} element={<Login />} />
      <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
    </Routes>
  );
}

export default Router;
