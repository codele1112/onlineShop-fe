import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";
import icons from "../../ultils/icons";

const { MdArrowForwardIos } = icons;

const Breadcrumb = ({ name, category }) => {
  // console.log("category", category);
  const routes = [
    { path: "/:category", breadcrumb: category },
    { path: "/", breadcrumb: "Home" },
    { path: "/:category/:pid/:name", breadcrumb: name },
  ];
  const breadcrumb = useBreadcrumbs();
  // console.log("breadcrumb", breadcrumb);
  return (
    <div className="text-sm flex items-center gap-1">
      {breadcrumb
        ?.filter((el) => !el.match.route === false)
        .map(({ match, breadcrumb }, index, self) => (
          <Link
            className="flex items-center hover:text-main gap-1"
            key={match.pathname}
            to={match.pathname}
          >
            <span className=" capitalize">{breadcrumb}</span>

            {index !== self.length - 1 && <MdArrowForwardIos />}
          </Link>
        ))}
    </div>
  );
};

export default Breadcrumb;
