import "./App.css";
import { Routes, Route, useNavigate, useNavigation } from "react-router-dom";
import React from "react";
import axios from "axios";
import Login from "./pages/login.js";
import Join from "./pages/join.js";
import Write from "./pages/write.js";
import Article from "./pages/article.js";
import Notice from "./pages/notice.js";
import Locker from "./pages/locker.js";
import SeatAssignment from "./pages/seatAssignment.js";
import TimeExtension from "./pages/timeExtension.js";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

//session 설정 후 도메인이 다른 포트 번호와 쿠키 공유가 안되는데 공유 가능해짐
axios.defaults.withCredentials = true;

console.clear();
/**1. (완료) - React router dom 설치 및 설정
 * 2. (완료) - Constext Provider 설정
 * 3. (완료) - 회원가입 설정
 * 4. (완료) - 서버 연동
 * 5. (완료) - 로그인 설정
 * 6. (완료) - 세션(Session) 저장 및 설정
 * 7. (완료) - 서버 연동
 * 8. (완료) - mysql 연동
 * 9. (완료) - 세션정보 가져오기
 * 10. (완료) - 회원가입, 로그인 쿼리문 작성
 * 11. (완료) - loginUser 정보 불러와서 main 활용
 * 12. (완료) - 게시판(article) 만들고 db 생성
 * 13. (진행중) - 메인페이지에 게시판정보(총괄) 구현
 * 14. (진행중) - 댓글 정보 구현
 * 15. (진행중) - 메인페이지 화면 구현중
 * ----(완료) - 이미지가 왜깨지지...(경로 설정 오류?)
 *    >>>>> 해결! <img src={require('./images/시간연장.png')} alt="" />
 * ----(완료) - 사용중, 선택한 좌석 표시 CSS 넣기
 * ----(완료) - 깔끔하게 화면 구성
 * ----(완료) - 다른 js 파일의 css 적용은 어디에서? >>> App.css
 * ----(완료) - 유의사항 페이지(깔끔하게 추가하기)
 * ----(완료) - 사물함이용 페이지
 * ----(함수 구현 추가 요망)
 * ----(완료) - 현재시간(dayjs 활용), 새로고침안해도 가도록. (Intercval)
 *     좌석 내부 배정시간에 따라 off → on으로 바꾸기
 *     좌석 내부 00:00 배정시간 함수 구현(기본은 안나오도록)
 *     로그인 완료 후 메인페이지에 성명(0000) 출력되도록 하기
 *     각 메뉴 선택시 관련 선택창 구현
 *
 *  div를 2번 쓰면 안되고 최상위 태그로 활용하기 위한 방법, 아무 의미없는 태그입니다.
 *  <React.Fragment> </React.Fragment>
 */

