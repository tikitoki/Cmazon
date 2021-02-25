import React from "react";
import "./Header.scss";
import SearchIcon from "@material-ui/icons/Search";
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
  const history = useHistory();
  const [{ basket, user, isSuperUser }, dispatch] = useStateValue();

  console.log("headerUser>>>", user);

  const handleAuthentication = () => {
    if (user && !isSuperUser) {
      auth.signOut();
      dispatch({
        type: "EMPTY_BASKET",
      });
    } else if (isSuperUser) {
      dispatch({
        type: "SET_SUPER_USER_FALSE",
        isSuperUser: false,
      });
    }
  };

  return (
    <div className="header">
      <div className="header-logo">
        <Link className="header-logo-link" to="/">
          {/* <a className="header-logo-link"> */}
          <span className="header-logo-sprite"></span>
          {/* </a> */}
        </Link>
      </div>
      <div className="header-search">
        <input className="header-search-input" type="text" />
        <SearchIcon className="header-search-icon" fontSize="large" />
      </div>
      <div className="header-nav">
        <Link to={user ? "/" : "/login"}>
          <div onClick={handleAuthentication} className="header-option">
            <span className="header-option-lineone">
              {user ? `您好${user.email}` : "您好, 请"}
            </span>
            <span className="header-option-linetwo">
              {user ? "登出" : "登录"}
            </span>
          </div>
        </Link>
        <Link to="/orders">
          <div
            // onClick={(e) => history.push("/cart-page")}
            className="header-option"
          >
            <span className="header-option-lineone">退货</span>
            <span className="header-option-linetwo">与我的订单</span>
          </div>
        </Link>
        <Link to="/cart-page">
          <div className="header-option">
            <div className="nav-cart">
              <span className="header-option-cart-count">{basket?.length}</span>
              <span className="header-option-cart"></span>
              <span className="header-option-linetwo">购物车</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
