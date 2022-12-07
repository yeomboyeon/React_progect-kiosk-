import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Locker() {
  const navigation = useNavigate();

  const 사물함이용 = async () => {
    await axios({
      url: "http://localhost:4000/locker",
      method: "GET",
    })
      .then((res) => {})
      .catch((error) => {
        console.log("locker 에러", error);
      });
  };

  // 작업중(22.12.07)
  return (
    <div className="flex">
      <img src={require("../images/사물함.png")} alt="" />
      사물함 이용
      <div className="main-map-left">
        <div className="flex-left">
          <div className="seats">
            <div className="seats-on">Off</div>1
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>2
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>3
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>4
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>5
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>6
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>7
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>8
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>9
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>
            10
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>
            11
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>
            12
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>
            13
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>
            14
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>
            15
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>
            16
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>
            17
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>
            18
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>
            19
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>
            20
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>
            21
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>
            22
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>
            23
          </div>
          <div className="seats">
            <div className="seats-on">Off</div>
            24
          </div>
        </div>
      </div>
      <div className="legend">
        <div className="legends">
          ※ 범 례 ※
          <div className="범례묶기">
            <div className="legends-표시"></div>
            <div className="legends-표시글자">빈사물함</div>
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
      <div className="이용수칙안내">
        <div className="이용수칙안내">이용수칙안내</div>
        <div className="이용수칙안내내용">
          1. 현금 등 귀중품은 개인이 보관하세요.
          <br /> 2. 음식물 등은 반입 금지입니다.
          <br /> 3. 사물함에 10일 이상 방치된 물건은 임의 폐기 처리됩니다.
          <br /> 4. 문이 잠길 정도의 내용물만 보관하세요.
        </div>
      </div>
    </div>
  );
}

export default Locker;
