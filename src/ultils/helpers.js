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

export const validate = (payload, setInvalidFields) => {
  let invalids = 0;

  return invalids;
};
