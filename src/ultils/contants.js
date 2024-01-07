import path from "./path";
import icons from "./icons";

export const navigation = [
  {
    id: 1,
    value: "HOME",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    value: "PRODUCTS",
    path: `/${path.PRODUCTS}`,
  },

  {
    id: 3,
    value: "ABOUT",
    path: `/${path.ABOUT}`,
  },
  {
    id: 4,
    value: "FAQs",
    path: `/${path.FAQ}`,
  },
];

export const roles = [
  { code: "admin", value: "admin" },
  { code: "user", value: "user" },
];
export const status = [
  { code: true, value: "Blocked" },
  { code: false, value: "Active" },
];

export const productInfoTabs = [
  { id: 1, name: "DESCRIPTION" },
  { id: 2, name: "DELIVERY" },
  { id: 3, name: "PAYMENT" },
  { id: 4, name: "CUSTOMER'S REVIEWS" },
];

export const sorts = [
  { id: 1, value: "-sold", text: "Best selling" },
  { id: 2, value: "-name", text: "Alphabeltically,Z-A" },
  { id: 3, value: "name", text: "Alphabeltically,A-Z" },
  { id: 4, value: "-price", text: "Price, high to low" },
  { id: 5, value: "price", text: "Price, low to high" },
  { id: 6, value: "-createdAt", text: "Date, old to new" },
  { id: 7, value: "createdAt", text: "Date, new to old" },
];

const {
  AiOutlineDashboard,
  MdGroups,
  LiaProductHunt,
  RiBillLine,
  AiOutlineShoppingCart,
  AiFillHeart,
  LiaUserCogSolid,
} = icons;

export const adminSidebar = [
  {
    id: 1,
    type: "single",
    text: "Dashboard",
    path: `/${path.ADMIN}/${path.DASHBOARD}`,
    icon: <AiOutlineDashboard size={20} />,
  },
  {
    id: 2,
    type: "single",
    text: "Users",
    path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    icon: <MdGroups size={20} />,
  },
  {
    id: 3,
    type: "parent",
    text: "Products",
    icon: <LiaProductHunt size={20} />,
    submenu: [
      {
        text: "Create Product",
        path: `/${path.ADMIN}/${path.CREATE_PRODUCTS}`,
      },
      {
        text: "Manage Product",
        path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`,
      },
    ],
  },
  {
    id: 4,
    type: "single",
    text: "Orders",
    path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
    icon: <RiBillLine size={20} />,
  },
];

export const memberSidebar = [
  {
    id: 1,
    text: "Personal",
    path: `/${path.MEMBER}/${path.PERSONAL}`,
    icon: <LiaUserCogSolid size={20} />,
  },

  {
    id: 2,
    text: "Wishlist",
    path: `/${path.MEMBER}/${path.WISHLIST}`,
    icon: <AiFillHeart size={20} />,
  },
  {
    id: 3,
    text: "My cart",
    path: `/${path.MEMBER}/${path.MY_CART}`,
    icon: <AiOutlineShoppingCart size={20} />,
  },
  {
    id: 4,
    text: "History",
    path: `/${path.MEMBER}/${path.HISTORY}`,
    icon: <RiBillLine size={20} />,
  },
];

export const statusOrders = [
  { label: "Cancelled", value: "Cancelled" },
  { label: "Succeed", value: "Succeed" },
];
