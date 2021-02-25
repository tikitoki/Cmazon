import React, { createRef, forwardRef } from "react";
import "./CartItem.scss";
import { useStateValue } from "./StateProvider";

function CartItem({ id, imgSrc, title, price, viewStars, hideButton }) {
  // console.log("id>>>" + id);
  const [{ basket }, dispatch] = useStateValue();
  const removeFromBasket = () => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
  };
  return (
    <div className="cart-item">
      <img src={imgSrc} alt="" />
      <div className="cart-item-info">
        <p className="cart-item-title">{title}</p>
        <p className="cart-item-price">¥{price}</p>
        <div className={"star-" + viewStars}></div>
        {!hideButton && (
          <button onClick={removeFromBasket}>从购物车移除</button>
        )}
      </div>
    </div>
  );
}

//FlipMove准备函数
export const FlipMoveCartItem = forwardRef((props, ref) => {
  return (
    <div ref={ref}>
      <CartItem {...props} />
    </div>
  );
});

export default CartItem;
