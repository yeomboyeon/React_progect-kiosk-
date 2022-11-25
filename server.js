const express = require("express");
const cors = require("cors");
// const { useReducer } = require("react");

const app = express();
const port = 4000;

// 세션 관리 미들웨어
const session = require("express-session");

// MYSQL 연결 설정
const mysql = require("mysql2");
const db = mysql.createPoolCluster();

// express 4.16 이후 버전 - POST, json 요청을 받기 위함
app.use(express.json());

// Session 설정
app.use(
  session({
    secret: "SECRET", // 암호화하는데 쓰일 키(아무거나 작성해도 무방)
    resave: false, // 세션을 언제 저장할지 설정
    saveUninitialized: true, // 세션이 저장되기 전 Uninitialized 상태로 미리 만들어 저장
  })
);

// mysql 연결(mysql 최초 호스트 연결설정 창과 동일하게)
// "article_project", "변경 가능"
db.add("article", {
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "article",
  port: 3306,
});

// (3) 비동기를 동기로 변환, promise 객체로 묶기
// (4) 너무 코드가 길기 때문에 함수로 빼서 관리 및 활용 필요
// MYSQL에서 데이터베이스명 변경시 이곳에도 수정해야함.
// db.add 위에 함수에도 데이터베이스명 변경해주기(동일하게)
app.get("/", async (req, res) => {
  // console.log("11111"); // 동기로 변환 여부 확인
  const 데이터 = await new Promise(function (resolve, reject) {
    db.getConnection("article", function (error, connection) {
      if (error) {
        console.log("데이터베이스 연결 오류", error);
        reject(true);
      }
      connection.query("SELECT * FROM user", function (error, data) {
        if (error) {
          console.log("쿼리 연결 오류", error);
          reject(true);
        }
        resolve(data); // 성공시
        // console.log(data);
        // console.log("22222"); // 동기로 변환 여부 확인
      });
      connection.release();
    });
  });
  // console.log("33333"); // 동기로 변환 여부 확인
  console.log(데이터); // 실제 데이터 가져오는지..
  res.send("안녕 이리로 와야해");
});

// (4) 컬럼 실행할 때마다 추가해야하는 코드를 관리 하는 함수
// MYSQL에서 데이터베이스명 변경시 이곳에도 수정해야함.
// db.add 위에 함수에도 데이터베이스명 변경해주기(동일하게)
function 디비실행(query) {
  return new Promise(function (resolve, reject) {
    db.getConnection("article", function (error, connection) {
      if (error) {
        console.log("데이터베이스 연결 오류", error);
        reject(true);
      }
      // 실행될 때 커리만 바뀌기 때문에 query로 바꾸기
      connection.query(query, function (error, data) {
        if (error) {
          console.log("쿼리 연결 오류", error);
          reject(true);
        }
        resolve(data); // 성공시
      });
      connection.release();
    });
  });
}

app.use(
  cors({
    origin: true,
    credentials: true, // session 설정 후 외부 도메인 쿠키 공유 받기
  })
);

app.get("/", (req, res) => {
  res.send("첫페이지 안녕");
});

//회원가입
app.post("/join", (req, res) => {
  const { id, pw } = req.body; // POST일 때는 req.body로 받기 디스트 럭쳐링(보내기)
  //   console.log(req.body);

  const result = {
    code: "success",
    message: "회원가입이 완료되었습니다.",
  };

  res.send(result);
});

app.get("/user", (req, res) => {
  res.send(req.session.loginUser);
});

// 로그인
app.post("/login", async (req, res) => {
  // console.log(req.body);
  const { id, pw } = req.body;

  const result = {
    code: "success",
    message: "로그인이 완료되었습니다.",
  };

  const 회원 = await 디비실행(
    `SELECT * FROM user WHERE id = '${id}' AND '${pw}'`
  );

  if (회원.length === 0) {
    result.code = "error";
    result.message = "회원정보가 존재하지 않습니다.";
    res.send(result);
    return;
  }
  // session 저장 (loginUser는 아무 이름 사용 가능)
  req.session.loginUser = 회원[0];
  req.session.save();

  res.send(result);
});

// // session 설정 후 테스트
// 왜 안돼는지 중간중간에 확인해보자..
// app.get("/test", (req, res) => {
//   console.log(req.session);
//   res.send("//");
// });

app.listen(port, () => {
  console.log("서버가 시작됩니다.");
});
