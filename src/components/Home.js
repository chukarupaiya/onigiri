import { React } from "react";
import { Link } from "react-router-dom";

import "../css/Home.css";
import Uniswap from "./Uniswap";

import img1 from "../resource/logo2.png";
import img2 from "../resource/logo3.png";

const Home = () => {
  return (
    <div className="outer-home">
      <div className="home-inner">
        <div className="home-inner-1">
          <Link to="/uniswap">
            <img src={img1}></img>
          </Link>
        </div>

        <div className="vline"></div>

        <div className="home-inner-2">
          <Link to="/sushi">
            <img src={img2}></img>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
