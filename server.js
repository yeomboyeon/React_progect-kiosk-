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
// 디비실행(query) 두고 나머지 옮기고 삭제
app.get("/", async (req, res) => {
  const 데이터 = await 디비실행("SELECT * FROM user");
  console.log(데이터); // 실제 데이터 가져오는지..
  res.send("안녕 이리로 와야해");
});

// (4) 컬럼 실행할 때마다 추가해야하는 코드를 관리 하는 함수
// MYSQL에서 데이터베이스명 변경시 이곳에도 수정해야함.
// db.add 위에 함수에도 데이터베이스명 변경해주기(동일하게)
// 디비실행을 다른 곳에서 활용시 : async
//  const 데이터 = await 디비실행('쿼리문 작성');
//  console.log(데이터);
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

// 기본 설정
app.use(
  cors({
    origin: true,
    credentials: true, // session 설정 후 외부 도메인 쿠키 공유 받기
  })
);

app.get("/", (req, res) => {
  res.send("첫페이지 안녕");
});

//회원가입(id 중복체크 추가 해야 함)
app.post("/join", async (req, res) => {
  const { id, pw, nickname } = req.body; // POST일 때는 req.body로 받기 디스트 럭쳐링(보내기)
  //   console.log(req.body);

  const result = {
    code: "success",
    message: "회원가입이 완료되었습니다.",
  };

  // id 중복 체크(db.user 테이블)
  const 회원 = await 디비실행(`SELECT * FROM user WHERE id = '${id}'`);
  if (회원.length > 0) {
    result.code = "error";
    result.message = "이미 같은 아이디로 회원가입 되었습니다.";
    res.send(result);
    return;
  }
  console.log(회원);

  // 회원가입 쿼리문(INSERT INTO) 작성
  const query = `INSERT INTO user(id,password,nickname) VALUES('${id}', '${pw}', '${nickname}')`;
  await 디비실행(query);
  res.send(result);
});

//세션정보가져오기(로그인정보)
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

  // 회원이 없으면 에러표시하기
  // return 바로 턴해주기
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

// 게시판 상세정보
app.get("/article_row", async (req, res) => {
  const { seq } = req.query;
  const query = `SELECT * FROM article WHERE seq = '${seq}'`;
  const reply_query = `SELECT * FROM article WHERE seq = '${seq}'`;
  const article = await 디비실행(query);
  // console.log(article);

  res.send(article[0]);
});

// 메인페이지에 게시글 전체 보여주기
// 조회하되, article 테이블과 user 테이블의 조건을 비교해서 맞다면 실행
app.get("/article", async (req, res) => {
  const query = `SELECT * FROM article, user WHERE article.user_seq = user.seq`;
  const article = await 디비실행(query);
  res.send(article);
});

// 댓글 작성
app.post("/reply", async (req, res) => {
  const { loginUser } = req.session;
  const { seq, replyText } = req.body;

  const result = {
    code: "success",
    message: "댓글 작성 완료",
  };

  if (replyText === 0) {
    result.code = "error";
    result.message = "댓글 입력해주세요";
  }
  if (result.code === "error") {
    res.send(result);
    return;
  }

  const query = `INSERT INTO reply(body, article_seq, user_seq) VALUES('${replyText}', '${seq}', '${loginUser.seq}')`;
  await 디비실행(query);
  res.send(result);
});

// 게시글 작성
app.post("/article", async (req, res) => {
  const { title, body } = req.body;
  const { loginUser } = req.session;

  const result = {
    code: "success",
    message: "게시글 작성이 완료되었습니다.",
  };

  if (title === "") {
    result.code = "fail";
    result.message = "제목을 작성해주세요";
  }
  if (body === "") {
    result.code = "fail";
    result.message = "내용을 작성해주세요";
  }
  if (result.code === "fail") {
    res.send(result);
    return;
  }

  const query = `INSERT INTO article(title, body, user_seq) VALUES('${title}','${body}','${loginUser.seq}')`;

  await 디비실행(query);

  res.send(result);
});

//기본 설정
app.listen(port, () => {
  console.log("서버가 시작됩니다.");
});
