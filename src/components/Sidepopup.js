import { React, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../css/Sidepopup.css";

import {FaCheckCircle,FaExternalLinkAlt} from 'react-icons/fa';




const Sidepopup = (props) => {
 
const [statement,update_statement]=useState("");
const [h,update_h]=useState("");

useEffect(()=>{

  if(props.data.result==true){

    update_statement("Added liquidity");

  }else{

    update_statement("Failed");

  }


  update_h(props.data.hash)
},[props.data.result,props.data.hash]);



  
  return (
    <div className={"outer-sidepopup"}>
      <p>{statement}</p>
      <a href={"https://mumbai.polygonscan.com/tx/"+h}>View on explorer&ensp;<FaExternalLinkAlt></FaExternalLinkAlt></a>
      <p id={"close"}>X</p>
     <FaCheckCircle id={"verified"}></FaCheckCircle>
      <div className="loader-line-parent">
        <div className="loader-line"></div>
      </div>
    </div>
  );
};

export default Sidepopup;
