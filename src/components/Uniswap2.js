import { React, useEffect, useState } from "react";
import "../css/Uniswap2.css";

import feesOwed from "../uniswapv3/feeowed";
import { FaArrowsAltH } from "react-icons/fa";
import { Link } from "react-router-dom";

const Uniswap2 = (props) => {


  const [data,update_data]=useState({});

  const[meta,udpate_meta]=useState({});

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


  const [fe,update_fe]=useState({});

  const [unclaimed1,update_unclaimed1]=useState(0);
  const [unclaimed2,update_unclaimed2]=useState(0);



  useEffect(()=>{

    if(props.data!=undefined){

      update_data(props.data);
      console.log(props.data);
      console.log(props.data.metadata);
      udpate_meta(JSON.parse(props.data.metadata));
       
      
     

    }
   
  },[props.data]);


  useEffect(()=>{

   

    
    const temp=(meta.name+"").split("-");
      const min_max = (temp[3]+"").split("<>");
      const from_to = (temp[2]+"").split("/");

      update_max(min_max[1]);
      update_min(min_max[0]);

      update_from(from_to[0]);
      update_to(from_to[1]);

      udpate_fee(temp[1]);

    console.log(temp[3]);

  },[meta]);


  useEffect(async()=>{

    const temp=await feesOwed(props.data.token_id);

    var hexString2 = temp.liquidity_present._hex.toString(16);

    props.update_remove_data_( {
      token_id:props.data.token_id,
      liq:Math.round(parseInt(hexString2, 16)  * 10000) / 10000}
      );

    var hexString = temp.tokensOwed0._hex.toString(16);

    update_unclaimed1(
      Math.round(parseInt(hexString, 16) * Math.pow(10, -18) * 10000) / 10000
    )

    var hexString1 = temp.tokensOwed1._hex.toString(16);

    update_unclaimed2(
      Math.round(parseInt(hexString1, 16) * Math.pow(10, -18) * 10000) / 10000
    )
    console.log(temp);

  },[]);

 
  return (
    <div className="background">
      <div className="uni2-outer">
        <div className="uni2-inner-1">
          <img src={meta.image}></img>
        </div>
        <div className="uni2-inner-2">
         
          <div className="uni2-inner-2-1">
            {/* <h6>Liquidity</h6>
            <h1>$-</h1>
            <div className="uni2-inner-2-1-1">
              <p>36.34</p>
              <p>0.2218</p>
            </div> */}
             <div>
            <button id={"inc-btn"}>Increase Liquidity</button>
            <Link to="/remove">
            <button id={"dec-btn"}  onClick={()=>{

              
            }} >Remove Liquidity</button>
            </Link>
           
          </div>
          </div>
          <div className="uni2-inner-2-2">
            <h6>Unclaimed fees</h6>
            <h1>$-</h1>
            <div className="uni2-inner-2-1-1">
              <p>{from}&ensp;&ensp;&ensp;&ensp;&ensp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{unclaimed1}</p>
              <p>{to}&ensp;&ensp;&ensp;&ensp;&ensp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{unclaimed2}</p>
            </div>
            <button className="btn-collect">Collect fees</button>
          </div>
        </div>
      </div>

      <div className="uni2-outer-2">
        <p id={"pricerange"}>Price range</p>
        <div className="uni2-inner2-1">
          <div className="uni2-inner2-1-1">
            <h4>Min price</h4>
            <h3>{min}</h3>
            <h4>{to} per {from}</h4>
            <p>Your position will be 100% ONI at this price</p>
          </div>
          <div class="arrow">
            <FaArrowsAltH></FaArrowsAltH>
          </div>
          <div className="uni2-inner2-1-1">
            <h4>Max price</h4>
            <h3>{max}</h3>
            <h4>{to} per {from}</h4>
            <p>Your position will be 100% ONI at this price</p>
          </div>
        </div>

        <div className="uni2-inner2-2">
          <h4>Current price</h4>
          <h3>{current_price}</h3>
          <h4>{to} per {from}</h4>
        </div>
      </div>
    </div>
  );
};

export default Uniswap2;
