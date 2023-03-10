import React from "react";
import axios from "axios";
import App, { StoreContext } from "../App.js";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

function Locker() {
  const { setGlobalModal } = React.useContext(StoreContext);

  const 사물함배정 = async () => {
    // console.log(seats);

    const { number, date } = seats.find((item) => {
      return item.state === "On";
    });

    await axios({
      url: "http://localhost:4000/locker",
      method: "POST",
      data: {
        number: number,
        date: date,
      },
    })
      .then((res) => {
        alert("사물함 배정이 완료되었습니다.");

        const findIndex = seats.findIndex((item) => {
          return item.number === number;
        });
        const cloneSeats = [...seats];
        cloneSeats[findIndex].state = "사용중";
        setSeats(cloneSeats);
      })
      .catch((error) => {
        console.log("사물함배정 에러", error);
      });
  };

  const 홈화면이동 = () => {
    setGlobalModal({
      show: false,
      type: null,
    });
  };

  const 사물함선택하기 = (클릭한사물함번호) => {
    const cloneSeats = [...seats];

    const newSeats = cloneSeats.map((item) => {
      if (item.number === 클릭한사물함번호) {
        item.state = "On";
      } else {
        item.state = "Off";
      }

      return item;
    });

    setSeats(newSeats);
  };

  const [seats, setSeats] = React.useState([]);
  React.useEffect(() => {
    const seats = [];

    for (let i = 1; i <= 24; i++) {
      seats.push({
        number: i,
        state: "Off",
      });
    }
    setSeats(seats);
  }, []);

  return (
    <div className="main-map-left">
      <div className="flex-left">
        <div className="left-배치도">
          <h2>사물함 배정</h2>
          <div className="seat-홈버튼" onClick={홈화면이동}>
            <button type="button" className="menu">
              <img src={require("../images/로그인.png")} alt="" />
            </button>
          </div>
        </div>
      </div>
      <div className="intro_cont_divider"></div>
      <div className="seat seat-H">
        <div className="seat-main seat-A">
          {seats &&
            seats.map((item, index) => {
              let 클릭한사물함클래스 = "";

              switch (item.state) {
                case "On":
                  클릭한사물함클래스 = "select-seat";
                  break;

                case "사용중":
                  클릭한사물함클래스 = "use-seat";
                  break;
              }
              return (
                <div
                  className={`seats seats-A ${클릭한사물함클래스}`}
                  key={`seats-${index}`}
                  onClick={사물함선택하기.bind(this, item.number)}
                >
                  <div className="seats-on">{item.state}</div>
                  {item.number}
                </div>
              );
            })}
        </div>
        <div className="intro_cont_divider intros"></div>
        <div className="seat-flex">
          <button type="button" className="menu menus" onClick={사물함배정}>
            사물함 배정
          </button>
          <div className="이용수칙안내">
            <div className="이용수칙안내-title">이용수칙안내</div>
            <div className="이용수칙안내내용">
              1. 현금 등 귀중품은 개인이 보관하세요.
              <br /> 2. 음식물 등은 반입 금지입니다.
              <br /> 3. 10일이상 방치된 물건은 임의 폐기 처리.
              <br /> 4. 문이 잠길 정도의 내용물만 보관하세요.
            </div>
          </div>
          <div className="legend seat-legend locker-legend">
            <div className="legends seat-legends locker-legends">
              ※ 범 례 ※
              <div className="범례묶기">
                <div className="legends-표시"></div>
                <div className="legends-표시글자">빈 사물함</div>
              </div>
              <div className="범례묶기">
                <div className="legends-표시"></div>
                <div className="legends-표시글자">사용중인 사물함</div>
              </div>
              <div className="범례묶기">
                <div className="legends-표시"></div>
                <div className="legends-표시글자">선택한 사물함</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Locker;
