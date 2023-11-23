import React, { memo } from "react";
import { HashLoader } from "react-spinners";

const Loading = () => {
  return <HashLoader color="#01352c" />;
};

export default memo(Loading);
