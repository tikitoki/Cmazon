import React, { createRef } from "react";
import FlipMove from "react-flip-move";
import "./CartPage.scss";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import { FlipMoveCartItem } from "./CartItem";

function CartPage() {
  const [{ basket, user }, dispatch] = useStateValue();

  console.log(basket);
  return (
    <div className="cart-page">
      <div className="cart-page-left-side">
        {basket?.length == 0 && (
          <div className="cart-empty-message-container">
            <img
              src="https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg"
              alt=""
            />
            <div className="cart-empty-message">
              <h3>您好,{user?.email}</h3>
              <p>您的C马逊购物车为空</p>
            </div>
          </div>
        )}
        <div className="cart-item-list">
          {/* <CartItem
            id="1"
            imgSrc="https://m.media-amazon.com/images/I/51HzG7dwAHL._AC_SY200_.jpg"
            title="lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum "
            price="2"
            viewStars="4"
          /> */}

          {/* <FunctionalCartItem
            key="1"
            id="1"
            imgSrc="1"
            title="1"
            price="1"
            viewStars="1"
            ref={myRef}
          /> */}

          {/* FlipMove需要static以外的position */}
          <div style={{ position: "relative" }}>
            <FlipMove>
              {basket?.map((item, index) => {
                // console.log(item);
                // console.log(index);
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
          {/* {basket.map(item =>(
              <CartItem
                key={item.id}
                id={item.id}
                imgSrc="{item.imgSrc}"
                title={item.title}
                price={item.price}
                viewStars={item.viewStars}
              />
            ))} */}
        </div>
      </div>
      <div className="cart-page-right-side">
        <Subtotal />
      </div>
    </div>
  );
}

export default CartPage;
