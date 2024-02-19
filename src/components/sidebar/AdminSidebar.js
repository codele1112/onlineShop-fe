import React, { Fragment, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import path from "../../ultils/path";
import icons from "../../ultils/icons";
import { adminSidebar } from "../../ultils/contants";
import clsx from "clsx";

const { MdKeyboardArrowDown, MdOutlineChevronRight } = icons;
const activedStyle = "px-4 px-2 flex items-center gap-2 bg-third ";
const notActivedStyle = "px-4 py-2 flex items-center gap-2 hover:bg-fourth";
const AdminSidebar = () => {
  const [actived, setActived] = useState([]);
  const handleShowTabs = (tabId) => {
    if (actived.some((el) => el === tabId)) {
      setActived((prev) => prev.filter((el) => el !== tabId));
    } else {
      setActived((prev) => [...prev, tabId]);
    }
  };
  return (
    <div className=" bg-second h-full py-4">
      <Link to={`/${path.HOME}`} className="flex flex-col p-4 gap-2 ">
        <div className="text-center">
          <span className="text-[40px] md:text-[15px] ">G A I A</span>
        </div>
        <span className="text-center py-4 px-4 border-t border-b">
          ADMIN WORKSPACE
        </span>
      </Link>

      <div>
        {adminSidebar.map((el) => (
          <Fragment key={el.id}>
            {el.type === "single" && (
              <NavLink
                to={el.path}
                className={({ isActive }) =>
                  clsx(isActive && activedStyle, !isActive && notActivedStyle)
                }
              >
                <span>{el.icon}</span>
                <span>{el.text}</span>
              </NavLink>
            )}

            {el.type === "parent" && (
              <div
                onClick={() => handleShowTabs(+el.id)}
                className=" flex flex-col"
              >
                <div className="flex items-center justify-between gap-2 px-4 py-2 cursor-pointer ">
                  <div className="flex items-center gap-2">
                    <span>{el.icon}</span>
                    <span>{el.text}</span>
                  </div>
                  {actived.some((id) => id === el.id) ? (
                    <MdKeyboardArrowDown size={20} />
                  ) : (
                    <MdOutlineChevronRight size={20} />
                  )}
                </div>

                {actived.some((id) => +id === +el.id) && (
                  <div className="flex flex-col  ">
                    {el.submenu.map((item) => (
                      <NavLink
                        to={item.path}
                        key={item.text}
                        onClick={(el) => el.stopPropagation()}
                        className={({ isActive }) =>
                          clsx(
                            isActive && activedStyle,
                            !isActive && notActivedStyle,
                            "pl-10"
                          )
                        }
                      >
                        {item.text}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
