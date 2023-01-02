import React from "react";
import axios from "axios";
import App, { StoreContext } from "../App.js";

// 3번 회원가입 설정
// useState 저장(필요한 데이터는 id, pw를 객체화)
// 회원가입하고 메인 페이지로 이동하기(네비게이션)
/*
  이름, 주민번호 앞자리, 휴대폰번호(패스워드)로 가입
  화면에 표시될 때에는 이름:염*연, 폰 뒷자리 4개 : 8455만 나오도록 하기
   */

function Join() {
  const { setGlobalModal } = React.useContext(StoreContext);

  // 최상위에서 호출하기
  const [data, setData] = React.useState({
    id: "",
    phoneNumber: "",
  });

  // 이벤트로 데이터 변경값 저장
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

  // axios 서버 연결
  // 생성이기에 POST 연결, data 받기
  // return 값에 나올 값들이 서버로 넘겨져야 한다.
  // GET 가져온다.(로그인) POST 만든다.(회원가입)
  // POST 는 data로 보내기
  const 회원가입 = async () => {
    await axios({
      url: "http://localhost:4000/join",
      method: "POST",
      data: data,
    })
      .then((res) => {
        const { code, message } = res.data;

        if (code === "success") {
          alert(message);
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log("join 에러", error);
      });
    console.log(data);
  };

  // name 활용, event.target.name으로 받은 데이터를 onChange{데이터변경}로 받아오기
  return (
    <div className="join-box">
      <div className="홈버튼">
        <button type="button" className="menu" onClick={홈화면이동}>
          <img src={require("../images/로그인.png")} alt="" />
        </button>
      </div>
      <h2>Join</h2>
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
          <button type="button" onClick={회원가입}>
            회원가입
          </button>
        </a>
      </form>
    </div>
  );
}

export default Join;
