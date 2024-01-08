import React, { memo, useCallback, useEffect, useState } from "react";
import { Button, InputForm, MarkDownEditor, Select } from "../../components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getBase64, validate } from "../../ultils/helpers";
import { useSelector } from "react-redux";
import { updateProduct } from "../../apis";

const UpdateProduct = ({
  editProduct,
  renderUpdateProduct,
  setEditProduct,
}) => {
  const { categories } = useSelector((state) => state.categories);
  const [invalidFields, setInValidFields] = useState([]);
  const [preview, setPreview] = useState({
    thumb: null,
    images: [],
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const [payload, setPayload] = useState({
    description: "",
  });
  useEffect(() => {
    reset({
      name: editProduct?.name || "",
      price: editProduct?.price || "",
      stock: editProduct?.stock || "",
      category: editProduct?.category?.name || "",
    });
    setPayload({
      description:
        typeof editProduct?.description === "object"
          ? editProduct?.description.join(",")
          : editProduct?.description,
    });
    setPreview({
      thumb: editProduct?.thumb || null,
      images: editProduct?.images || [],
    });
    // eslint-disable-next-line
  }, [editProduct]);

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
      imagesPreview.push(base64);
    }
    setPreview((prev) => ({ ...prev, images: imagesPreview }));
  };
  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb").length > 0)
      handlePreviewThumb(watch("thumb")[0]);
    // eslint-disable-next-line
  }, [watch("thumb")]);

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").length > 0)
      handlePreviewImages(watch("images"));
    // eslint-disable-next-line
  }, [watch("images")]);

  const handleUpdateProduct = async (data) => {
    console.log("data", data);
    const invalids = validate(payload, setInValidFields);
    if (invalids === 0) {
      if (data.category)
        data.category = categories?.find(
          (el) => el.name === data.category
        )?.name;
      let finalPayload = { ...data, ...payload };
      finalPayload.thumb = preview?.thumb;
      finalPayload.images = preview?.images;
      // const formData = new FormData();
      // for (let i of Object.entries(finalPayload)) formData.append(i[0], i[1]);
      // if (finalPayload.thumb)
      //   formData.append(
      //     "thumb",
      //     finalPayload?.thumb?.length === 0
      //       ? preview?.thumb
      //       : finalPayload?.thumb[0]
      //   );
      // if (finalPayload.images) {
      //   const images =
      //     finalPayload?.images?.length === 0
      //       ? preview.images
      //       : finalPayload.images;
      //   for (let image of images) formData.append("images", image);
      // }
      const response = await updateProduct(finalPayload, editProduct._id);

      console.log(response);
      if (response.success) {
        toast.success(response.message);
        reset();
        renderUpdateProduct();
        setEditProduct(null);
      } else {
        toast.error(response.message);
      }
    }
  };
  return (
    <div className="w-full flex flex-col gap-4 relative">
      <div className="h-[70px] w-full"></div>
      <div className="p-4 border-b bg-white flex justify-between items-center fixed right-0 left-[250px] top-0">
        <h1 className=" text-3xl tracking-tighter ">Update Product</h1>
        <span
          onClick={() => setEditProduct(null)}
          className="hover:text-red-600 cursor-pointer"
        >
          Cancel
        </span>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
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
              placeholder="Quantity of product..."
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
                code: el.name,
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
            value={payload.description}
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
                <div key={index} className="w-fit relative">
                  <img
                    src={el}
                    alt="product"
                    className="w-[200px] object-contain h-[200px]"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="my-6">
            <Button children={"Update product"} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(UpdateProduct);
