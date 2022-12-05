import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 3번 회원가입 설정
// useState 저장(필요한 데이터는 id, pw를 객체화)
// 회원가입하고 메인 페이지로 이동하기(네비게이션)
/*
  이름, 주민번호 앞자리, 휴대폰번호(패스워드)로 가입
  화면에 표시될 때에는 이름:염*연, 폰 뒷자리 4개 : 8455만 나오도록 하기
   */


function Join() {
  const navigation = useNavigate();

  // 최상위에서 호출하기
  const [data, setData] = React.useState({
    id: "",
    pw: "",
    phoneNumber: "",
  });

  // 이벤트로 데이터 변경값 저장
  const 데이터변경 = (event) => {
    // alert(event.target.name); // id, pw가 선택됨
    const name = event.target.name;

    const cloneData = { ...data };

    // id, pw 모두 입력된 값을 받아와야하기에 name로 저장한 값을 배열로 받기
    // event.target.value 내가 입력한 값이 cloneData[name]이다.
    cloneData[name] = event.target.value;
    // console.log(cloneData[name]); 저장되는지 확인

    // 변경된 데이터 값 저장
    setData(cloneData);
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
          navigation("/login");
        }
      })
      .catch((error) => {
        console.log("join 에러", error);
      });
    console.log(data);
  };

  // name 활용, event.target.name으로 받은 데이터를 onChange{데이터변경}로 받아오기
  return (
    <div>
      <input type="text" name="id" placeholder='ID를 입력하세요.' onChange={데이터변경} />
      <input type="date" name="pw" onChange={데이터변경} />
      <input type="text" name="phoneNumber" placeholder='휴대폰 번호를 입력하세요.' onChange={데이터변경} />
      <button type="button" onClick={회원가입}>
        회원가입
      </button>
    </div>
  );
}

export default Join;
