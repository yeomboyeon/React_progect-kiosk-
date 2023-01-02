import React from "react";
import axios from "axios";
import App, { StoreContext } from "../App.js";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

// 문의사항 작성
function Write() {
  const { loginUser } = React.useContext(StoreContext);
  const { setGlobalModal } = React.useContext(StoreContext);
  const [article, setArticle] = React.useState([]);
  const [data, setDate] = React.useState({
    title: "",
    body: "",
  });

  const 데이터변경 = (event) => {
    const name = event.target.name;
    const cloneData = { ...data };
    cloneData[name] = event.target.value;
    setDate(cloneData);
  };

  const 홈화면이동 = () => {
    setGlobalModal({
      show: false,
      type: null,
    });
  };

  const 게시글작성 = async () => {
    await axios({
      url: "http://localhost:4000/article",
      method: "POST",
      data: data,
    }).then((res) => {
      console.log(res.data);
      alert("글 작성이 완료되었습니다.");
      setArticle(res.data);
    });
  };

  const 게시글정보가져오기 = async () => {
    await axios({
      url: "http://localhost:4000/article",
    }).then((res) => {
      // console.log(res.data);
      setArticle(res.data);
    });
  };
  React.useEffect(() => {
    게시글정보가져오기();
  }, []);

  return (
    <div className="write-main">
      <div className="write-left">
        <h2 className="write-title-제목">전체글</h2>
        <table className="ui-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>내용</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody className="write-tbody">
            {article.length > 0 &&
              article.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.seq}</td>
                    <td>{item.title}</td>
                    <td>{item.body}</td>
                    <td>{item.id}</td>
                    <td>{item.date} </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <div
        className="write-right"
        style={{ display: "flex", flexDirection: "column", padding: 20 }}
      >
        <h2 style={{ textAlign: "center" }}>문의사항</h2>
        <div className="홈버튼 write-홈버튼">
          <button type="button" className="menu" onClick={홈화면이동}>
            <img src={require("../images/로그인.png")} alt="" />
          </button>
        </div>
        <h3 style={{ marginTop: -10, marginBottom: 5 }}>제 목</h3>
        <input className="write-title" name="title" onChange={데이터변경} />
        <h3 style={{ marginBottom: 5 }}>내 용</h3>
        <textarea
          name="body"
          onChange={데이터변경}
          cols="70"
          rows="20"
        ></textarea>
        <button
          className="write-button"
          onClick={게시글작성}
          type="button"
          style={{ marginTop: 20 }}
        >
          작성하기
        </button>
      </div>
    </div>
  );
}

export default Write;
