import React, { useEffect, useState } from "react";
import { getUsers } from "../../apis/user";
import moment from "moment";

const ManageUser = () => {
  const [users, setUsers] = useState(null);
  const fetchUsers = async (params) => {
    const response = await getUsers(params);
    console.log("users response", response);
    if (response.success) setUsers(response);
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="w-full">
      <h1 className="h-[75px] flex justify-between items-center px-4 border-b text-3xl">
        <span>Manage Users</span>
      </h1>
      <div className="w-full">
        <table className="table-auto text-left mb-6 w-full">
          <thead className="text-red-900 border-b ">
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
          <tbody>
            {users?.data?.users?.map((el, index) => (
              <tr key={index} className="border ">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{el.email}</td>
                <td className="px-4 py-2">{el.name}</td>
                <td className="px-4 py-2">{el.role}</td>
                <td className="px-4 py-2">{el.phone}</td>
                <td className="px-4 py-2">
                  {el.isBlocked ? "Blocked" : "Active"}
                </td>
                <td className="px-4 py-2">
                  {moment(el.createdAt).format("DD/MM/YYYY")}
                </td>
                <td className="px-4 py-2">
                  <span className="px-2 text-orange-700 hover:underline cursor-pointer">
                    Edit
                  </span>
                  <span className="px-2 text-orange-700 hover:underline cursor-pointer">
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUser;
