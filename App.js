import "./App.css";
import { Routes, Route, useNavigate, useNavigation } from "react-router-dom";
import React from "react";
import axios from "axios";
import Login from "./pages/login.js";
import Join from "./pages/join.js";
import Write from "./pages/write.js";
import Article from "./pages/article.js";
import Notice from "./pages/notice.js";
import Kakao from "./pages/kakao.js";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");


//session 설정 후 도메
// 인이 다른 포트 번호와 쿠키 공유가 안되는데 공유 가능해짐
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
 * ----(진행중) - 사용중, 선택한 좌석 표시 CSS 넣기
 * ----(진행중) - 깔끔하게 화면 구성
 * ----(진행중) - 다른 js 파일의 css 적용은 어디에서?
 * ----(진행중) - 유의사항페이지(깔끔하게 추가하기)
 * ----(함수 구현 추가 요망)
 * ----(완료) - 현재시간(dayjs 활용), 새로고침안해도 가도록. (Intercval)
 *     좌석 내부 배정시간에 따라 off → on으로 바꾸기
 *     좌석 내부 00:00 배정시간 함수 구현(기본은 안나오도록)
 *     로그인 완료 후 메인페이지에 성명(0000) 출력되도록 하기
 *     각 메뉴 선택시 관련 선택창 구현
 */

function Main() {
  const navigation = useNavigate();
  const { loginUser } = React.useContext(StoreContext);
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
    } 
  },[])

//   // 공공데이터포털API 가져오기
//   const 공공데이터포털가져오기 = async () => {
//     await axios({
//       url: "https://apis.data.go.kr/5690000/sjTraditionalMarket1/sj_00000889",
//       method: "GET",
//       params: {
//         serviceKey : 'XqLsAiA6Vl0z5wTPisARsPp9cgE3agyLxS6uj1BBke8x5fZSNEUKNEjj0Wq4bh8TrbRgnf53ot82Fax5btjw9Q==',
//   pageIndex : 1,
//   pageUnit : 20,
// dataTy : 'json',
// searchCondition : 'ty_Se',
// searchKeyword : '5일장',
//       }
//     }).then((res) => {
//     console.log(res);
//   })
// }
//   React.useEffect(() => {
//     공공데이터포털가져오기();
//   })

  //   React.useEffect(() => {
  //   // alert("실행 여부 확인");
  //   로그인정보가져오기();
  // }, []);

  const 문의 = () => {
    navigation("/write");
  };

  const 로그인 = () => {
    navigation("/login");
  };

  const 회원가입 = () => {
    navigation("/join");
  };
  
  const 유의사항 = () => {
    navigation("/notice");
  };
  
  return (
    <div className="main">
      <div className='title-Set'>
      <div className="title">
        <h1>무인스터디카페 세종점</h1>
      </div>
        <div className='loginUser'>염*연(8455) 님 환영합니다.
        </div>
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
            <div className="time">
              {dateTime}
            </div>
          </div>
          <div className="intro_cont_divider"></div>
          <div className="seat">
            <div className="seat-main">
              <div className="소화기-카메라">
                <img src={require('./images/카메라.png')} alt="" />
                <img src={require('./images/소화기.png')} alt="" />
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>1
                <div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>2
                <div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>3
                <div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>4
                <div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>5
                <div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>6
                <div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>7
                <div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>8
                <div className="seats-배정">00:00</div>
              </div>
              <div className="소화기-카메라">
                <img src={require('./images/카메라.png')} alt="" />
                <img src={require('./images/소화기.png')} alt="" />
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>9
                <div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>
                10<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>
                11<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>
                12<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>
                13<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>
                14<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>
                15<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>
                16<div className="seats-배정">00:00</div>
              </div>
              <div className="소화기-카메라">
                <img src={require('./images/카메라.png')} alt="" />
                <img src={require('./images/소화기.png')} alt="" />
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>
                17<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>
                18<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>
                19<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>
                20<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>
                21<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>
                22<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>
                23<div className="seats-배정">00:00</div>
              </div>
              <div className="seats">
                <div className="seats-on">Off</div>
                24<div className="seats-배정">00:00</div>
              </div>
              <div className="소화기-카메라">
                <img src={require('./images/카메라.png')} alt="" />
                <img src={require('./images/소화기.png')} alt="" />
              </div>
            </div>
            <div className="seat-sub">
              <div className="drawer">
                <div className="drawers">사물함</div>
                <div className="소화기-카메라">
                  <img src={require('./images/카메라.png')} alt="" />
                  <img src={require('./images/소화기.png')} alt="" />
                </div>
              </div>
              <div className="rest">
                <div className="rests">휴게실</div>
                <div className="소화기-카메라">
                  <img src={require('./images/카메라.png')} alt="" />
                  <img src={require('./images/소화기.png')} alt="" />
                </div>
              </div>
              <div className="현위치">
                현위치 <img src={require('./images/현위치.png')} alt="" />
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
              <img src={require('./images/회원가입.png')} alt="" />
              회원가입
            </button>
            <div className="join-tips">
              처음 이용하시는 분들께서는 <br />
              회원가입 후 <br />
              이용하시기 바랍니다.
            </div>
                        <button type="button" className="menu" onClick={로그인}>
              <img src={require('./images/로그인.png')} alt="" />
              로그인
            </button>
          </div>
          <div class="intro_cont_divider"></div>
          <div className="center-menu">
            <div className="button-set">
              <button type="button" className="menu">
                <img src={require('./images/자리배정.png')} alt="" />
                자리배정
              </button>
            </div>
            <div className="button-set">
              <button type="button" className="menu">
                <img src={require('./images/정기권.png')} alt="" />
                정기/
                <br />
                시간권
                <br />
                구매
              </button>
            </div>
            <div className="button-set">
              <button type="button" className="menu">
                <img src={require('./images/사물함.png')} alt="" />
                사물함 <br />
                사용
              </button>
            </div>
            <div className="button-set">
              <button type="button" className="menu">
                <img src={require('./images/시간연장.png')} alt="" />
                시간연장/
                <br />
                좌석이동
              </button>
            </div>
            <div className="button-set">
              <button type="button" className="menu">
                <img src={require('./images/좌석반납.png')} alt="" />
                퇴실/
                <br />
                좌석반납
              </button>
            </div>
            <div className="button-set">
              <button type="button" className="menu" onClick={문의}>
                <img src={require('./images/문의.png')} alt="" />
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
              <div className='유의사항버튼'>
                <button type="button" className="menu" onClick={유의사항}>
                유의사항</button></div>
            </div>
            <div className="hp">
              세종 집현서로00 무인스터디카페
              <br />
              문의전화 010-0000-8455
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
        <Route exact path="/notice" element={<Notice />}></Route>
        <Route exact path="/kakao" element={<Kakao />}></Route>
      </Routes>
    </StoreContext.Provider>
  );
}

export default App;
/*
      <div className="ui-wrap">
        <h2>{loginUser.nickname}님, 반갑습니다.</h2>
        <button className="ui-green-button" onClick={문의}>
          글 등록
        </button>
        <table className="ui-table">
          <thead>
            <tr>
              <th>제목</th>
              <th>내용</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {article.length > 0 &&
              article.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.body}</td>
                    <td>{item.nickname}</td>
                    <td>작성일 </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div> */