import React from "react";
import App, { StoreContext } from "../App.js";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import axios from "axios";
dayjs.locale("ko");

/*시간연장/자리이동 : TimeExtension*/

function TimeExtension({ seats, setSeats }) {
  const { setGlobalModal } = React.useContext(StoreContext);

  const 자리선택하기 = (클릭한자리번호) => {
    const cloneSeats = [...seats];

    const newSeats = cloneSeats.map((item) => {
      if (item.number === 클릭한자리번호) {
        item.state = "On";
        item.date = dayjs().format("HH:mm");
      } else {
        item.state = "Off";
        item.date = "00:00";
      }

      return item;
    });

    setSeats(newSeats);
  };

  // 홈화면으로 이동시 초기화하기
  const 홈화면이동 = () => {
    // const cloneSeats = [...seats].map((item) => {
    //   item.state = "Off";
    //   item.date = "00:00";
    //   return item;
    // });

    // setSeats(cloneSeats);
    setGlobalModal({
      show: false,
      type: null,
    });
  };

  const 시간연장 = async () => {
    // console.log(seats);

    const { number, date } = seats.find((item) => {
      return item.state === "On";
    });

    await axios({
      url: "http://localhost:4000/timeExtension",
      method: "POST",
      data: {
        number: number,
        date: date,
      },
    })
      .then((res) => {
        alert("시간연장이 완료되었습니다.");

        const findIndex = seats.findIndex((item) => {
          return item.number === number;
        });
        const cloneSeats = [...seats];
        cloneSeats[findIndex].state = "사용중";
        setSeats(cloneSeats);
      })
      .catch((error) => {
        console.log("시간연장 에러", error);
      });
  };

  return (
    <div className="main-map-left">
      <div className="flex-left">
        <div className="left-배치도">
          <h2>좌석 배치도</h2>
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
              let 클릭한자리클래스 = "";

              switch (item.state) {
                case "On":
                  클릭한자리클래스 = "select-seat";
                  break;

                case "사용중":
                  클릭한자리클래스 = "use-seat";
                  break;
              }
              return (
                <div
                  className={`seats seats-A ${클릭한자리클래스}`}
                  key={`seats-${index}`}
                  onClick={자리선택하기.bind(this, item.number)}
                >
                  <div className="seats-on">{item.state}</div>
                  {item.number}
                  <div className="seats-배정">{item.date}</div>
                </div>
              );
            })}
        </div>
        <div className="intro_cont_divider intros"></div>
        <div className="seat-flex">
          <button type="button" className="menu menus" onClick={시간연장}>
            시간연장
          </button>
          <div className="legend seat-legend">
            <div className="legends seat-legends">
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
  );
}

export default TimeExtension;
