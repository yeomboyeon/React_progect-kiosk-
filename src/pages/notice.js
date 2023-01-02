import React from "react";
import axios from "axios";
import App, { StoreContext } from "../App.js";

function Notice() {
  const { setGlobalModal } = React.useContext(StoreContext);

  const 유의사항 = async () => {
    await axios({
      url: "http://localhost:4000/notice",
      method: "GET",
    })
      .then((res) => {})
      .catch((error) => {
        console.log("notice 에러", error);
      });
  };

  const 홈화면이동 = () => {
    setGlobalModal({
      show: false,
      type: null,
    });
  };

  return (
    <div className="유의사항">
      <div className="유의-left">
        <div className="유의-제목">유의사항</div>
        <br />
        <div className="유의-부제목">Ⅰ. 퇴실 시간을 지켜주시기 바랍니다.</div>
        <br />
        <div className="유의-내용">
          1. 최초 구매한 시간이 종료 되기 전에 연장해 주세요.
        </div>
        <div className="유의-내용">
          2. 종료 시간이 지나면 더이상 연장 불가, 즉시 퇴실, 아니면 다시 시간
          단위로 구매.
        </div>
        <div className="유의-내용">
          3. 종료시간 20분 이내까지는 나가는 문이 열리지만, 들어오는 문은 열리지
          않음
        </div>
        <div className="유의-세부내용">
          가. 20분이 초과하게 되면 해당 카드로는 더이상 출입이 불가능하게
          됩니다.
        </div>
        <div className="유의-세부내용">
          나. 종료시간이 지나게 되면 좌석번호등에 불이 꺼지게 됩니다
        </div>
        <div className="유의-세부내용">
          다· 동시에 키오스크에서도 빈좌석으로 세팅되어, 다른회원이 선택
          가능합니다.
        </div>
        <br />
        <div className="유의-부제목">
          Ⅱ. 카페 출입시 회원카드를 항상 소지해주세요.
        </div>
        <br />
        <div className="유의-내용">
          1. Campus를 들어갈때, 나갈때 모두 회원카드가 필요합니다.
        </div>
        <div className="유의-내용">
          2. Study Room을 들어갈때, 나갈때도 모두 회원카드가 필요합니다.
        </div>
        <div className="유의-내용">
          3. 회원카드는 타인에게 대여 및 판매 불가 합니다.
        </div>
        <br />
        <div className="유의-부제목">
          Ⅲ. Campus에서는 반드시 조용히 해주세요
        </div>
        <br />
        <div className="유의-내용">
          1. 주변에 열심히 공부하는 친구들을 위한 기본적인 에티켓을 꼭
          지켜주시기 바랍니다.
        </div>
        <div className="유의-내용">
          2. 소근소근대거나, 작게 말하는 행동도 하지 말아주세요.
        </div>
        <div className="유의-내용">
          3. 꼭 필요한 대화는 Canteen(휴게실)을 이용 해주세요.
        </div>
        <br />
        <div className="유의-부제목">Ⅳ. 결제된 내용은 환불이 불가합니다.</div>
        <br />
        <div className="유의-내용">1. 결제시 신중히 고려 후 결제 바랍니다.</div>
        <br />
        <br />
        <div className="유의-부제목">
          Ⅴ. 24시간 CCTV가 여러분을 지키고 있습니다.
        </div>
        <br />
        <div className="유의-내용">
          1. 위급 상황 발생시 비상벨을 누르면 경비업체가 10분 이내 긴급
          출동합니다.
        </div>
        <div className="유의-내용">
          2. 남/녀 화장실 구분, 화장실 입구 CCTV가 설치되어 있으니 안심하고 이용
          바랍니다.
        </div>
        <div className="유의-내용">
          3. 키오스크가 있는 공간에 모니터에서 CCTV로 촬영중인 화면을 실시간
          확인 가능.
        </div>
        <div className="유의-내용">
          4. CCTV로 촬영된 내용은 24시간 녹화중이니 안심하고 이용바랍니다.
        </div>
      </div>
      <div className="유의-right">
        <div className="유의-제목">주차안내</div>
        <div className="홈버튼 notice-홈버튼">
          <button type="button" className="menu" onClick={홈화면이동}>
            <img src={require("../images/로그인.png")} alt="" />
          </button>
        </div>
        <br />
        <div className="유의-부제목">
          Ⅰ. 저희 스터디카페 바로 옆 지상 1층에 소재
        </div>
        <br />
        <div className="유의-부제목">Ⅱ. 스터디카페 입구까지 도보 23초 거리</div>
        <br />
        <div className="유의-부제목">Ⅲ. 주차요금안내</div>
        <div className="유의-내용">
          <br />
          1. 최초 10분까지 무료
        </div>
        <div className="유의-내용">2. 30분이내 600원</div>
        <div className="유의-내용">3. 30분초과 매 15분당 300원씩</div>
        <div className="유의-내용">4. 1일주차요금 9,000원</div>
        <br />
        <div className="유의-부제목">
          Ⅳ. 평일 저녁 7시 이후 및 토/일/공휴일 무료 개방
        </div>
        <br />
        <div className="유의-부제목">
          Ⅴ. 7시간 초과 주차시에는 일주차 9,000원으로 이용하시면 됩니다.
        </div>
      </div>
    </div>
  );
}

export default Notice;
