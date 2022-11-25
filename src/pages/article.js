import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Article() {
  const { seq } = useParams();
  const { article, setArticle } = React.useState({});

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

  return <div>게시판 상세정보</div>;
}

export default Article;
