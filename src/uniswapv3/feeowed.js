const { ethers, BigNumber } = require("ethers");
const { POSClient, use } = require("@maticnetwork/maticjs");
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-ethers");

const feesOwed = async (btk_id) => {
  const apiKey = "wg5INmNXJo1JEtEAtKWqkZIjAwSze_Ol";
  const privateKey =
    "5c63fbb44131a60aeb99f7a18c004bdc8ae3407418ab46aa6b116d3c25d2e4c9";
  const uni_abi = require("./LiquidityExamples.json");

  const Uni_addr = "0xff8130b97dEb2677ef7970971dBC97CBf153945D";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const Uniswap_p = new ethers.Contract(Uni_addr, uni_abi, provider);

  const feesowned = await Uniswap_p.feesOwed(btk_id);

  return feesowned;
};

export default feesOwed;
