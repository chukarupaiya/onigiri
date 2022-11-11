import { React } from "react";

import img1 from "../resource/img8.png";
import { Link } from "react-router-dom";
import "../css/Dashitem.css";
const Dashitem = (props) => {
  console.log(props.data);
  const min_max = props.data[3].split("<>");
  const from_to = props.data[2].split("/");

  return (
    <Link to="/uniswap2" style={{"text-decoration":"none"}}>
    <div
      className="item-outer"
      onClick={() => {
        props.update_values(props.fulldata);
       
         
       
      }}
    >
      <div className="item-inner-1">
        <img src={img1}></img>
        <img src={img1}></img>
       
        <p>{props.data[2]}</p>
        <p>{props.data[1]}</p>
      </div>

      <div className="item-inner-2">
        <p>Min:</p>
        <p>
          {min_max[0]} {from_to[1]} per {from_to[0]}
        </p>
        <p>&ensp;&ensp;Max:</p>
        <p>
          {min_max[1]} {from_to[1]} per {from_to[0]}
        </p>
      </div>
    </div>
    </Link>
  );
};

export default Dashitem;
