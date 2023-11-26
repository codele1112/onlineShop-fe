import React from "react";
import { NavLink } from "react-router-dom";
import { createSlug } from "../../ultils/helpers";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { categories } = useSelector((state) => state.categories);

  // console.log("categories", categories);
  return (
    <div className="flex flex-col border">
      <span className=" md:text-[8px] flex gap-2 items-center justify-center w-full bg-main text-white font-medium py-2">
        ALL CATEGORIES
      </span>
      {categories?.map((el) => (
        <NavLink
          key={createSlug(el.name)}
          to={createSlug(el.name)}
          className={({ isActive }) =>
            isActive
              ? "text-[20px] md:text-[10px] bg-main text-white px-5 pt-[15px] pb-[14px] hover:text-main"
              : "text-[20px] md:text-[10px] px-5 pt-[15px] pb-[14px] text-sm hover:text-main"
          }
        >
          {el.name}
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
