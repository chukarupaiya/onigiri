import { React, useState, useEffect } from "react";

import "../css/Sushi.css";

import axios from "axios";

import sushi_oracle from "../sushi/sushi_oracle";

import sushiv3 from "../sushi/sushi";

import img1 from "../resource/img1.png";
import img2 from "../resource/img2.png";
import img3 from "../resource/img3.webp";

import img5 from "../resource/img5.png";
import img6 from "../resource/img6.png";
import img7 from "../resource/img7.png";
import img8 from "../resource/img8.png";
import img9 from "../resource/img9.png";
import img10 from "../resource/img10.png";
import img11 from "../resource/img11.png";

const Sushi = (props) => {
  const [net, update_net] = useState("");
  const [type, update_type] = useState("");
  const [tier, update_tier] = useState("");
  const [from, update_from] = useState("");
  const [to, update_to] = useState("");
  const [from_a, update_from_a] = useState("");
  const [to_a, update_to_a] = useState("");
  const [div1, update_div1] = useState(false);
  const [div2, update_div2] = useState(false);
  const [div3, update_div3] = useState(false);
  const [div4, update_div4] = useState(false);
  const [from_value, update_from_value] = useState("--");
  const [to_value, update_to_value] = useState("--");

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
    {
      key: 7,
      type: "LINK",
      Img: img8,
      value: "0x326c977e6efc84e512bb9c30f76e30c160ed06fb",
    },
    {
      key: 8,
      type: "DAI",
      Img: img8,
      value: "0x001b3b4d0f3714ca98ba10f6042daebf0b1b7b6f",
    },
  ];

  const [dis, update_dis] = useState(true);
  const [dis2, update_dis2] = useState(true);

  const [key1, update_key1] = useState(-1);
  const [key2, update_key2] = useState(-1);

  const [types_of_currency, update_types_of_currency] = useState([]);

  useEffect(() => {
    for (var i = 0; i < props.wallet_data.length; i++) {
      types_of_currency.push(props.wallet_data[i].symbol);
    }
  }, [props.wallet_data]);

  const [conversion, udpate_conversion] = useState(0);

  const exchange1 = (x) => {
    update_to_a(Math.round(x * conversion * 10000) / 10000);
  };

  const exchange2 = (x) => {
    update_from_a(Math.round((x / conversion) * 10000) / 10000);
  };

  useEffect(async () => {
    if (from != "" && to != "") {
      // console.log(from);
      // console.log(to);

      var result = await sushi_oracle(from, to);

      //  console.log(result._hex);
      var hexString = result._hex.toString(16);

      udpate_conversion(parseInt(hexString, 16) * Math.pow(10, -18));
    }
  }, [from, to]);

  const call_popup = async (result) => {
    //console.log(result.hash);

    const options = {
      method: "GET",
      url:
        "  https://api.polygonscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=" +
        result.hash +
        "&apikey=K8EINRE272U6K25UMWCWW9KUU2ATYF6BTK",
      headers: {
        accept: "application/json",
      },
    };

    var status;

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        status = response.data.status == "1" ? true : false;
      })
      .catch(function (error) {
        console.error(error);
      });

    props.update_loading_status_(false);

    if (status == true) {
      setTimeout(() => {
        props.update_sidepopup_status_(true);
        props.update_sidepopup_status_value_({
          result: true,
          hash: result.hash,
        });
      }, 2000);

      setTimeout(() => {
        props.update_sidepopup_status_(false);
      }, 10000);
    } else {
      setTimeout(() => {
        props.update_sidepopup_status_(true);
        props.update_sidepopup_status_value_({
          result: false,
          hash: result.hash,
        });
      }, 2000);

      setTimeout(() => {
        props.update_sidepopup_status_(false);
      }, 10000);
    }
  };

  const [bal1, update_bal1] = useState(0);
  const [bal2, update_bal2] = useState(0);

  useEffect(() => {
    if (key1 != -1) {
      for (var i = 0; i < props.wallet_data.length; i++) {
        if (props.wallet_data[i].symbol == currency[key1].type) {
          update_bal1(
            Math.round(
              props.wallet_data[i].balance * Math.pow(10, -18) * 1000
            ) / 1000
          );
        }
      }
    }

    if (key2 != -1) {
      for (var i = 0; i < props.wallet_data.length; i++) {
        if (props.wallet_data[i].symbol == currency[key2].type) {
          update_bal2(
            Math.round(
              props.wallet_data[i].balance * Math.pow(10, -18) * 1000
            ) / 1000
          );
        }
      }
    }

    // console.log(bal1);
    // console.log(bal2);
  }, [key1, key2]);

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
            {types_of_currency.includes("LINK") && (
              <div
                className="pop-outer"
                onClick={() => {
                  update_from(currency[6].value);
                  update_from_value(currency[6].type);
                  update_dis(!dis);
                  update_key1(6);
                }}
              >
                <img src={img8}></img>
                <div className="pop-inner">
                  <h5>LINK</h5>
                </div>
              </div>
            )}

            {types_of_currency.includes("DAI") && (
              <div
                className="pop-outer"
                onClick={() => {
                  update_from(currency[7].value);
                  update_from_value(currency[7].type);
                  update_dis(!dis);
                  update_key1(7);
                }}
              >
                <img src={img8}></img>
                <div className="pop-inner">
                  <h5>DAI</h5>
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

            {types_of_currency.includes("LINK") && (
              <div
                className="pop-outer"
                onClick={() => {
                  update_to(currency[6].value);
                  update_to_value(currency[6].type);
                  update_dis2(!dis2);
                  update_key2(6);
                }}
              >
                <img src={img8}></img>
                <div className="pop-inner">
                  <h5>LINK</h5>
                </div>
              </div>
            )}

            {types_of_currency.includes("DAI") && (
              <div
                className="pop-outer"
                onClick={() => {
                  update_to(currency[7].value);
                  update_to_value(currency[7].type);
                  update_dis2(!dis2);
                  update_key2(7);
                }}
              >
                <img src={img8}></img>
                <div className="pop-inner">
                  <h5>DAI</h5>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="souter-1">
        <div className="souter-2">
          <div className="sinner-1">
            <p
              onClick={() => {
                update_div1(!div1);
              }}
            >
              Network
            </p>

            {net != "" && <img id="selected-img" src={img5}></img>}
            {div1 && (
              <div className="sinner-1-1">
                <div className="d">
                <img
                  src={img5}
                  onClick={() => {
                    update_net("MATIC");
                    update_div1(!div1);
                  }}
                ></img>
                </div>
                <div className="d">
                <div className="dark"></div>
                  <img
                    src={img1}
                    onClick={() => {
                      //update_net("ETH");
                      update_div1(!div1);
                    }}
                  ></img>
                </div>
                <div className="d">
                <div className="dark"></div>
                  <img
                    src={img9}
                    onClick={() => {
                      //update_net("ETH");
                      update_div1(!div1);
                    }}
                  ></img>
                </div>

                <div className="d">
                <div className="dark"></div>
                  <img
                    src={img10}
                    onClick={() => {
                      // update_net("ETH");
                      update_div1(!div1);
                    }}
                  ></img>
                </div>

                <div className="d">
                <div className="dark"></div>
                  <img
                    src={img11}
                    onClick={() => {
                      // update_net("ETH");
                      update_div1(!div1);
                    }}
                  ></img>
                </div>
              </div>
            )}
          </div>

          {/* <div className="sinner-2">
          <p
            onClick={() => {
              update_div2(!div2);
            }}
          >
            2. Select Type
          </p>
          {type != "" && <p id="selected-type">{type}</p>}
          {div2 && (
            <div className="sinner-2-1">
              <div
                className={
                  type != "classic" ? "sinner-2-1-1" : "sinner-2-1-1 sinner-bg"
                }
                onClick={() => {
                  update_type("classic");
                  update_div2(!div2);
                }}
              >
                <h5>Classic</h5>
                <h6>Suitable for regular pairs</h6>
              </div>
              <div
                className={
                  type != "stable" ? "sinner-2-1-2" : "sinner-2-1-2 sinner-bg"
                }
                onClick={() => {
                  update_type("stable");
                  update_div2(!div2);
                }}
              >
                <h5>Stable</h5>
                <h6>Suitable for stable pairs</h6>
              </div>
            </div>
          )}
        </div>

        <div className="sinner-3">
          <p
            onClick={() => {
              update_div3(!div3);
            }}
          >
            3. Select Tier
          </p>
          {tier != "" && <p id="selected-tier">{tier}</p>}
          {div3 && (
            <div className="sinner-3-1">
              <div
                className={
                  tier != "0.01%" ? "sinner-3-1-1" : "sinner-3-1-1 sinner-bg"
                }
                onClick={() => {
                  update_tier("0.01%");
                  update_div3(!div3);
                }}
              >
                <h5>0.01%</h5>
                <h6>Best for stable pairs</h6>
              </div>
              <div
                className={
                  tier != "0.05%" ? "sinner-3-1-2" : "sinner-3-1-2 sinner-bg"
                }
                onClick={() => {
                  update_tier("0.05%");
                  update_div3(!div3);
                }}
              >
                <h5>0.05%</h5>
                <h6>Best for less volatile pairs</h6>
              </div>
              <div
                className={
                  tier != "0.3%" ? "sinner-3-1-3" : "sinner-3-1-3 sinner-bg"
                }
                onClick={() => {
                  update_tier("0.3%");
                  update_div3(!div3);
                }}
              >
                <h5>0.3%</h5>
                <h6>Best for most pairs</h6>
              </div>
              <div
                className={
                  tier != "1%" ? "sinner-3-1-4" : "sinner-3-1-4 sinner-bg"
                }
                onClick={() => {
                  update_tier("1%");
                  update_div3(!div3);
                }}
              >
                <h5>1%</h5>
                <h6>Best for volatile pairs</h6>
              </div>
            </div>
          )}
        </div> */}

          <div className="sinner-4">
            <p
              onClick={() => {
                update_div4(!div4);
              }}
            >
              Add Liquidity
            </p>

            <div className="sinner-4-1">
              <input
                value={from_a}
                placeholder={"0"}
                onChange={(event) => {
                  update_from_a(event.target.value);
                  exchange1(event.target.value);
                }}
              ></input>
              <div className="inner-div1">
                <p
                  className={"sele"}
                  onClick={() => {
                    update_dis(!dis);
                  }}
                >
                  {key1 != -1 && <img src={currency[key1].Img}></img>}
                  {key1 != -1 ? currency[key1].type : "select"}
                </p>
              </div>
              {/* <p>$109.18</p> */}
              <p className="blink"></p>
              <p className="bal1">Balance:{bal1}</p>
            </div>

            <div className="sinner-4-2">
              <input
                value={to_a}
                placeholder={"0"}
                onChange={(event) => {
                  update_to_a(event.target.value);
                  exchange2(event.target.value);
                }}
              ></input>
              <div className="inner-div1">
                <p
                  className={"sele"}
                  onClick={() => {
                    update_dis2(!dis2);
                  }}
                >
                  {key2 != -1 && <img src={currency[key2].Img}></img>}
                  {key2 != -1 ? currency[key2].type : "select"}
                </p>
              </div>
              <p className="blink"></p>
              <p className="bal">Balance:{bal2}</p>

              <button
                id="connect-wallet-sushi"
                onClick={async () => {
                  props.update_loading_status_(true);
                  props.update_loading_status_value_({
                    amount1: from_a,
                    amount2: to_a,
                    token1: currency[key1].type,
                    token2: currency[key2].type,
                  });
                  var result = await sushiv3(from, to, from_a, to_a);

                  call_popup(result);
                }}
              >
                Add Liquidity
              </button>
            </div>

            <p id={"plus"}>+</p>
          </div>
        </div>

        {/* <div className="sinner-5">

        <p>Total APR:&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;&nbsp;0.00%</p>
        <p id="line"></p>
        <h4>My Liquidity Position&ensp;&ensp;&ensp;&ensp;&ensp;$0.00</h4>
        <p>0 WMATIC</p>
        <p>0 ployBUNNY</p>

      </div> */}
      </div>
    </div>
  );
};

export default Sushi;
