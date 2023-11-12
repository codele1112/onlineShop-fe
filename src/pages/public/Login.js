import React, { useState, useCallback } from "react";
import { InputField, Button, Loading } from "../../components";
import { login, register } from "../../apis";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { userLogin } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/categories/categoriesSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });

  const [isRegister, setIsRegister] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);

  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      name: "",
      phone: "",
    });
  };
  const handleSubmit = useCallback(async () => {
    const { name, phone, ...data } = payload;
    if (isRegister) {
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await register(payload);
      // console.log("register", response);

      dispatch(showModal({ isShowModal: false, modalChildren: null }));

      if (response.success) {
        Swal.fire("Congratulations!", response.mes, "success").then(() => {
          setIsRegister(false);
          resetPayload();
        });
      } else {
        Swal.fire("Oops!", response.mes, "error");
      }
    } else {
      const rs = await login(data);
      console.log("rs", rs);
      // console.log("rs.data", rs.data.accessToken);
      // console.log("rs.userdata", rs.data.userData);
      if (rs.success) {
        dispatch(
          userLogin({
            isLoggedIn: true,
            token: rs.data.accessToken,
            user: rs.data.userData,
          })
        );
        navigate(`/${path.HOME}`);
      } else {
        Swal.fire("Oops!", rs.mes, "error");
      }
    }
  }, [payload, isRegister, dispatch, navigate]);

  return (
    <div className="w-screen h-screen relative">
      <img
        src="https://i.pinimg.com/564x/3e/4f/21/3e4f213acec75143c349ab281fe4f12c.jpg"
        alt=""
        className="w-full h-full object-cover"
      />

      <div className="absolute top-0 bottom-0 left-0 right-1/2 items-center justify-center flex ">
        <div className="p-8 bg-white rounded-md min-w-[500px] flex flex-col items-center ">
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
          />
          <InputField
            value={payload.password}
            setValue={setPayload}
            type="password"
            nameKey="password"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Button
            name={isRegister ? "Register" : "Login"}
            handleOnClick={handleSubmit}
            fw
          />
          <div className="flex items-center justify-between my-2 w-full text-sm">
            {!isRegister && (
              <span className="text-main hover:underline cursor-pointer">
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
