import React, { useCallback, useEffect, useState } from "react";
import { InputForm, Pagination } from "../../components";
import { useForm } from "react-hook-form";
import { deleteProduct, getProducts } from "../../apis";
import moment from "moment";
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import useDebounce from "../../components/hooks/useDebounce";
import UpdateProduct from "./UpdateProduct";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    watch,
    formState: { errors },
  } = useForm();

  const [params] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [editProduct, setEditProduct] = useState(null);
  const [update, setUpdate] = useState(false);

  const renderUpdateProduct = useCallback(() => {
    setUpdate(!update);
    // eslint-disable-next-line
  }, []);

  const fetchProducts = async (params) => {
    const response = await getProducts({
      ...params,
      limit: process.env.REACT_APP_PRODUCT_LIMIT || 10,
    });

    if (response.success) {
      setCount(response.data.count);
      setProducts(response.data.products);
    }
  };

  const queryDebounce = useDebounce(watch("q"), 800);

  useEffect(() => {
    if (queryDebounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: queryDebounce }).toString(),
      });
    } else {
      navigate({
        pathname: location.pathname,
      });
    }
    // eslint-disable-next-line
  }, [queryDebounce]);

  useEffect(() => {
    const searchParams = Object.fromEntries([...params]);
    fetchProducts(searchParams);
    // eslint-disable-next-line
  }, [params, update]);

  const handleDeleteProduct = async (pid) => {
    Swal.fire({
      title: "Delete product...",
      text: "Are you sure to remove this product forever?",
      icon: "warning",
      showCancelButton: true,
    }).then(async (rs) => {
      const response = await deleteProduct(pid);
      if (rs.isConfirmed) {
        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
        renderUpdateProduct();
      }
    });
  };
  return (
    <div className="w-full flex flex-col gap-4 relative">
      {editProduct && (
        <div className="absolute inset-0 min-h-screen bg-white z-50">
          <UpdateProduct
            editProduct={editProduct}
            renderUpdateProduct={renderUpdateProduct}
            setEditProduct={setEditProduct}
          />
        </div>
      )}
      <div className="h-[70px] w-full"></div>
      <div className="p-4 border-b bg-white w-full flex justify-between items-center fixed top-0">
        <h1 className=" text-3xl tracking-tighter ">Products</h1>
      </div>

      <div className="flex justify-end items-center px-4">
        <form className="w-[45%]">
          <InputForm
            id="q"
            register={register}
            errors={errors}
            fullWidth
            placeholder="Search product by name..."
          />
        </form>
      </div>

      <table className="table-auto text-left mb-6 w-full ">
        <thead className="text-red-900 text-[13px] border-b bg-second">
          <tr className="border ">
            <th className="text-center px-4 py-2">#</th>
            <th className="text-center px-4 py-2">Thumbnail</th>
            <th className=" px-4 py-2">Name</th>
            <th className=" px-4 py-2">Category</th>
            <th className="text-center px-4 py-2">Price</th>
            <th className="text-center px-4 py-2">Quantity</th>
            <th className="text-center px-4 py-2">Sold</th>
            <th className="text-center px-4 py-2">Ratings</th>
            <th className="text-center px-4 py-2">Updated At</th>
            <th className="text-center px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products?.length &&
            products?.map((el, index) => (
              <tr className="border-b" key={index}>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <img
                    src={el.thumb}
                    alt="thumb"
                    className="w-12 h-12 object-cover"
                  />
                </td>
                <td className=" px-4 py-2">{el.name}</td>
                <td className=" px-4 py-2">{el.category.name}</td>
                <td className="text-center px-4 py-2">{el.price}</td>
                <td className="text-center px-4 py-2">{el.quantity}</td>
                <td className="text-center px-4 py-2">{el.sold}</td>
                <td className="text-center px-4 py-2">{el.totalRatings}</td>
                <td className="text-center px-4 py-2">
                  {moment(el.updatedAt).format("DD/MM/YYYY")}
                </td>
                <td>
                  <span
                    onClick={() => setEditProduct(el)}
                    className="text-blue-600 hover:text-red-600 text-sm cursor-pointer px-1"
                  >
                    Edit
                  </span>
                  <span
                    onClick={() => handleDeleteProduct(el._id)}
                    className="text-blue-600 hover:text-red-600 text-sm cursor-pointer px-1"
                  >
                    Remove
                  </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="w-full flex justify-end my-8">
        <Pagination totalCount={count} />
      </div>
    </div>
  );
};

export default ManageProducts;
