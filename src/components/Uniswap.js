import { React, useEffect, useState } from "react";

import price_oracleV3 from "../uniswapv3/price_oracleV3";
import UniswapV2 from "../uniswapv3/U1";

import "../css/Uniswap.css";

import img5 from "../resource/img5.png";
import img6 from "../resource/img6.png";
import img7 from "../resource/img7.png";
import img8 from "../resource/img8.png";
import img9 from "../resource/img1.png";

import { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { type } from "jquery";

const Uniswap = (props) => {
  const [from, update_from] = useState("");
  const [to, update_to] = useState("");

  const [f_amount, update_f_amount] = useState("");
  const [t_amount, update_t_amount] = useState("");

  const [fee, update_fee] = useState(0.3);
  const [dis_fee, update_dis_fee] = useState(false);

  const [min, update_min] = useState(0.0);
  const [max, update_max] = useState(0.0);

  const [tick_min, update_tick_min] = useState(0);
  const [tick_max, update_tick_max] = useState(0);

  const data = [];

  const [one_in_terms, update_one_in_terms] = useState("");
  const [pool_add, upate_pool_add] = useState("");

  const [tick_arr, update_tick_arr] = useState([]);
  const [current_price, update_current_price] = useState(0);

  const [from_value, update_from_value] = useState("--");
  const [to_value, update_to_value] = useState("--");

  const [types_of_currency, update_types_of_currency] = useState([]);

  useEffect(() => {
    for (var i = 0; i < props.wallet_data.length; i++) {
      types_of_currency.push(props.wallet_data[i].symbol);
    }

    //console.log(types_of_currency);
  }, [props.wallet_data]);

  const currency = [
    {
      key: 1,
      type: "ETH",
      Img: img9,
      value: "0xE4D27Df947A7f6e43df5e28d072dca832A67a15e",
    },
    {
      key: 2,
      type: "MATIC",
      Img: img5,
      value: "0xE4D27Df947A7f6e43df5e28d072dca832A67a15e",
    },
    {
      key: 3,
      type: "USDC",
      Img: img6,
      value: "0xE4D27Df947A7f6e43df5e28d072dca832A67a15e",
    },
    {
      key: 4,
      type: "USDT",
      Img: img7,
      value: "0xE4D27Df947A7f6e43df5e28d072dca832A67a15e",
    },
    {
      key: 5,
      type: "ONI",
      Img: img8,
      value: "0xE4D27Df947A7f6e43df5e28d072dca832A67a15e",
    },
    {
      key: 6,
      type: "RA",
      Img: img8,
      value: "0x1A7BaF78C2F213Cbf1091F648ceC7Bb564Bc98f8",
    },
  ];

  useEffect(async () => {
    if (from != "" && to != "") {
      const result = await price_oracleV3(
        from,
        to,
        "" + parseFloat(fee) * 10000
      );
      console.log(result);

      update_tick_arr(result.tick_arr);

      for (var i = 0; i < result.tick_arr.length; i++) {
        if (result.tick_arr[i].tick == result.max_tick) {
          update_max(result.tick_arr[i].value);
        }

        if (result.tick_arr[i].tick == result.min_tick) {
          update_min(result.tick_arr[i].value);
        }
      }
      var hexString = result.price_arr.amountOut._hex.toString(16);

      update_current_price(
        Math.round(parseInt(hexString, 16) * Math.pow(10, -18) * 10000) / 10000
      );
    }
  }, [from, to, fee]);

  const preview = () => {
//     const result = UniswapV2(
//       from,
//       to,
//       1,
//       2.0845184651104063,
//       fee * 10000,
     
// 1080,
//       4080,
//       props.waladd
//     );
UniswapV2();
  };

  const update_max_ = (x) => {
    for (var i = 0; i < tick_arr.length; i++) {
      if (tick_arr[i].value >= x) {
        update_max(tick_arr[i].value);

        break;
      }
    }
  };

  const update_min_ = (x) => {
    for (var i = 0; i < tick_arr.length; i++) {
      if (tick_arr[i].value >= x) {
        update_min(tick_arr[i].value);
        break;
      }
    }
  };

  const exchange = (x, current_price, max, min) => {
    let price = current_price;
    let price_high = max;
    let price_low = min;
    let L =
      (x * Math.sqrt(price) * Math.sqrt(price_high)) /
      (Math.sqrt(price_high) - Math.sqrt(price));

    let y = L * (Math.sqrt(price) - Math.sqrt(price_low));
    console.log(y);
    return y;
  };


  const exchange2 = (y, current_price, max, min) => {

    

    let price = current_price;
    let price_high = max;
    let price_low = min;
   
    let L=y/(Math.sqrt(price) - Math.sqrt(price_low));

    let x=(L*(Math.sqrt(price_high) - Math.sqrt(price)))/(Math.sqrt(price) * Math.sqrt(price_high))


   
   
  
    return x;
  };

  const [dis, update_dis] = useState(true);
  const [dis2, update_dis2] = useState(true);

  const [key1, update_key1] = useState(-1);
  const [key2, update_key2] = useState(-1);

  useEffect(() => {
    const temp = document.getElementsByClassName("thefocus");
    const temp1 = document.getElementsByClassName("sub-btn");
    const temp2 = document.getElementsByClassName("add-btn");

    temp[0].addEventListener("focusout", (event) => {
      update_min_(min);
    });

    temp[1].addEventListener("focusout", (event) => {
      update_max_(max);
    });
  }, [max, min]);

  return (
    <div className="background">
      {!dis && (
        <div
          className="back-drop"
          onClick={() => {
            update_dis(!dis);
          }}
        >
          <div className="popup">
            {props.balance >= 0 && (
              <div
                className="pop-outer"
                onClick={() => {
                  update_from(currency[1].value);
                  update_from_value(currency[1].type);
                  update_dis(!dis);
                  update_key1(1);
                }}
              >
                <img src={img5}></img>
                <div className="pop-inner">
                  <h5> MATIC</h5>
                </div>
              </div>
            )}

            {types_of_currency.includes("USDC") && (
              <div
                className="pop-outer"
                onClick={() => {
                  update_from(currency[2].value);
                  update_from_value(currency[2].type);
                  update_dis(!dis);
                  update_key1(2);
                }}
              >
                <img src={img6}></img>
                <div className="pop-inner">
                  <h5> USDC</h5>
                </div>
              </div>
            )}

            {types_of_currency.includes("USDT") && (
              <div
                className="pop-outer"
                onClick={() => {
                  update_from(currency[3].value);
                  update_from_value(currency[3].type);
                  update_dis(!dis);
                  update_key1(3);
                }}
              >
                <img src={img7}></img>
                <div className="pop-inner">
                  <h5> USDT</h5>
                </div>
              </div>
            )}

            {types_of_currency.includes("ONI") && (
              <div
                className="pop-outer"
                onClick={() => {
                  update_from(currency[4].value);
                  update_from_value(currency[4].type);
                  update_dis(!dis);
                  update_key1(4);
                }}
              >
                <img src={img8}></img>
                <div className="pop-inner">
                  <h5>ONI</h5>
                </div>
              </div>
            )}

            {types_of_currency.includes("RA") && (
              <div
                className="pop-outer"
                onClick={() => {
                  update_from(currency[5].value);
                  update_from_value(currency[5].type);
                  update_dis(!dis);
                  update_key1(5);
                }}
              >
                <img src={img8}></img>
                <div className="pop-inner">
                  <h5>RA</h5>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {!dis2 && (
        <div
          className="back-drop"
          onClick={() => {
            update_dis2(!dis2);
          }}
        >
          <div className="popup">
            {props.balance >= 0 && (
              <div
                className="pop-outer"
                onClick={() => {
                  update_to(currency[1].value);
                  update_to_value(currency[1].type);
                  update_dis2(!dis2);
                  update_key2(1);
                }}
              >
                <img src={img5}></img>
                <div className="pop-inner">
                  <h5> MATIC</h5>
                </div>
              </div>
            )}

            {types_of_currency.includes("USDC") && (
              <div
                className="pop-outer"
                onClick={() => {
                  update_to(currency[2].value);
                  update_dis2(!dis2);
                  update_key2(2);
                }}
              >
                <img src={img6}></img>
                <div className="pop-inner">
                  <h5> USDC</h5>
                </div>
              </div>
            )}

            {types_of_currency.includes("USDT") && (
              <div
                className="pop-outer"
                onClick={() => {
                  update_to(currency[3].value);
                  update_to_value(currency[3].type);
                  update_dis2(!dis2);
                  update_key2(3);
                }}
              >
                <img src={img7}></img>
                <div className="pop-inner">
                  <h5> USDT</h5>
                </div>
              </div>
            )}

            {types_of_currency.includes("ONI") && (
              <div
                className="pop-outer"
                onClick={() => {
                  update_to(currency[4].value);
                  update_to_value(currency[4].type);
                  update_dis2(!dis2);
                  update_key2(4);
                }}
              >
                <img src={img8}></img>
                <div className="pop-inner">
                  <h5>ONI</h5>
                </div>
              </div>
            )}

            {types_of_currency.includes("RA") && (
              <div
                className="pop-outer"
                onClick={() => {
                  update_to(currency[5].value);
                  update_to_value(currency[5].type);
                  update_dis2(!dis2);
                  update_key2(5);
                }}
              >
                <img src={img8}></img>
                <div className="pop-inner">
                  <h5>RA</h5>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="outer-div0">
        <h3>Add Liquidity</h3>
        <p id="line"></p>
        <div className="outer-div">
          <div className="outer-div1">
            <div className="inner-div">
              <h4>Select Pair</h4>
              <div className="inner-div1">
                <p
                  className={"sele"}
                  onClick={() => {
                    update_dis(!dis);
                  }}
                >
                  {key1 != -1 && <img src={currency[key1].Img}></img>}
                  {key1 != -1 ? currency[key1].type : "Select a token"}
                </p>
                <p
                  className={"sele"}
                  onClick={() => {
                    update_dis2(!dis2);
                  }}
                >
                  {key2 != -1 && <img src={currency[key2].Img}></img>}
                  {key2 != -1 ? currency[key2].type : "Select a token"}
                </p>
              </div>

              <div className="inner-div2">
                <p>{fee}% fee tier</p>
                <button
                  className="edit-btn"
                  onClick={() => {
                    update_dis_fee(!dis_fee);
                  }}
                >
                  {dis_fee == true ? "hide" : "edit"}
                </button>
              </div>

              {dis_fee && (
                <div className="inner-div2-1">
                  <button
                    onClick={() => {
                      update_fee(0.01);
                    }}
                  >
                    0.01%
                    <p>Best for very stable pairs</p>
                  </button>
                  <button
                    onClick={() => {
                      update_fee(0.05);
                    }}
                  >
                    0.05%
                    <p>Best for very stable pairs</p>
                  </button>
                  <button
                    onClick={() => {
                      update_fee(0.3);
                    }}
                  >
                    0.3%
                    <p>Best for very most pairs</p>
                  </button>
                  <button
                    onClick={() => {
                      update_fee(1);
                    }}
                  >
                    1%
                    <p>Best for very exotic pairs</p>
                  </button>
                </div>
              )}

              <h4>Deposit Amounts</h4>

              <div className="inner-div3">
                <input
                  name={"f_amount"}
                  value={f_amount}
                  placeholder={"0"}
                  onChange={(event) => {
                    update_f_amount(event.target.value);
                    update_t_amount(
                      exchange(event.target.value, current_price, max, min)
                    );
                  }}
                  type={"number"}
                ></input>
                <input
                  name={"t_amount"}
                  value={t_amount}
                  placeholder={"0"}
                  onChange={(event) => {
                    update_t_amount(event.target.value);
                    update_f_amount(
                      exchange2(event.target.value, current_price, max, min)
                    );
                  }}
                  type={"number"}
                ></input>
                <h6>{from_value}</h6>
                <h6>{to_value}</h6>
              </div>
            </div>
          </div>

          <div className="outer-div2">
            <h4>Set Price Range</h4>
            <p>
              Current Price: &ensp;{current_price}&ensp; {to_value}&ensp; per
              &ensp;{from_value}
            </p>

            <div className="inner-div2-1">
              <div className="inner-div-left">
                <h4>Min Price</h4>

                <input
                  type="number"
                  value={Math.round(min * 10000) / 10000}
                  className={"thefocus"}
                  onChange={(event) => {
                    update_min(event.target.value);
                  }}
                ></input>
                <h4>
                  {to_value} per {from_value}
                </h4>
                <button
                  className="sub-btn"
                  onClick={() => {
                    update_min(min - 1.0);
                    update_min_(min - 1.0);
                  }}
                >
                  -
                </button>
                <button
                  className="add-btn"
                  onClick={() => {
                    update_min(min + 1.0);
                    update_min_(min + 1.0);
                  }}
                >
                  +
                </button>
              </div>
              <div className="inner-div-right">
                <h4>Max Price</h4>
                <input
                  type="number"
                  value={Math.round(max * 10000) / 10000}
                  className={"thefocus"}
                  onChange={(event) => {
                    update_max(event.target.value);
                  }}
                ></input>
                <h4>
                  {to_value} per {from_value}
                </h4>
                <button
                  className="sub-btn"
                  onClick={() => {
                    update_max(max - 1.0);
                    update_max_(max - 1.0);
                  }}
                >
                  -
                </button>
                <button
                  className="add-btn"
                  onClick={() => {
                    update_max(max + 1.0);
                    update_max_(max + 1.0);
                  }}
                >
                  +
                </button>
              </div>
            </div>

            <button className="full-range">Full Range</button>
            <button className="uni-preview" onClick={preview}>
              Preview
            </button>
          </div>
        </div>
         
      </div>
    </div>
  );
};

export default Uniswap;
