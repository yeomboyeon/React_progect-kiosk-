import React from "react";
import axios from "axios";

const StoreContext = React.createContext({});

// 게시글 작성
function Write() {
  const { loginUser } = React.useContext(StoreContext);

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
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", padding: 20 }}>
      <h2>게시글 작성</h2>
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
