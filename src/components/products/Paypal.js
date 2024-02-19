import React, { useEffect } from "react";

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { createOrder } from "../../apis";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const style = { layout: "vertical" };

const ButtonWrapper = ({
  currency,
  showSpinner,
  amount,
  payload,
  setIsSuccess,
}) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();

  const navigate = useNavigate();
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
    // eslint-disable-next-line
  }, [currency, showSpinner]);

  const handleSaveOrder = async () => {
    const response = await createOrder({ ...payload, status: "Succeed" });
    if (response.success) {
      setIsSuccess(true);
      Swal.fire("Congratulations!", " Order was created.", "success").then(
        () => {
          navigate("/");
        }
      );
    }
    navigate("/");
  };

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        options={{ clientId: process.env.REACT_APP_CLIENT_ID }}
        forceReRender={[style, currency, amount]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                { amount: { currency_code: currency, value: amount } },
              ],
            })
            .then((orderId) => orderId);
        }}
        onApprove={(data, actions) =>
          actions.order.capture().then(async (response) => {
            console.log(response);
            console.log("payload", payload);
            if (response.status === "COMPLETED") {
              handleSaveOrder();
            }
          })
        }
      />
    </>
  );
};

export default function Paypal({ amount, payload, setIsSuccess }) {
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px", margin: "auto" }}>
      <PayPalScriptProvider
        options={{ clientId: "test", components: "buttons", currency: "USD" }}
      >
        <ButtonWrapper
          setIsSuccess={setIsSuccess}
          payload={payload}
          currency={"USD"}
          amount={amount}
          showSpinner={false}
        />
      </PayPalScriptProvider>
    </div>
  );
}
