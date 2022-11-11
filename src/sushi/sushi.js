const { ethers } = require("ethers");
const { axios } = require("axios");
const token_abi = require("erc-20-abi");
const { POSClient, use } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-ethers");

// import { POSClient,use } from "@maticnetwork/maticjs"
// import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'
// import { providers, Wallet } from "ethers";
async function sushiv3(token0, token1, input0, input1) {
  const apiKey = "wg5INmNXJo1JEtEAtKWqkZIjAwSze_Ol";
  const privateKey =
    "5c63fbb44131a60aeb99f7a18c004bdc8ae3407418ab46aa6b116d3c25d2e4c9";
  const sushi_abi = require("./Sushi.json");

  // const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${apiKey}`)
  // const signer = new ethers.Wallet(privateKey, provider)
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();

  const sushi_addr = "0xa79920AE7F6D07B5bF6560Fa0A6f44282d2174C4";
  const owner = "0x8131B9FdEFB33E428E0FA33DbdA6C842BcD58439";

  console.log("1");
  use(Web3ClientPlugin);

  const posClient = new POSClient();
  await posClient.init({
    network: "testnet",
    version: "mumbai",
    parent: {
      provider: signer,
      defaultConfig: {
        from: owner,
      },
    },
    child: {
      provider: signer,
      defaultConfig: {
        from: owner,
      },
    },
  });

  console.log("2");

  const router = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506";
  // const token_abi=require("../contracts/Sushi.json");
  const sushi_s = new ethers.Contract(sushi_addr, sushi_abi, signer);
  const sushi_p = new ethers.Contract(sushi_addr, sushi_abi, provider);
  //token 0
  // const token0 = "0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F";//Dai
  // const erc20_0 = new ethers.Contract(token0, token_abi, signer);
  console.log(input0 + " . " + input1);
  // const input0 = "1";
  // const decimals0 = "18";
  // const amount0 = ethers.utils.parseUnits(input0, decimals0);

  // //connect
  // const tokensigner0 = erc20_0.connect(signer);
  // const approve0 = await tokensigner0.approve(sushi_addr, amount0);
  // const txn=await tokensigner0.transfer(sushi_addr,amount0)

  // const token0="0x001B3B4d0F3714Ca98ba10F6042DaEbF0B1B7b6F"
  const erc20Token0 = posClient.erc20(token0, true);
  // const input0="1"
  const decimals0 = "18";
  const amount0 = ethers.utils.parseUnits("" + input0, decimals0);
  const amount0hex = ethers.utils.hexlify(amount0);
  const approveResult0 = await erc20Token0.approve(amount0hex, {
    spenderAddress: sushi_addr,
  });
  console.log("3");
  //token 1
  // const token1 = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";//link
  // const erc20_1 = new ethers.Contract(token1, token_abi, signer);
  // const input1 = "1";
  // const decimals1 = "18";
  // const amount1 = ethers.utils.parseUnits(input1, decimals1);

  // //connect
  // const tokensigner1 = erc20_1.connect(signer);
  // const approve1 = await tokensigner1.approve(sushi_addr, amount1);
  //  const txn1=await tokensigner1.transfer(sushi_addr,amount1)

  // const token1="0x326C977E6efc84E512bB9C30f76E30c160eD06FB"
  const erc20Token1 = posClient.erc20(token1, true);
  // const input1="1"
  const decimals1 = "18";
  const amount1 = ethers.utils.parseUnits("" + input1, decimals1);
  const amount1hex = ethers.utils.hexlify(amount1);
  const approveResult = await erc20Token1.approve(amount1hex, {
    spenderAddress: sushi_addr,
  });

  console.log("4");

  //add liquidity
  const add_liq = await sushi_s.addLiquidity(token0, token1, amount0, amount1, {
    gasLimit: 500000,
  });
  // const boi=add_liq.reciept()
  //console.log(add_liq);

 

  return add_liq;
}

// sushi()
//     .then(() => process.exit(0))
//     .catch((error) => {
//       console.error(error);
//       process.exit(1);
//     });
export default sushiv3;
