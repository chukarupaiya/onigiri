import { React, useEffect, useState } from "react";

import Dashitem from "./Dashitem";
import "../css/Dashboard.css";

import axios from 'axios';

import { FaArrowRight } from "react-icons/fa";


const Dashboard = (props) => {
  const [dash1, update_dash1] = useState(false);
  const [dash2, update_dash2] = useState(false);
  const [dash3, update_dash3] = useState(false);

  const[pool,update_pool]=useState({});
  const[pool_item,update_pool_item]=useState([]);


  useEffect(()=>{

    const options = {
      method: 'GET',
      url: 'https://deep-index.moralis.io/api/v2/0xff8130b97dEb2677ef7970971dBC97CBf153945D/nft',
      params: {chain: 'mumbai', format: 'decimal', normalizeMetadata: 'false'},
      headers: {accept: 'application/json', 'X-API-Key': "KbdbJsvE5jGcuXLs6X37RMF7z6eW07l9IA8gx2ahPT9FYGCUhEffWRY8DRr9lyQ7",}
    };
    
    axios
      .request(options)
      .then(function (response) {
        console.log("kkkkk");
        console.log(response.data);
        update_pool(response.data);
        update_pool_item(response.data.result);

      })
      .catch(function (error) {
        console.error(error);
      });
  

  },[]);




  const item1=pool_item.map((element)=>{


    const temp=element.metadata;
    const temp2=temp.split('"')[3].split('-');
    return <Dashitem data={temp2} fulldata={element} update_values={props.update_value}></Dashitem>
  });

 
  return (


 



    <div>
      <div
        className={dash1 ? "dash-backdrop" : ""}
        onClick={() => {
          update_dash1(!dash1);
          if(dash1){
            if(dash2){
              update_dash2(!dash2);
            }

            if(dash3){
              update_dash3(!dash3);

            }
           
            

          }
        }}
      >
         </div>
         <FaArrowRight
            id={!dash1?"exp":"exp2"}
            onClick={() => {
              update_dash1(!dash1);
              if(dash1){
                if(dash2){
                  update_dash2(!dash2);
                }

                if(dash3){
                  update_dash3(!dash3);

                }
               
                

              }
             
            }}
          ></FaArrowRight>
        <div className={!dash1 ? "dash-outer" : "dash-outer2"}>
         
          <div className="dash-inner-1"></div>

          <div
            className="dash-inner-2"
            onClick={() => {
              update_dash2(!dash2);
            }}
          >
            <h2>UNISWAP</h2>

            {dash2 && (
              <div>
                {item1}
              </div>
            )}
          </div>

          <div
            className="dash-inner-3"
            onClick={() => {
              update_dash3(!dash3);
            }}
          >
            <h2>SUSHI</h2>

            {dash3 && (
              <div>
                
              </div>
            )}
          </div>
        </div>
     
    </div>
  );
};

export default Dashboard;
