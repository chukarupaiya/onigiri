import { React, useEffect,useState } from "react";

import $ from "jquery";
import "../css/Remove.css";
import removeliq from "../uniswapv3/Removeliq";

const Remove = (props) => {

  const[present,update_present]=useState(0);

  useEffect(() => {

   update_present(props.data.liq);

  }, [props.data.liq]);

 

const [v,update_v]=useState(0);

  return (
    <div className="remove">
      <div className="background" style={{ height: "130vh" }}>
        {/* <img id={"img4"} src={img4}></img> */}

        <div className="outer-remove">
          <p id={"remove-liq"}>Remove Liquidity</p>
          <div className="line"></div>
          <div className="r-inner-1">
            <h5>Amount</h5>
          
            <input id="rangeValue"  value={v+"%"}  onChange={(event)=>{update_v(event.target.value.split("%")[0])}}></input>
            <input
              class="range"
              type="range"
              name="s"
              value={v}
              min="0"
              max="100"
              onChange={(event)=>{update_v(event.target.value)}}
              onmousemove={(event)=>{update_v(event.target.value)}}
            ></input>
          </div>
          <button className="remove-button" onClick={()=>{
            console.log(present*v);
              removeliq(""+props.data.token_id,(present));
          }}>Preview</button>
        </div>
      </div>
    </div>
  );
};

export default Remove;
