import { React, Fragment, useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Home from "./components/Home";
import Uniswap from "./components/Uniswap";
import Uniswap2 from "./components/Uniswap2";
import Sushi from "./components/Sushi";
import Header from "./components/Header";
import Addliquidity from "./components/Addliquidity";
import Addliquidity2 from "./components/Addliquidity2";
import Sidepopup from "./components/Sidepopup";
import Remove from "./components/Remove";

import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";

import "@rainbow-me/rainbowkit/dist/index.css";
import { Theme } from "@rainbow-me/rainbowkit";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Loading from "./components/Loading";
import Dashboard from "./components/Dashboard";

const { chains, provider } = configureChains(
  [chain.polygonMumbai],
  [
    alchemyProvider({ alchemyId: "wg5INmNXJo1JEtEAtKWqkZIjAwSze_Ol" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const App = () => {
  const [waladd, changewaladd] = useState("");
  const waladdhandler2 = (temp) => {
    changewaladd(temp);
  };

  const [wallet, update_wallet] = useState([]);

  const [balance, update_balance] = useState(0);
  const [token_api, update_token_api] = useState({});

  const myCustomTheme: Theme = {
    // blurs: {
    //   modalOverlay: '90px',
    // },

    colors: {
      accentColor: "#ffffff",
      accentColorForeground: "#8f5eff",
      actionButtonBorder: "rgb(70, 70, 70)",
      actionButtonBorderMobile: "#fffff",
      actionButtonSecondaryBackground: "rgb(70, 70, 70)",
      //////////////////////////////////////////////////
      closeButton: "#fffdfc",
      closeButtonBackground: "rgb(70, 70, 70)",
      //////////////////////////////////////////////////
      connectButtonBackground: "#0e111a",
      connectButtonInnerBackground: "#07296d",
      connectButtonText: "#ffffff",
      connectionIndicator: "#3b3939",
      //////////////////////////////////////////////////
      connectButtonTextError: "#fc3d63",
      connectButtonBackgroundError: "rgb(26, 27, 31)",
      error: "#07296d",
      //////////////////////////////////////////////////
      generalBorder: "rgb(70, 70, 70)",
      generalBorderDim: "rgb(70, 70, 70)",
      menuItemBackground: "rgb(26, 27, 31)",
      modalBackdrop: "rgba(10, 10, 10,0.6)",
      modalBackground: "rgb(26, 27, 31)",
      modalBorder: "rgb(26, 27, 31)",
      modalText: "#ffffff",
      modalTextDim: "#ffff",
      modalTextSecondary: "#ffffff",
      profileAction: "rgb(26, 27, 31)",
      profileActionHover: "#4f4e4e",
      profileForeground: "rgb(26, 27, 31)",
      selectedOptionBorder: "#fffff",
      standby: "#fffff",
    },
    fonts: {
      body: "10px",
    },
    radii: {
      actionButton: "20px",
      connectButton: "20px",
      menuButton: "20px",
      modal: "20px",
      modalMobile: "20px",
    },
    // shadows: {
    //   connectButton: '...',
    //   dialog: '...',
    //   profileDetailsAction: '...',
    //   selectedOption: '...',
    //   selectedWallet: '...',
    //   walletLogo: '...',
    // },
  };

  useEffect(async () => {
    if (waladd != "") {
      //toekn api

      console.log("chuuu");

      const options = {
        method: "GET",
        url: "https://deep-index.moralis.io/api/v2/" + waladd + "/erc20",
        params: { chain: "mumbai" },
        headers: {
          accept: "application/json",
          "X-API-Key":
            "KbdbJsvE5jGcuXLs6X37RMF7z6eW07l9IA8gx2ahPT9FYGCUhEffWRY8DRr9lyQ7",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
          // update_token_api(response.data);
          update_wallet(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });

      //balance api

      const options2 = {
        method: "GET",
        url: "https://deep-index.moralis.io/api/v2/" + waladd + "/balance",
        params: { chain: "mumbai" },
        headers: {
          accept: "application/json",
          "X-API-Key":
            "KbdbJsvE5jGcuXLs6X37RMF7z6eW07l9IA8gx2ahPT9FYGCUhEffWRY8DRr9lyQ7",
        },
      };

      axios
        .request(options2)
        .then(function (response) {
          console.log(response.data);
          update_balance(response.data.balance);
          update_wallet(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }


    
  }, [waladd]);
  // showRecentTransactions={true}

  const[value,update_value]=useState({});
  const[loading_status,update_loading_status]=useState(false);
  const[loading_status_value,update_loading_status_value]=useState({});
  const[sidepopup_status,update_sidepopup_status]=useState(false);
  const[sidepopup_status_value,update_sidepopup_status_value]=useState({});

  const [remove_data,update_remove_data]=useState({});

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        modalSize={"compact"}
        chains={chains}
        theme={myCustomTheme}
      >
        <BrowserRouter>
          <Header waladdhandler={waladdhandler2}></Header>
          <Dashboard  update_value={update_value}></Dashboard>
          {loading_status &&  <Loading data={loading_status_value} update_loading_status_={update_loading_status}></Loading>}
          {sidepopup_status && <Sidepopup data={sidepopup_status_value}></Sidepopup>}
          <Routes>
            <Route
              path="/"
              element={
                <Fragment>
                <Home></Home>
                 
                
                  
                </Fragment>
              }
            ></Route>
            <Route
              path="/uniswap"
              element={
                <Fragment>
                  <Uniswap
                    wallet_data={wallet}
                    balance={balance}
                    waladd={waladd}
                  />
                </Fragment>
              }
            ></Route>
             <Route
              path="/remove"
              element={
                <Fragment>
                  <Remove data={remove_data}></Remove>
                </Fragment>
              }
            ></Route>
            <Route
              path="/dex"
              element={
                <Fragment>
                  <Home></Home>
                </Fragment>
              }
            ></Route>
            <Route path="/uniswap2" element={<Uniswap2 data={value}  update_remove_data_={update_remove_data}/>}></Route>
            <Route
              path="/sushi"
              element={
                <Sushi wallet_data={wallet} balance={balance} waladd={waladd} update_loading_status_={update_loading_status}  update_sidepopup_status_={update_sidepopup_status}    update_loading_status_value_={update_loading_status_value}  update_sidepopup_status_value_={update_sidepopup_status_value}/>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
