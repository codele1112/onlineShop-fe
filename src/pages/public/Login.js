import React, { useState, useCallback, useEffect } from "react";
import { InputField, Button } from "../../components";
import { login, register, forgotPassword, finalRegister } from "../../apis";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import path from "../../ultils/path";
import { userLogin } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
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
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [token, setToken] = useState("");
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
        const response = await register(payload);
        if (response.success) {
          setIsVerifiedEmail(true);
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

        console.log("rs", rs);
        if (rs.errors) {
          Swal.fire(
            "Oops!",
            "Wrong email or password! Please try again.",
            "error"
          );
        }

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
          Swal.fire(
            "Oops!",
            "Invalid email or password! Please try again.",
            "error"
          );
        }
      }
    } else {
      Swal.fire("Oops!", "Wrong email or password! Please try again.", "error");
    }
    // eslint-disable-next-line
  }, [payload, isRegister]);

  const handleFinalRegister = async () => {
    const response = await finalRegister(token);
    if (response.success) {
      Swal.fire("Congratulations!", response.message, "success").then(() => {
        setIsRegister(false);
        resetPayload();
      });
    } else Swal.fire("Oops!", response.message, "error");
    setIsVerifiedEmail(false);
    setToken("");
  };
  return (
    <div className="w-screen h-screen relative">
      {isVerifiedEmail && (
        <div className=" absolute top-0 left-0 right-0 bottom-0 h-screen bg-overlay z-50 flex flex-col items-center justify-center gap-2">
          <div className="bg-white w-[500px]  md:max-w-[350px] lg:max-w[750px] rounded-md p-10">
            <h4 className="italic font-main text-xs">
              A verification code has been sent to your email. Please check your
              email and fill in the verification code below.
            </h4>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="p-2 outline-none rounded-md border"
            />
            <Button
              children={"Submit"}
              // eslint-disable-next-line
              style={"py-2 px-4 rounded-md bg-main text-white my-2  ml-4"}
              handleOnClick={handleFinalRegister}
            />
          </div>
        </div>
      )}
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
