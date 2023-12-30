import React, { useState, useCallback, useEffect } from "react";
import { InputField, Button, Loading } from "../../components";
import { login, register, forgotPassword } from "../../apis";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import path from "../../ultils/path";
import { userLogin } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/categories/categoriesSlice";
import { validate } from "../../ultils/helpers";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  // const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      name: "",
      phone: "",
    });
  };
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    const response = await forgotPassword({ email });
    if (response.success) {
      toast.success("Please check your mail!", { theme: "colored" });
    } else {
      toast.info(response.message, { theme: "colored" });
    }
  };

  useEffect(() => {
    resetPayload();
  }, [isRegister]);

  const handleSubmit = useCallback(async () => {
    const { name, phone, ...data } = payload;
    const invalids = isRegister
      ? validate(payload, setInvalidFields)
      : validate(data, setInvalidFields);

    if (invalids === 0) {
      if (isRegister) {
        dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
        const response = await register(payload);
        dispatch(showModal({ isShowModal: false, modalChildren: null }));
        // console.log("register", response);

        if (response.success) {
          Swal.fire("Congratulations!", response.message, "success").then(
            () => {
              setIsRegister(false);
              resetPayload();
            }
          );
        } else {
          Swal.fire("Oops!", response.message, "error");
        }
      } else {
        const rs = await login(data);

        if (rs.success) {
          dispatch(
            userLogin({
              isLoggedIn: true,
              token: rs.data.accessToken,
              user: rs.data.userData,
            })
          );
          searchParams.get("redirect")
            ? navigate(searchParams.get("redirect"))
            : navigate(`/${path.HOME}`);
        } else {
          Swal.fire("Oops!", rs.message, "error");
        }
      }
    }
    // eslint-disable-next-line
  }, [payload, isRegister, dispatch, navigate]);

  return (
    <div className="w-screen h-screen relative">
      {isForgotPassword && (
        <div className="absolute top-0 left-0 bottom-0 bg-white right-0 py-8 flex flex-col items-center  z-50">
          <div className="flex flex-col gap-4">
            <label htmlFor="email">Please enter your email:</label>
            <input
              type="text"
              id="email"
              className="w-[800px] lg:max-w-[700px] md:max-w-[350px] pb-2 border-b outline-none placeholder:text-sm"
              placeholder="Your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center justify-end w-full gap-2">
              <Button
                children={"Submit"}
                // eslint-disable-next-line
                style={"py-2 px-4 rounded-md bg-main text-white my-2 "}
                handleOnClick={handleForgotPassword}
              />
              <Button
                children={"Back"}
                // eslint-disable-next-line
                style={
                  "py-2 px-4 rounded-md text-white bg-gray-500 text-semibold my-2 "
                }
                handleOnClick={() => setIsForgotPassword(false)}
              />
            </div>
          </div>
        </div>
      )}
      <div className="   border items-center justify-center flex ">
        <div className="p-8 my-20 bg-second rounded-md min-w-[500px] md:min-w-[350px] flex flex-col items-center ">
          <h1 className="text-[28px] font-semibold  text-main mb-8">
            {isRegister ? "Register" : "Login"}
          </h1>
          {isRegister ? (
            <InputField
              value={payload.name}
              setValue={setPayload}
              nameKey="name"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              fullWidth
            />
          ) : (
            ""
          )}
          {isRegister ? (
            <InputField
              value={payload.phone}
              setValue={setPayload}
              nameKey="phone"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              fullWidth
            />
          ) : (
            ""
          )}

          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey="email"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            fullWidth
          />
          <InputField
            value={payload.password}
            setValue={setPayload}
            type="password"
            nameKey="password"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            fullWidth
          />
          <Button
            children={isRegister ? "Register" : "Login"}
            handleOnClick={handleSubmit}
            fw
          />
          <div className="flex items-center justify-between my-2 w-full text-sm">
            {!isRegister && (
              <span
                onClick={() => setIsForgotPassword(true)}
                className="text-main hover:underline cursor-pointer"
              >
                Forgot your account?
              </span>
            )}
            {!isRegister && (
              <span
                className="text-main hover:underline cursor-pointer"
                onClick={() => setIsRegister(true)}
              >
                Create account
              </span>
            )}
            {isRegister && (
              <span
                className="text-main hover:underline cursor-pointer w-full text-center"
                onClick={() => setIsRegister(false)}
              >
                Go back to login
              </span>
            )}
          </div>
          <Link
            to={`/${path.HOME}`}
            className="text-main hover:underline cursor-pointer text-sm "
          >
            Go home?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
