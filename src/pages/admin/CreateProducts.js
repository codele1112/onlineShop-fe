import React, { useCallback, useEffect, useState } from "react";
import { Button, InputForm, Select, MarkDownEditor } from "../../components";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { getBase64, validate } from "../../ultils/helpers";
import { toast } from "react-toastify";
import { createProducts } from "../../apis";

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
    reset,
  } = useForm();
  // eslint-disable-next-line
  const [hoverEl, setHoverEl] = useState(null);
  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    // eslint-disable-next-line
    [payload]
  );

  const handlePreviewThumb = async (file) => {
    const base64Thumb = await getBase64(file);
    setPreview((prev) => ({ ...prev, thumb: base64Thumb }));
  };

  const handlePreviewImages = async (files) => {
    let imagesPreview = [];
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        toast.warning("File not supported!");
        return;
      }
      const base64 = await getBase64(file);
      imagesPreview.push({ name: file.name, path: base64 });
    }
    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };

  useEffect(() => {
    handlePreviewThumb(watch("thumb")[0]);
    // eslint-disable-next-line
  }, [watch("thumb")]);
  useEffect(() => {
    handlePreviewImages(watch("images"));
    // eslint-disable-next-line
  }, [watch("images")]);

  const handleCreateProduct = async (data) => {
    console.log(data);
    const invalids = validate(payload, setInValidFields);
    if (invalids === 0) {
      if (data.category)
        // lay _id category
        data.category = categories?.find(
          (el) => el._id === data.category
        )?.name;
      let finalPayload = { ...data, ...payload };
      finalPayload.thumb = preview.thumb;
      finalPayload.images = preview.images;

      try {
        await createProducts(finalPayload);

        toast.success("Create product successfully!");
        reset();
        setPayload({
          thumb: "",
          images: [],
        });
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // console.log("preview", preview);
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
              // eslint-disable-next-line
              style="flex-auto"
            />

            <InputForm
              label="Stock"
              register={register}
              errors={errors}
              id="stock"
              validate={{ required: "Required." }}
              placeholder="Stock of product..."
              type="number"
              // eslint-disable-next-line
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
              // eslint-disable-next-line
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
            <input type="file" id="thumb" {...register("thumb")} />
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
            <input type="file" id="products" multiple {...register("images")} />
            {errors["images"] && (
              <small className=" text-red-500 text-xs">
                {errors["images"]?.message}
              </small>
            )}
          </div>
          {preview?.images?.length > 0 && (
            <div className="my-4 flex flex-wrap w-full gap-2">
              {preview?.images?.map((el, index) => (
                <div
                  onMouseEnter={() => setHoverEl(el.name)}
                  key={index}
                  className="w-fit relative"
                  onMouseLeave={() => setHoverEl(null)}
                >
                  <img
                    src={el.path}
                    alt="product"
                    className="w-[200px] object-contain h-[200px]"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="my-6">
            <Button children={"Create new product"} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProducts;
