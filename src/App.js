import React, { useEffect } from "react";
import "./App.scss";
import Header from "./Header.js";
import Home from "./Home.js";
import CartPage from "./CartPage.js";
import Login from "./Login.js";
import Payment from "./Payment.js";
import Orders from "./Orders.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const promise = loadStripe(
  "pk_test_51IODnGLLoRfRxVadxLwv4LFXRAHCOl0SQyTHgrMUtiROy3YZ4APFFxiQ69Dng4yYHljIJArEQHpYUvA4ubMAT7lz00vKTqp1fE"
);

function App() {
  const [{ basket, user, isSuperUser }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS>>>", authUser);
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      }
      // 处理测试用户
      else if (isSuperUser) {
        dispatch({
          type: "SET_USER",
          user: { email: "测试用户" },
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path="/" exact>
            <Header />
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/cart-page">
            <Header />
            <CartPage />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
