import "./App.css";
import { Routes, Route, useNavigate, useNavigation } from "react-router-dom";
import React from "react";
import axios from "axios";
import Login from "./pages/login.js";
import Join from "./pages/join.js";
import Write from "./pages/write.js";
import Article from "./pages/article.js";

//session 설정 후 도메
// 인이 다른 포트 번호와 쿠키 공유가 안되는데 공유 가능해짐
axios.defaults.withCredentials = true;

console.clear();
/**1. React router dom 설치 및 설정
 * 2. Constext Provider 설정
 * 3. 회원가입 설정
 * 4. 서버 연동
 * 5. 로그인 설정
 * 6. 세션(Session) 저장 및 설정
 * 7. 서버 연동
 * 8. mysql 연동
 * 9. 세션정보 가져오기
 * 10. 회원가입, 로그인 쿼리문 작성
 * 11. loginUser 정보 불러와서 main 활용
 * 12. 게시판(article) 만들고 db 생성
 * 13. 메인페이지에 게시판정보(총괄) 구현
 * 14. 댓글 정보 구현 ----- (진행중)
 * 15. 메인페이지 화면 구현중
 * --- (구현중)
 * 현재시간 위치 및 함수구현, 이미지 출력, 하단라인 맞추기
 * 카메라-소화기 몇대 가져다 놓기, 사용중-선택한 좌석 표시 css 넣어놓기
 * 좀 더 예쁘게 꾸며보기, 현위치 표시
 */

function Main() {
  const navigation = useNavigate();

  const { loginUser } = React.useContext(StoreContext);
  // console.log(loginUser); // loginUser 잘 가져오는지 확인

  // 게시판 전체 가져와서 main페이지에 출력
  const [article, setArticle] = React.useState([]);

  const 게시글정보가져오기 = async () => {
    await axios({
      url: "http://localhost:4000/article",
    }).then((res) => {
      setArticle(res.data);
    });
  };

  React.useEffect(() => {
    // alert("실행 여부 확인");
    게시글정보가져오기();
  }, []);

  const 문의 = () => {
    navigation("/write");
  };

  return (
    <div className="main">
      <div className="title">
        <h2>무인스터디카페 세종점</h2>
      </div>
      <div className="flex">
        <div className="main-map-left">
          <div className="left-배치도">
            <h3>좌석 배치도</h3>
          </div>
          <div className="hi">
            <h4>무인스터디카페에 오신 것을 환영합니다.</h4>
          </div>
          <div className="time">현재시간</div>
          <div class="intro_cont_divider"></div>
          <div className="seat">
            <div className="seat-main">
              <div className="seats">
                1<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                2<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                3<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                4<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                5<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                6<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                7<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                8<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                9<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                10<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                11<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                12<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                13<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                14<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                15<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                16<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                17<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                18<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                19<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                20<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                21<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                22<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                23<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                24<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                25<div className="seats-배정">00:00</div>
              </div>
            </div>
            <div className="seat-sub">
              <div className="drawer">
                <div className="drawers">사물함</div>
              </div>
              <div className="rest">
                <div className="rests">휴게실</div>
              </div>
              <div className="legend">
                <div className="legends">
                  ※ 범 례 ※
                  <div className="범례묶기">
                    <div className="legends-표시"></div>
                    <div className="legends-표시글자">빈좌석</div>
                  </div>
                  <div className="범례묶기">
                    <div className="legends-표시"></div>
                    <div className="legends-표시글자">사용중인 좌석</div>
                  </div>
                  <div className="범례묶기">
                    <div className="legends-표시"></div>
                    <div className="legends-표시글자">선택한 좌석</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-map-right">
          <div className="join-menu">
            <button type="button" className="menu">
              <img class="../사진/회원가입.png" alt="" />
              회원가입
            </button>
            <div className="join-tips">
              처음 이용하시는 분들께서는 <br />
              회원가입 후 이용하시기 바랍니다.
            </div>
          </div>
          <div class="intro_cont_divider"></div>
          <div className="center-menu">
            <div className="button-set">
              <button type="button" className="menu">
                <img class="../사진/자리배정.png" alt="" />
                자리배정
              </button>
            </div>
            <div className="button-set">
              <button type="button" className="menu">
                <img class="../사진/정기권.png" alt="" />
                정기/
                <br />
                시간권
                <br />
                구매
              </button>
            </div>
            <div className="button-set">
              <button type="button" className="menu">
                <img class="../사진/사물함.png" alt="" />
                사물함 <br />
                사용
              </button>
            </div>
            <div className="button-set">
              <button type="button" className="menu">
                <img class="../사진/시간연장.png" alt="" />
                시간연장/
                <br />
                좌석이동
              </button>
            </div>
            <div className="button-set">
              <button type="button" className="menu">
                <img class="../사진/좌석반납.png" alt="" />
                퇴실/
                <br />
                좌석반납
              </button>
            </div>
            <div className="button-set">
              <button type="button" className="menu" onClick={문의}>
                <img class="../사진/문의.png" alt="" />
                문의
              </button>
            </div>
            <div class="intro_cont_divider"></div>
          </div>
          <div className="button-menu">
            <div className="tips">
              <h2>이용방법</h2>
            </div>
            <div className="tips">
              1. 회원가입 등록(필수)
              <br />
              2. 정기권, 또는 시간권 구매(선택)
              <br />
              3. 좌석배정(필수)
              <br />
              4. 필요시 정보변경(선택)
            </div>
            <div className="hp">
              세종 집현서로00 무인스터디카페
              <br />
              문의전화 010-6548-8455
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 현재날짜 구현
let today = new Date();
console.log(today.toLocaleDateString() + today.toLocaleTimeString());

const StoreContext = React.createContext({});

function App() {
  const [loginUser, setLoginUser] = React.useState({});

  const 세션정보가져오기 = async () => {
    await axios({
      url: "http://localhost:4000/user",
    }).then((res) => {
      setLoginUser(res.data);
    });
  };

  React.useEffect(() => {
    세션정보가져오기();
  }, []);
  return (
    <StoreContext.Provider value={{ loginUser }}>
      <Routes>
        <Route exact path="/" element={<Main />}></Route>
        <Route exact path="/join" element={<Join />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/write" element={<Write />}></Route>
        <Route exact path="/article/:seq" element={<Article />}></Route>
      </Routes>
    </StoreContext.Provider>
  );
}

export default App;
