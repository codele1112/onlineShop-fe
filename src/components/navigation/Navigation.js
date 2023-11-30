import React from "react";
import { navigation } from "../../ultils/contants";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <div className="w-main lg:max-w-[768px] md:max-w-[390px] md:text-[8px] h-[48px] py-2 border text-sm flex items-center justify-between  ">
      {navigation.map((el) => (
        <NavLink
          to={el.path}
          key={el.id}
          className={({ isActive }) =>
            isActive
              ? "pr-12 md:pr-8 hover:text-main text-main"
              : "pr-12 md:pr-8 hover:text-main"
          }
        >
          {el.value}
        </NavLink>
      ))}
    </div>
  );
}

export default Navigation;
