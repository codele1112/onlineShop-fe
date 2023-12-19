import React, { Fragment, memo, useState } from "react";
import { NavLink } from "react-router-dom";
import path from "../../ultils/path";
import icons from "../../ultils/icons";
import { adminSidebar, memberSidebar } from "../../ultils/contants";
import clsx from "clsx";
import { useSelector } from "react-redux";
import avatar from "../../assets/avatarDefault01.jpeg";

const { IoReturnUpForward } = icons;
const activedStyle = "px-4 px-2 flex items-center gap-2 bg-third ";
const notActivedStyle = "px-4 py-2 flex items-center gap-2 hover:bg-fourth";
const MemberSidebar = () => {
  const { current } = useSelector((state) => state.user);

  return (
    <div className=" bg-second h-full py-4">
      <div className="w-full flex flex-col items-center justify-center py-4">
        <img
          src={current?.avatar || avatar}
          alt="avatar"
          className="w-20 h-20 object-cover rounded-full "
        />
        <small className="text-[20px]">{current?.name}</small>
      </div>

      <div>
        {memberSidebar.map((el) => (
          <Fragment key={el.id}>
            <NavLink
              to={el.path}
              className={({ isActive }) =>
                clsx(isActive && activedStyle, !isActive && notActivedStyle)
              }
            >
              <span>{el.icon}</span>
              <span>{el.text}</span>
            </NavLink>
          </Fragment>
        ))}
        <NavLink to={`/${path.HOME}`} className={clsx(notActivedStyle)}>
          <IoReturnUpForward size={20} />
          Go Home
        </NavLink>
      </div>
    </div>
  );
};

export default memo(MemberSidebar);
