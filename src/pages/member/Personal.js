import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, InputForm } from "../../components";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../../assets/avatarDefault01.jpeg";
import { updateCurrentUser } from "../../apis";
import { getCurrentUser } from "../../store/user/asyncActions";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

const Personal = () => {
  const { current } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors, isDirty },
  } = useForm();

  useEffect(() => {
    reset({
      name: current?.name,
      email: current?.email,
      phone: current?.phone,
      address: current?.address,
      avatar: current?.avatar,
    });
  }, [current]);

  const handleUpdateInfor = async (data) => {
    const formData = new FormData();

    if (data.avatar.length > 0) formData.append("avatar", data.avatar[0]);
    delete data.avatar;

    for (let i of Object.entries(data)) formData.append(i[0], i[1]);

    const response = await updateCurrentUser(formData);

    if (response.success) {
      dispatch(getCurrentUser());
      toast.success("Updated profile successfully!");

      if (searchParams.get("redirect")) navigate(searchParams.get("redirect"));
    } else toast.error(response.error);
  };

  return (
    <div className="w-full relative">
      <h1 className=" h-[75px] flex justify-between items-center px-4 border-b text-3xl ">
        Personal
      </h1>
      <form
        onSubmit={handleSubmit(handleUpdateInfor)}
        className="w-3/5 mx-auto py-8 flex flex-col gap-4 "
      >
        <div className="flex items-center justify-center  gap-2">
          <label htmlFor="file">
            <img
              src={current?.avatar || avatar}
              alt="avatar"
              className="w-[200px] h-[200px] rounded-full"
            />
          </label>
          <input type="file" id="file" {...register("avatar")} hidden />
        </div>
        <InputForm
          label="Name"
          register={register}
          errors={errors}
          id="name"
          validate={{ required: "Required." }}
          style="flex-auto "
        />
        <InputForm
          label="Email"
          register={register}
          errors={errors}
          id="email"
          validate={{
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: "Email invalid",
            },
          }}
          style="flex-auto"
        />
        <InputForm
          label="Phone"
          register={register}
          errors={errors}
          id="phone"
          validate={{
            required: "Required.",
            pattern: {
              value:
                /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/gm,
              message: "Phone invalid",
            },
          }}
          style="flex-auto"
        />
        <InputForm
          label="Address"
          register={register}
          errors={errors}
          id="address"
          validate={{ required: "Required." }}
          style="flex-auto"
        />
        <div className="flex items-center gap-2">
          <span className="font-medium  text-red-800">Account status: </span>
          <span>{current?.isBlocked ? "Blocked" : "Actived"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium text-red-800">Created At: </span>
          <span>{moment(current?.createdAt).fromNow()}</span>
        </div>

        <div className="w-full flex justify-end">
          {isDirty && <Button type="submit" children={"Update Information"} />}
        </div>
      </form>
    </div>
  );
};

export default Personal;
