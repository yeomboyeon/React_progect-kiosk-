import "./App.css";
import { Routes, Route, useNavigate, useNavigation } from "react-router-dom";
import React from "react";
import axios from "axios";
import Login from "./pages/login.js";
import Join from "./pages/join.js";
import Write from "./pages/write.js";
import Article from "./pages/article.js";

//session 설정 후 도메인이 다른 포트 번호와 쿠키 공유가 안되는데 공유 가능해짐
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
 * 13. 메인페이지에 게시판 상세정보 구현
 * 14.
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
    alert("실행 여부 확인");
    게시글정보가져오기();
  }, []);

  const 글등록페이지이동 = () => {
    navigation("/write");
  };

  return (
    <div className="ui-wrap">
      <h2>{loginUser.nickname}님, 반갑습니다.</h2>
      <button className="ui-green-button" onClick={글등록페이지이동}>
        글 등록
      </button>
      <table className="ui-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>내용</th>
            <th>작성자</th>
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
                </tr>
              );
            })}
        </tbody>
      </table>
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
      </Routes>
    </StoreContext.Provider>
  );
}

export default App;
