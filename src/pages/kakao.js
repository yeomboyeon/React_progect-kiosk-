import React from "react";
import axios from "axios";
import qs from "qs";

// 카카오 로그인 화면 구현(진행중)
// REST API 키
const REST_API_KEY = "b8b2a8e20b8dcbb6301e5f5991bbd7a7";
// JavaScript 키
const JAVASCRIPT_KEY = "86f4aaad6cec1132aea7dec86aeda722";
// Redirect URI	주소
const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
// 카카오소셜로그인링크
const 카카오소셜로그인링크 = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

function Kakao() {
  return (
    <div
      onClick={() => {
        window.location.href = 카카오소셜로그인링크;
      }}
      style={{
        display: "inline-block",
        width: 200,
        padding: 20,
        margin: 100,
        backgroundColor: "yellow",
        cursor: "pointer",
      }}
      className="App"
    >
      카카오 로그인
    </div>
  );
}

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

export default Kakao;
