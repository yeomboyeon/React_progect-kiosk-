import React from "react";
import axios from "axios";
import qs from "qs";
import App, { StoreContext } from "../App.js";

// 카카오 로그인 화면 구현(진행중)
// REST API 키
const REST_API_KEY = "b8b2a8e20b8dcbb6301e5f5991bbd7a7";
// JavaScript 키
const JAVASCRIPT_KEY = "86f4aaad6cec1132aea7dec86aeda722";
// Redirect URI	주소
const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
// 카카오소셜로그인링크
const 카카오소셜로그인링크 = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function 카카오데이터() {
  const code = new URL(window.location.href).searchParams.get("code");

  const getKAKAO = async () => {
    const data = qs.stringify({
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
      client_secret: JAVASCRIPT_KEY,
    });

    const result = await axios({
      method: "POST",
      url: "https://kauth.kakao.com/oauth/token",
      data: data,
    });

    // kakao Javascript SDK 초기화
    window.Kakao.init(REST_API_KEY);

    window.Kakao.Auth.setAccessToken(result.data.access_token);

    const kakaoData = await window.Kakao.API.request({
      url: "/v2/user/me",
    });
    console.log(kakaoData);
  };

  React.useEffect(() => {
    getKAKAO();
  }, []);

  return <div>카카오 데이터 받는곳</div>;
}

function Login() {
  const { setGlobalModal } = React.useContext(StoreContext);

  // 최상위에서 호출하기
  const [data, setData] = React.useState({
    id: "",
    phoneNumber: "",
  });

  const 데이터변경 = (event) => {
    const name = event.target.name;
    const cloneData = { ...data };
    cloneData[name] = event.target.value;
    setData(cloneData);
  };

  const 홈화면이동 = () => {
    setGlobalModal({
      show: false,
      type: null,
    });
  };

  // 보안으로 GET 보다는 POST로 설정
  const 로그인 = async () => {
    await axios({
      url: "http://localhost:4000/login",
      method: "POST",
      data: data,
    })
      .then((res) => {
        alert(res.data.message);

        if (res.data.code === "success") {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log("login 에러", error);
      });
  };

  return (
    <div className="join-box">
      <div className="홈버튼">
        <button type="button" className="menu" onClick={홈화면이동}>
          <img src={require("../images/로그인.png")} alt="" />
        </button>
      </div>
      <h2>Login</h2>
      <form>
        <div class="user-box">
          <input type="text" name="id" onChange={데이터변경} />
          <label>회원아이디</label>
        </div>
        <div class="user-box">
          <input type="text" name="phoneNumber" onChange={데이터변경} />
          <label>휴대폰번호</label>
        </div>
        <a href="#">
          <button type="button" onClick={로그인}>
            로그인
          </button>
          <button
            type="button"
            onClick={() => {
              window.location.href = 카카오소셜로그인링크;
            }}
          >
            카카오 로그인
          </button>
        </a>
      </form>
    </div>
  );
}

export default Login;
