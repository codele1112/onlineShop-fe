import React from "react";
import { useParams, Navigate } from "react-router-dom";
import path from "../../ultils/path";

const FinalRegister = () => {
  const { status } = useParams();
  return <Navigate to={`/${path.LOGIN}`} state={status} />;
};

export default FinalRegister;
