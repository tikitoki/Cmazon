import React, { createRef } from "react";
import "./Home.scss";
import Product from "./Product.js";

function Home() {
  const ref = createRef();

  const promise = new Promise((a) => a(2));

  promise.then((a) => console.log(a));

  return (
    <div>
      <div className="home">
        <div className="home-container">
          <div className="image-container">
            <img
              className="home-image"
              src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_PCs_zh_CN_1x._CB432520777_.jpg"
              alt=""
            />
          </div>
          <div className="home-row">
            <Product
              id="1"
              title="游戏耳机"
              price="100"
              viewStars={4}
              imgSrc="https://m.media-amazon.com/images/I/51HzG7dwAHL._AC_SY200_.jpg"
            />
            <Product
              id="2"
              title="有线游戏鼠标"
              price="72.89"
              viewStars={4}
              imgSrc="https://m.media-amazon.com/images/I/319KAiGobEL._AC_SY200_.jpg"
            />
          </div>
          <div className="home-row">
            <Product
              id="3"
              title="有线游戏键盘和鼠标组合"
              price="100"
              viewStars={4}
              imgSrc="https://m.media-amazon.com/images/I/51vOyKGea+L._AC_SY200_.jpg"
            />{" "}
            <Product
              id="4"
              title="以太网适配器"
              price="83.99"
              viewStars={4}
              imgSrc="https://m.media-amazon.com/images/I/31aYZs3ij5L._AC_SY200_.jpg"
            />{" "}
            <Product
              id="5"
              title="VR Gaming Headset"
              price="78.09"
              viewStars={4}
              imgSrc="https://m.media-amazon.com/images/I/31i3tpuXxxL._AC_SY200_.jpg"
            />
          </div>
          <div className="home-row">
            <Product
              id="6"
              title="手提箱录音机"
              price="99.98"
              viewStars={4}
              imgSrc="https://m.media-amazon.com/images/I/41yavwjp-8L._AC_SY200_.jpg"
            />{" "}
            <Product
              id="7"
              title="HDMI 数据线"
              price="100"
              viewStars={4}
              imgSrc="https://m.media-amazon.com/images/I/41bCxnHksnL._AC_SY200_.jpg"
            />{" "}
            <Product
              id="8"
              title="存储卡，带适配器"
              price="100"
              viewStars={4}
              imgSrc="https://m.media-amazon.com/images/I/416IxcmUpGL._AC_SY200_.jpg"
            />{" "}
            <Product
              id="9"
              title="无线范围扩展器"
              price="100"
              viewStars={4}
              imgSrc="https://m.media-amazon.com/images/I/41ffko0T3kL._AC_SY200_.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
