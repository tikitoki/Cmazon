import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import "./Orders.scss";
import { useStateValue } from "./StateProvider";
import Order from "./Order";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [{ basket, user, isSuperUser }, dispatch] = useStateValue();
  //测试用户用dummy数据
  const dummyOrders = [
    {
      id: "pi_1IOenRLLoRfRxVadBigRvoZ0",
      data: {
        amount: 35688,
        basket: [
          {
            imgSrc:
              "https://m.media-amazon.com/images/I/51HzG7dwAHL._AC_SY200_.jpg",
            viewStars: 4,
            id: "1",
            title: "游戏耳机",
            price: "100",
          },
          {
            id: "1",
            imgSrc:
              "https://m.media-amazon.com/images/I/51HzG7dwAHL._AC_SY200_.jpg",
            price: "100",
            title: "游戏耳机",
            viewStars: 4,
          },
          {
            id: "2",
            price: "72.89",
            imgSrc:
              "https://m.media-amazon.com/images/I/319KAiGobEL._AC_SY200_.jpg",
            title: "有线游戏鼠标",
            viewStars: 4,
          },
          {
            title: "有线游戏键盘和鼠标组合",
            id: "3",
            viewStars: 4,
            imgSrc:
              "https://m.media-amazon.com/images/I/51vOyKGea+L._AC_SY200_.jpg",
            price: "100",
          },
          {
            price: "83.99",
            imgSrc:
              "https://m.media-amazon.com/images/I/31aYZs3ij5L._AC_SY200_.jpg",
            viewStars: 4,
            title: "以太网适配器",
            id: "4",
          },
        ],
      },
    },
  ];

  useEffect(() => {
    console.log("user>>>", user);
    if (user && !isSuperUser) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else if (isSuperUser) {
      setOrders(dummyOrders);
    } else {
      setOrders([]);
    }
  }, [user]);
  // console.log(JSON.stringify(orders));

  useEffect(() => {
    if (isSuperUser) {
    }
  }, []);

  console.log("orders>>>", orders);
  console.log("isSuperUser>>>", isSuperUser);
  return (
    <div className="orders">
      <h1>你的订单</h1>
      <p className="warning" style={{ display: isSuperUser ? "" : "none" }}>
        测试用户的订单记录为假数据
      </p>
      <div className="orders-order">
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
