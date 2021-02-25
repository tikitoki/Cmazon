import React from "react";
import "./Order.scss";
import moment from "moment";
import "moment/locale/zh-cn";
import CartItem from "./CartItem";

function Order({ order }) {
  console.log("order>>>", order);
  moment.locale("zh-cn");
  return (
    <div className="order">
      <h2>订单</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY,h:mma")}</p>
      <p className="order-id">{order.id}</p>
      {order.data.basket?.map((item) => (
        <CartItem
          id={item.id}
          imgSrc={item.imgSrc}
          title={item.title}
          price={item.price}
          viewStars={item.viewStars}
          hideButton
        />
      ))}
      <h3 className="order-total">
        总计¥{parseFloat(order.data.amount / 100)}
      </h3>
    </div>
  );
}

export default Order;
