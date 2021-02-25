import React, { useState } from "react";
import "./Product.scss";
import { useStateValue } from "./StateProvider";
import { Motion, spring } from "react-motion";

function Product({ id, title, price, viewStars, imgSrc }) {
  const [{ basket }, dispatch] = useStateValue();

  const [isHovered, setIsHovered] = useState(false);

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        imgSrc: imgSrc,
        price: price,
        viewStars: viewStars,
      },
    });
  };

  return (
    <Motion
      defaultStyle={{ scale: 1 }}
      style={{ scale: spring(isHovered ? 1.1 : 1) }}
    >
      {(style) => {
        // console.log(isHovered);
        // console.log(style.scale);
        // console.log(`scale:(${style.scale})`);
        return (
          <div
            className="product"
            onMouseEnter={(e) => setIsHovered(true)}
            onMouseLeave={(e) => setIsHovered(false)}
            style={{ transform: `scale(${style.scale})` }}
          >
            <div className="product-info">
              <p>{title}</p>
              <p className="product-price">¥{price}</p>
              <div className="review-stars">
                <div className={"star-" + viewStars}></div>
              </div>
            </div>
            <div className="product-image-container">
              <img src={imgSrc} alt="" />
            </div>

            <button onClick={addToBasket}>加入购物车</button>
          </div>
        );
      }}
    </Motion>
  );
}

export default Product;
