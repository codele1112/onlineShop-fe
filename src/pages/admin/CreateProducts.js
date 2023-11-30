import React, { useCallback, useState } from "react";
import { Button, InputForm, Select, MarkDownEditor } from "../../components";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { validate } from "../../ultils/helpers";

const CreateProducts = () => {
  const { categories } = useSelector((state) => state.categories);
  const [payload, setPayload] = useState({
    description: "",
  });
  const [invalidFields, setInValidFields] = useState([]);
  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    [payload]
  );

  const handleCreateProduct = async (data) => {
    const invalids = validate(payload, setInValidFields);
    if (invalids === 0) {
      if (data.category)
        data.category = categories?.find(
          (el) => el._id === data.category
        )?.name;
      const finalPayload = { ...data, ...payload };
      const formData = new FormData();
      for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
    }
  };

  return (
    <div className="w-full">
      <h1 className="h-[75px] flex justify-between items-center px-4 border-b text-3xl">
        <span>Create New Product</span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleCreateProduct)}>
          <InputForm
            label="Name of product"
            register={register}
            errors={errors}
            id="name"
            validate={{ required: "Required." }}
            placeholder="Name of new product..."
            fullWidth
          />

          <div className="w-full my-6 flex gap-4">
            <InputForm
              label="Price product"
              register={register}
              errors={errors}
              id="price"
              validate={{ required: "Required." }}
              placeholder="Price of product..."
              type="number"
              style="flex-auto"
            />

            <InputForm
              label="Stock"
              register={register}
              errors={errors}
              id="quantity"
              validate={{ required: "Required." }}
              placeholder="Quantity of product..."
              type="number"
              style="flex-auto"
            />
          </div>

          <div className="my-6 ">
            <Select
              label="Category"
              register={register}
              errors={errors}
              options={categories?.map((el) => ({
                code: el._id,
                value: el.name,
              }))}
              id="category"
              style="flex-auto"
              validate={{ required: "Required." }}
            />
          </div>
          <MarkDownEditor
            name="description"
            changeValue={changeValue}
            label="Description"
            invalidFields={invalidFields}
            setInValidFields={setInValidFields}
          />

          <div className="flex flex-col gap-2 mt-8 ">
            <label className="font-semibold" htmlFor="thumb">
              Upload thumbnail
            </label>
            <input
              type="file"
              id="thumb"
              {...register("thumb", { required: "Required." })}
            />
            {errors["thumb"] && (
              <small className=" text-red-500 text-xs">
                {errors["thumb"]?.message}
              </small>
            )}
          </div>

          {preview?.thumb && (
            <div className="my-4">
              <img
                src={preview.thumb}
                alt="thumbnail"
                className="w-[200px] object-contain"
              />
            </div>
          )}

          <div className="flex flex-col gap-2 mt-8 ">
            <label className="font-semibold" htmlFor="products">
              Upload images of product
            </label>
            <input
              type="file"
              id="products"
              multiple
              {...register("images", { required: "Required." })}
            />
            {errors["images"] && (
              <small className=" text-red-500 text-xs">
                {errors["images"]?.message}
              </small>
            )}
          </div>

          <div className="my-6">
            <Button children={"Create new product"} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProducts;
