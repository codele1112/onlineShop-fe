import React, { useState } from "react";
import { Button } from "../../components";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../apis";
import { toast } from "react-toastify";
import path from "../../ultils/path";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    const response = await resetPassword({ password, token });
    console.log(response);

    if (response.success) {
      toast.success(response.message, { theme: "colored" });
      navigate(`/${path.LOGIN}`);
    } else {
      toast.info(response.message, { theme: "colored" });
    }
  };
  return (
    <div>
      <div className="absolute top-0 left-0 bottom-0 bg-white right-0 py-8 flex flex-col items-center  z-50">
        <div className="flex flex-col gap-4">
          <label htmlFor="email">Please enter your new password:</label>
          <input
            type="text"
            id="email"
            className="w-[800px] lg:max-w-[700px] md:max-w-[350px] pb-2 border-b outline-none placeholder:text-sm"
            placeholder="Your new password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center justify-end w-full gap-2">
            <Button children={"Submit"} handleOnClick={handleResetPassword} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
