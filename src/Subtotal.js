import React, { useEffect, useState } from "react";
import "./Subtotal.scss";
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (basket?.length == 0) {
      setBtnDisabled(true);
    }
  }, [basket]);

  return (
    <div className="subtotal">
      <p>
        小计 ({basket.length}件商品):
        <strong>¥{getBasketTotal(basket)}</strong>
      </p>
      <small className="subtotal-gift">
        <input type="checkbox" />
        此订单包含礼品
      </small>
      <button
        disabled={btnDisabled}
        onClick={(e) => {
          if (user) {
            history.push("/payment");
          } else {
            history.push("/login");
          }
        }}
      >
        进入结算中心
      </button>
    </div>
  );
}

export default Subtotal;
