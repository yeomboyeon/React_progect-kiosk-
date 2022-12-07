import React from "react";
import axios from "axios";

const StoreContext = React.createContext({});

// 게시글 작성
function Write() {
  const { loginUser } = React.useContext(StoreContext);
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

  const 게시글작성 = async () => {
    await axios({
      url: "http://localhost:4000/article",
      method: "POST",
      data: data,
    }).then((res) => {
      console.log(res.data);
      setArticle(res.data);

      if (res.data.code === "success") {
        window.location.href = "/";
      }
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: 20 }}>
      <h2>문의사항</h2>
      <h3>제목</h3>
      <input name="title" onChange={데이터변경} />
      <h4>내용</h4>
      <textarea
        name="body"
        onChange={데이터변경}
        cols="70"
        rows="20"
      ></textarea>
      <button onClick={게시글작성} type="button" style={{ marginTop: 20 }}>
        작성하기
      </button>
    </div>
  );
}

export default Write;

/**
 * 
 *   // 게시판 전체 가져와서 main페이지에 출력
  const 게시글정보가져오기 = async () => {
    await axios({
      url: "http://localhost:4000/article",
    }).then((res) => {
      
    });
  };
  React.useEffect(() => {
    alert("문의사항 화면 입니다.");
    게시글정보가져오기();
  }, []);
 */
// 전체 게시글 보여주기
/*     <div className="ui-wrap">
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
