import React, { createRef, useState, useEffect } from "react";
import "./Payment.scss";
import { FlipMoveCartItem } from "./CartItem";
import FlipMove from "react-flip-move";
import axios from "./axios";
import { useStateValue } from "./StateProvider";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { getBasketTotal } from "./reducer";
import { useHistory } from "react-router-dom";
import { db } from "./firebase.js";

function Payment() {
  const [{ basket, user, isSuperUser }, dispatch] = useStateValue();

  const stripe = useStripe();
  const elements = useElements();

  const history = useHistory();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [clientSecret, setclientSecret] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //Stripe要求收到的金额为 金额*100
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
      });
      setclientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log("clientSecret>>>", clientSecret);
  // console.log("user>>>", user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        history.replace("/orders");
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };

  return (
    <div className="payment">
      <div className="payment-container">
        {/* 地址和邮件 */}
        <h1>共{basket?.length}件商品</h1>
        <div className="payment-section">
          <div className="left-part">
            <h3>配送给</h3>
          </div>
          <div className="right-part">
            <p>{user?.email}</p>
          </div>
        </div>
        {/* 确认信息 */}
        <div className="payment-section">
          <div className="left-part">
            <h3>确认购物车</h3>
          </div>
          <div className="right-part">
            {/* 物品 */}
            <div style={{ position: "relative" }}>
              <FlipMove>
                {basket?.map((item, index) => {
                  // console.log(item);
                  //   console.log(index);
                  const myRef = createRef();
                  return (
                    <FlipMoveCartItem
                      key={index}
                      id={item.id}
                      imgSrc={item.imgSrc}
                      title={item.title}
                      price={item.price}
                      viewStars={item.viewStars}
                      ref={myRef}
                    />
                  );
                })}
              </FlipMove>
            </div>
          </div>
        </div>
        {/* payment method */}
        <div className="payment-section">
          <div className="left-part">
            <h3>选择支付方式</h3>
          </div>
          <div className="right-part">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment-price-container">
                <h3>¥总金额{getBasketTotal(basket)}</h3>
              </div>
              <button
                type="submit"
                disabled={isSuperUser || processing || disabled || succeeded}
              >
                <span>{processing ? <p>正在处理</p> : "立即购买"}</span>
              </button>
              <p
                className="warning"
                onClick={(e) => {
                  dispatch({
                    type: "EMPTY_BASKET",
                  });
                  history.push("/orders");
                }}
                style={{ display: isSuperUser ? "" : "none" }}
              >
                测试用户请点这里直接跳转
              </p>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
