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
