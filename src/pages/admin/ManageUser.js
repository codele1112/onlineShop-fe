import React, { useEffect, useState } from "react";
import { getUsers } from "../../apis/user";
import moment from "moment";
import { InputField, Pagination } from "../../components";
import useDebounce from "../../components/hooks/useDebounce";
import { useSearchParams } from "react-router-dom";

const ManageUser = () => {
  const [users, setUsers] = useState(null);
  const [count, setCount] = useState(null);
  const [queries, setQueries] = useState({ q: "" });
  const [params] = useSearchParams();
  const fetchUsers = async (params) => {
    const response = await getUsers(params);

    if (response.success) {
      setUsers(response);
      setCount(response.data.count);
    }
  };

  const queriesDebounce = useDebounce(queries.q, 800);

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (queriesDebounce) queries.q = queriesDebounce;
    fetchUsers(queries);
  }, [queriesDebounce, params]);

  return (
    <div>
      <div className="h-[70px] w-full"></div>
      <div className="p-4 border-b w-full bg-white flex justify-between items-center fixed top-0">
        <h1 className="text-3xl tracking-tighter ">Users</h1>
      </div>
      <div className="p-4">
        <div className="flex justify-end py-4">
          <InputField
            nameKey={"q"}
            value={queries.q}
            setValue={setQueries}
            placeholder={"Search by name or email..."}
            isHideLabel
          />
        </div>

        <form>
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
              </tr>
            </thead>

            <tbody className="text-[13px]">
              {users?.data?.users?.map((el, index) => (
                <tr key={index} className="border ">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    <span>{el.email}</span>
                  </td>
                  <td className="px-4 py-2">
                    <span>{el.name}</span>
                  </td>
                  <td className="px-4 py-2">
                    <span> {el.role}</span>
                  </td>
                  <td className="px-4 py-2">
                    <span>{el.phone}</span>
                  </td>
                  <td className="px-4 py-2">
                    <span> {el.isBlocked ? "Blocked" : "Active"}</span>
                  </td>
                  <td className="px-4 py-2">
                    {moment(el.createdAt).format("DD/MM/YYYY")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>

        <div className="w-ful text-right">
          <Pagination totalCount={count} />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
