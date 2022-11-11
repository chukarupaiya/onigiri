import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import {
  FaCut,
  FaHandHoldingUsd,
  FaUserAlt,
  FaDollarSign,
  FaBitcoin,
  FaWallet,
} from "react-icons/fa";
import logo from '../resource/logo.png';

const Header = (props) => {
  //State variables
  const [walletAddress, setWallet] = useState("");
  const [Status, setStatus] = useState("");

  useEffect(() => {
    props.waladdhandler(walletAddress);
  }, [walletAddress]);

  return (
    <div className="outer-nav-1">
      <img src={logo} className={"nav-company"}></img>
      <h1 className="nav-company-2">Onigiri</h1>
      <div className="outer-nav">
        {/* <Link to="/">
          <button className="nav">ome</button>
        </Link> */}
        {/* <Link to="/uniswap">
          <button className="nav">Uniswap</button>
        </Link>
        <Link to="/sushi">
          <button className="nav">Sushi</button>
        </Link> */}
        <Link  to="/dex">
          <button className="nav">Dex</button>
        </Link>
        <Link to="/staking">
          <button disabled className="nav tooltip">Sutēkingu<span class="tooltiptext">Coming Soon</span></button>
        </Link>
        <Link to="/lending">
          <button  disabled className="nav tooltip">Taiyo<span class="tooltiptext">Coming Soon</span></button>
        </Link>
      </div>

      <div className="btn-r">
       
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== "loading";
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === "authenticated");

            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button onClick={openConnectModal} className="btn-r3"type="button">
                        Connect Wallet
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button onClick={openChainModal} className="btn-r3" type="button">
                        Wrong network
                      </button>
                    );
                  }

                  {
                    setWallet(account.address);
                  }

                  return (
                    <div style={{ display: "flex", gap: 12 }}>
                     <button
                        onClick={openChainModal}
                        style={{ display: "flex", alignItems: "center" }}
                        type="button"
                        className="btn-r3"
                      >
                         {chain.hasIcon && (
                          <div
                            style={{
                              background: "transparent",
                              width: 12,
                              height: 12,
                              borderRadius: 999,
                              overflow: "hidden",
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? "Chain icon"}
                                src={chain.iconUrl}
                                style={{ width: 15, height: 15,  background: "transparent", }}
                              />
                            )}
                          </div>
                        )}
                        {/* {chain.name} */}
                      </button> 

                      <button onClick={openAccountModal} className={"btn-r2"} type="button">
                        {account.displayName}

                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ""}
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
       
      </div>
    </div>
  );
};

export default Header;
