import React, { useState } from "react";
import "./Login.scss";
import { Link, useHistory } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();

  // console.log(
  //   "auth>>>",
  //   auth.signInWithEmailAndPassword("1@2.com", "zxcvbn"),
  //   "<<<auth"
  // );

  // const getUser = () => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve("1");
  //     }, 2000);
  //   });
  // };

  // const getVideo = (userId) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(userId + "videos");
  //     }, 2000);
  //   });
  // };

  // // const getDetail = (videoname) => {
  // //   return new Promise((resolve) => {
  // //     setTimeout(() => {
  // //       resolve(videoname + "detail");
  // //     }, 2000);
  // //   });
  // // };

  // const getDetail = (videoname) => {
  //   return videoname + "detail";
  // };

  // getUser()
  //   .then((user) => getVideo(user))
  //   .then((a) => getDetail(a))
  //   .then((a) => {
  //     console.log(a);
  //   });

  // const test1 = getUser().then((a) => getDetail(a));
  // const test2 = getUser().then((a) => "a");

  // console.log("test1>>>", test1);
  // console.log("test2>>>", test2);

  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  const handleClick = () => {
    dispatch({
      type: "SET_SUPER_USER",
      isSuperUser: true,
    });
    history.push("/");
  };

  return (
    <div className="login">
      <Link to="/">
        <div className="login-logo-container">
          <div className="login-logo"></div>
        </div>
      </Link>
      <div className="login-card">
        {/* 新加提示信息 */}
        <div className="login-helper">
          <p>
            要使用注册登录账号的功能需要确保您的电脑能通过“技术手段”访问到谷歌服务器
          </p>
          <p>
            或者你可以<span onClick={handleClick}>直接登录</span>
          </p>
        </div>
        <h1>登录</h1>
        <form action="">
          <div className="login-form">
            <p>邮箱</p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <p>密码</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" className="signin-btn" onClick={signIn}>
              登录
            </button>
          </div>
        </form>
        <p className="warning-msg">
          继续操作即表示您同意C马逊的使用条件和隐私声明。
        </p>
        <button onClick={register} className="register-btn">
          以此邮箱创建 Cmazon 账号并登录
        </button>
      </div>
    </div>
  );
}

export default Login;
