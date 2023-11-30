import React, { useCallback, useEffect, useState } from "react";
import { getUsers, updateUser, deleteUser } from "../../apis/user";
import moment from "moment";
import {
  InputField,
  Pagination,
  InputForm,
  Select,
  Button,
} from "../../components";
import useDebounce from "../../components/hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { roles, status } from "../../ultils/contants";

const ManageUser = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    email: "",
    name: "",
    role: "",
    phone: "",
    isBlocked: "",
  });

  const [users, setUsers] = useState(null);
  const [update, setUpdate] = useState(false);
  const [queries, setQueries] = useState({ q: "" });
  const [params] = useSearchParams();
  const [editEl, setEditEl] = useState(null);
  const fetchUsers = async (params) => {
    const response = await getUsers(params);
    // console.log("users response", response);

    if (response.success) setUsers(response);
  };

  const queriesDebounce = useDebounce(queries.q, 800);

  const renderPage = useCallback(() => {
    setUpdate(!update);
  }, [update]);
  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (queriesDebounce) queries.q = queriesDebounce;
    fetchUsers(queries);
  }, [queriesDebounce, params, update]);

  const handleUpdateUser = async (data) => {
    const response = await updateUser(data, editEl._id);
    // console.log("response", response);
    if (response.success) {
      setEditEl(null);
      renderPage();
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const handleDeleteUser = (uid) => {
    Swal.fire({
      title: "Confirm delete user...",
      text: "Are you sure to delete this user forever?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteUser(uid);
        if (response.success) {
          renderPage();
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      }
    });
  };

  // console.log(queries.q);
  // console.log("users", users);
  // console.log("editEl", editEl);
  return (
    <div className="w-full">
      <h1 className="h-[75px] flex justify-between items-center px-4 border-b text-3xl">
        <span>Manage Users</span>
      </h1>
      <div className="w-full p-4">
        <div className="flex justify-end py-4">
          <InputField
            nameKey={"q"}
            value={queries.q}
            setValue={setQueries}
            placeholder={"Search by name or email..."}
            isHideLabel
          />
        </div>

        <form onSubmit={handleSubmit(handleUpdateUser)}>
          {editEl && <Button children={"Update"} type="submit" />}

          <table className="table-auto text-left mb-6 w-full">
            <thead className="text-red-900 text-[13px] border-b bg-second">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Email address</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Created At</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>

            <tbody className="text-[13px]">
              {users?.data?.users?.map((el, index) => (
                <tr key={index} className="border ">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    {editEl?._id === el._id ? (
                      <InputForm
                        register={register}
                        errors={errors}
                        id={"email"}
                        defaultValue={editEl?.email}
                        validate={{
                          required: true,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        }}
                        fullWidth
                      />
                    ) : (
                      <span>{el.email}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editEl?._id === el._id ? (
                      <InputForm
                        register={register}
                        errors={errors}
                        defaultValue={editEl?.name}
                        id={"name"}
                        validate={{ required: "Required." }}
                        fullWidth
                      />
                    ) : (
                      <span>{el.name}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editEl?._id === el._id ? (
                      <Select
                        register={register}
                        errors={errors}
                        defaultValue={el.role}
                        id={"role"}
                        validate={{ required: "Required." }}
                        fullWidth
                        options={roles}
                      />
                    ) : (
                      <span> {el.role}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editEl?._id === el._id ? (
                      <InputForm
                        register={register}
                        errors={errors}
                        defaultValue={editEl?.phone}
                        id={"phone"}
                        validate={{
                          required: "Required.",
                          pattern: {
                            value: /^[62|0]+\d{9}/gi,
                            message: "invalid phone number",
                          },
                        }}
                        fullWidth
                      />
                    ) : (
                      <span>{el.phone}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editEl?._id === el._id ? (
                      <Select
                        register={register}
                        errors={errors}
                        defaultValue={el.isBlocked}
                        id={"isBlocked"}
                        validate={{ required: "Required." }}
                        fullWidth
                        options={status}
                      />
                    ) : (
                      <span> {el.isBlocked ? "Blocked" : "Active"}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {moment(el.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="px-4 py-2">
                    {editEl?._id === el._id ? (
                      <span
                        onClick={() => setEditEl(null)}
                        className="px-2 text-orange-700 hover:underline cursor-pointer"
                      >
                        Back
                      </span>
                    ) : (
                      <span
                        onClick={() => setEditEl(el)}
                        className="px-2 text-orange-700 hover:underline cursor-pointer"
                      >
                        Edit
                      </span>
                    )}
                    <span
                      onClick={() => handleDeleteUser(el._id)}
                      className="px-2 text-orange-700 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>

        {/* <div className="w-ful text-right">
          <Pagination totalCount={}/>
        </div> */}
      </div>
    </div>
  );
};

export default ManageUser;