function Main({ seats }) {
  const navigation = useNavigate();
  const { loginUser, setGlobalModal } = React.useContext(StoreContext);
  // console.log(loginUser); // loginUser 잘 가져오는지 확인

  //현재시간 구현(시간이라서 당연히 State 안해도 되는줄;;;)
  const baseDate = dayjs().format("YYYY-MM-DD.(ddd), HH:mm:ss");
  const [dateTime, setDateTime] = React.useState(baseDate);

  React.useEffect(() => {
    const dateInterval = setInterval(() => {
      const date = dayjs().format("YYYY-MM-DD.(ddd), HH:mm:ss");
      setDateTime(date);
    }, 1000);

    return () => {
      clearInterval(dateInterval);
    };
  }, []);

  // 모달창 보여주기
  const 자리배정모달보여줘 = () => {
    setGlobalModal({
      show: true,
      type: "seatAssignment",
    });
    // alert('zSd')
  };

  const 문의 = () => {
    setGlobalModal({
      show: true,
      type: "write",
    });
  };

  const 로그인 = () => {
    setGlobalModal({
      show: true,
      type: "login",
    });
  };

  const 회원가입 = () => {
    setGlobalModal({
      show: true,
      type: "join",
    });
  };

  const 유의사항 = () => {
    setGlobalModal({
      show: true,
      type: "notice",
    });
  };

  const 사물함사용 = () => {
    setGlobalModal({
      show: true,
      type: "locker",
    });
  };

  const 시간연장 = () => {
    setGlobalModal({
      show: true,
      type: "timeExtension",
    });
  };

  return (
    <div className="main">
      <div className="title-Set">
        <div className="title">
          <h1>무인스터디카페 (세종점)</h1>
        </div>
        <div className="loginUser"> {loginUser.id}</div>
        <div className="loginUser"> 님 환영합니다.</div>
      </div>
      <div className="flex">
        <div className="main-map-left">
          <div className="flex-left">
            <div className="left-배치도">
              <h2>좌석 배치도</h2>
            </div>
            <div className="hi">
              <h4>무인스터디카페에 오신 것을 환영합니다.</h4>
            </div>
            <div className="time">{dateTime}</div>
          </div>
          <div className="intro_cont_divider"></div>
          <div className="seat">
            <div className="seat-main">
              <div className="소화기-카메라">
                <img src={require("./images/카메라.png")} alt="" />
                <img src={require("./images/소화기.png")} alt="" />
              </div>
              {seats &&
                seats.map((item, index) => {
                  const 소화기배치 = item.number % 8 === 0 ? true : false;
                  return (
                    <React.Fragment key={`seats-${index}`}>
                      <div className="seats">
                        <div className="seats-on">{item.state}</div>
                        {item.number}
                        <div className="seats-배정">{item.date}</div>
                      </div>
                      {소화기배치 && (
                        <div className="소화기-카메라">
                          <img src={require("./images/카메라.png")} alt="" />
                          <img src={require("./images/소화기.png")} alt="" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
            </div>
            <div className="seat-sub">
              <div className="drawer">
                <div className="drawers">사물함</div>
                <div className="소화기-카메라">
                  <img src={require("./images/카메라.png")} alt="" />
                  <img src={require("./images/소화기.png")} alt="" />
                </div>
              </div>
              <div className="rest">
                <div className="rests">휴게실</div>
                <div className="소화기-카메라">
                  <img src={require("./images/카메라.png")} alt="" />
                  <img src={require("./images/소화기.png")} alt="" />
                </div>
              </div>
              <div className="현위치">
                현위치 <img src={require("./images/현위치.png")} alt="" />
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
            <button type="button" className="menu" onClick={회원가입}>
              <img src={require("./images/회원가입.png")} alt="" />
              회원가입
            </button>
            <div className="join-tips">
              처음 이용하시는 분들께서는 <br />
              회원가입 후 <br />
              이용하시기 바랍니다.
            </div>
            <button type="button" className="menu" onClick={로그인}>
              <img src={require("./images/로그인.png")} alt="" />
              로그인
            </button>
          </div>
          <div class="intro_cont_divider"></div>
          <div className="center-menu">
            <div className="button-set">
              <button
                type="button"
                className="menu"
                onClick={자리배정모달보여줘}
              >
                <img src={require("./images/자리배정.png")} alt="" />
                자리배정
              </button>
            </div>
            <div className="button-set">
              <button type="button" className="menu">
                <img src={require("./images/정기권.png")} alt="" />
                정기/
                <br />
                시간권
                <br />
                구매
              </button>
            </div>
            <div className="button-set">
              <button type="button" className="menu" onClick={사물함사용}>
                <img src={require("./images/사물함.png")} alt="" />
                사물함 <br />
                배정
              </button>
            </div>
            <div className="button-set">
              <button type="button" className="menu" onClick={시간연장}>
                <img src={require("./images/시간연장.png")} alt="" />
                시간연장/
                <br />
                좌석이동
              </button>
            </div>
            <div className="button-set">
              <button type="button" className="menu">
                <img src={require("./images/좌석반납.png")} alt="" />
                퇴실/
                <br />
                좌석반납
              </button>
            </div>
            <div className="button-set">
              <button type="button" className="menu" onClick={문의}>
                <img src={require("./images/문의.png")} alt="" />
                문의
              </button>
            </div>
            <div class="intro_cont_divider"></div>
          </div>
          <div className="button-menu">
            <div className="tips">
              <h2>이용방법</h2>
            </div>
            <div className="tips-설명">
              1. 회원가입 등록 및 로그인(필수)
              <br />
              2. 정기권, 또는 시간권 구매(선택)
              <br />
              3. 자리배정(필수)
              <br />
              4. 필요시 정보변경(선택)
              <div className="유의사항버튼">
                <button type="button" className="menu" onClick={유의사항}>
                  유의사항
                </button>
              </div>
            </div>
            <div className="hp">
              주소 : 세종 집현서로00 무인스터디카페(세종점)
              <br />
              문의전화 : 010-0000-8455
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const StoreContext = React.createContext({});

function App() {
  const [loginUser, setLoginUser] = React.useState({});
  const [globalModal, setGlobalModal] = React.useState({
    show: false,
    type: null,
  });

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

  function 카카오데이터받는곳() {
    return <div>카카오 데이터 받는 곳</div>;
  }

  const [seats, setSeats] = React.useState([]);
  React.useEffect(() => {
    const seats = [];

    for (let i = 1; i <= 24; i++) {
      seats.push({
        number: i,
        date: "00:00",
        state: "Off",
      });
    }
    setSeats(seats);
  }, []);

  return (
    <StoreContext.Provider value={{ loginUser, setGlobalModal }}>
      <Routes>
        <Route exact path="/" element={<Main seats={seats} />}></Route>
        <Route exact path="/join" element={<Join />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/write" element={<Write />}></Route>
        <Route exact path="/article/:seq" element={<Article />}></Route>
        <Route exact path="/notice" element={<Notice />}></Route>
        <Route exact path="/locker" element={<Locker />}></Route>
        <Route exact path="/timeExtension" element={<TimeExtension />}></Route>
        <Route
          exact
          path="/seatAssignment"
          element={<SeatAssignment />}
        ></Route>
        <Route
          exact
          path="/oauth/callback/kakao"
          element={<카카오데이터받는곳 />}
        ></Route>
      </Routes>
      {globalModal.show && (
        <div className="modal">
          {
            {
              seatAssignment: (
                <SeatAssignment seats={seats} setSeats={setSeats} />
              ),
              notice: <Notice />,
              join: <Join />,
              login: <Login />,
              write: <Write />,
              locker: <Locker />,
              timeExtension: (
                <TimeExtension seats={seats} setSeats={setSeats} />
              ),
            }[globalModal.type]
          }
        </div>
      )}
    </StoreContext.Provider>
  );
}

export default App;
