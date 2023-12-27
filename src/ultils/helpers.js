import { UserStat, orderStat } from "../apis";
import icons from "./icons";

const { AiOutlineStar, AiFillStar } = icons;
export const createSlug = (string) =>
  string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");

export const formatMoney = (number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    number
  );

export const renderStarFromNumber = (number, size) => {
  if (!Number(number)) return;
  const stars = [];
  for (let i = 0; i < +number; i++)
    stars.push(<AiFillStar color="orange" size={size || 16} />);
  for (let i = 5; i < +number; i--)
    stars.push(<AiOutlineStar color="orange" size={size || 16} />);
  return stars;
};

export const generateRange = (start, end) => {
  const length = end + 1 - start;
  return Array.from({ length }, (_, index) => start + index);
};

// [3,4,5,6]

export const getBase64 = (file) => {
  if (!file) return "";
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  const formatPayload = Object.entries(payload);
  for (let arr of formatPayload) {
    if (arr[1].trim() === "") {
      invalids++;
      setInvalidFields((prev) => [
        ...prev,
        { name: arr[0], mes: "Require this field." },
      ]);
    }
  }

  for (let arr of formatPayload) {
    switch (arr[0]) {
      case "email":
        // eslint-disable-next-line
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!arr[1].match(regex)) invalids++;
        setInvalidFields((prev) => [
          ...prev,
          { name: arr[0], mes: "Email required." },
        ]);
        break;

      case "password":
        if (arr[1].length < 6) invalids++;
        setInvalidFields((prev) => [
          ...prev,
          { name: arr[0], mes: "Password must be at least 6 characters." },
        ]);
        break;

      default:
        break;
    }
  }

  return invalids;
};

export const dataOrderStat = await orderStat();

export const dataUserStat = await UserStat();
