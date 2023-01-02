import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Article() {
  const { seq } = useParams();
  const { article, setArticle } = React.useState({});

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

  const 게시판상세정보가져오기 = async () => {
    await axios({
      url: "http://localhost:4000/article_row",
      params: {
        seq: seq,
      },
    }).then((res) => {
      setArticle(res.data);
    });
  };

  React.useEffect(() => {
    게시판상세정보가져오기();
  }, []);

  const [replyText, setReplyText] = React.useState("");
  const 댓글정보저장 = (event) => {
    setReplyText(event.target.value);
  };

  const 댓글쓰기 = async () => {
    await axios({
      url: "http://localhost:4000/reply",
      method: "POST",
      data: {
        replyText: replyText,
        seq: seq,
      },
    }).then((res) => {});
  };

  return (
    <div
      className="ui-wrap"
      style={{ display: "flex", flexDirection: "column", padding: 20 }}
    >
      <div className="ui-body-wrap">
        <h2>{article.title}</h2>
        <div className="ui-body">
          <p>{article.body}</p>
        </div>
        <h3>댓글</h3>
        <div className="ui-reply">
          <div>댓글이 없습니다.</div>
        </div>
        <form className="ui-reply-form">
          <textarea onChange={댓글정보저장}></textarea>
          <button className="ui-blue-button" onClick={댓글쓰기}>
            댓글쓰기
          </button>
        </form>
      </div>
    </div>
  );
}

export default Article;
