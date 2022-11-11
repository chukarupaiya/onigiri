import { React,useState } from "react";

import "../css/Addliquidity2.css";

const Addliquidity2 = () => {


  const [from_value, update_from_value] = useState("from");
  const [to_value, update_to_value] = useState("to");

  const [min, update_min] = useState(0.71036);
  const [max, update_max] = useState(0.80092);

  const [fee,udpate_fee]=useState("0.3%");

  const [current_price, update_current_price] = useState(0.746);

  const [from, update_from] = useState("from");
  const [to, update_to] = useState("to");

  const [f_amount, update_f_amount] = useState(0);
  const [t_amount, update_t_amount] = useState(0);

  const [f_amount2, update_f_amount2] = useState(0);
  const [t_amount2, update_t_amount2] = useState(0);


  

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

    let L = y / (Math.sqrt(price) - Math.sqrt(price_low));

    let x =
      (L * (Math.sqrt(price_high) - Math.sqrt(price))) /
      (Math.sqrt(price) * Math.sqrt(price_high));

    return x;
  };

  return (
    <div className="add2">
      <div className="background" style={{"height":"130vh"}}>
        {/* <img id={"img4"} src={img4}></img> */}

        <div className="outer-add">
          <p id={"add-liq"}>Add Liquidity</p>
          <div className="line"></div>
          <h3 id={"add-liq2"}>{from} / {to}</h3>
          <div className="inner-add-1">
            <div className="inner-add-1-1">
              <p>{from}</p>
              <p>{f_amount2}</p>
            </div>
            <div className="inner-add-1-2">
              <p>{to}</p>
              <p>{t_amount2}</p>
            </div>
            <div className="line"></div>
            <div className="inner-add-1-3">
              <p>Fee Tier</p>
              <p>{fee}</p>
            </div>
          </div>

          <h4>Selected Range</h4>

          <div className="inner-add-2">
            <div className="inner-add-2-1">
              <h4>Min Price</h4>
              <h2>{min}</h2>
              <h4>{to} per {from}</h4>

              <h6>Your position will be 100% composed of RA at this price</h6>
            </div>

            <div className="inner-add-2-2">
              <h4>Max Price</h4>
              <h2>{max}</h2>
              <h4>{to} per {from}</h4>

              <h6>Your position will be 100% composed of RA at this price</h6>
            </div>
          </div>

          <div className="inner-add-3">
            <p>Current price</p>
            <h4>{current_price}</h4>
            <p>{to} per {from}</p>
          </div>

          <h4>Add more liquidity</h4>

          <div className="inner-add-4">
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

          <button className="add-button">Preview</button>
        </div>
      </div>
    </div>
  );
};

export default Addliquidity2;
