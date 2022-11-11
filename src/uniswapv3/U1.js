const { ethers, BigNumber } = require("ethers");
const{ POSClient,use }=require("@maticnetwork/maticjs");
const{Web3ClientPlugin}=require("@maticnetwork/maticjs-ethers");
async function UniswapV2() {
    const apiKey="wg5INmNXJo1JEtEAtKWqkZIjAwSze_Ol"
    const privateKey="5c63fbb44131a60aeb99f7a18c004bdc8ae3407418ab46aa6b116d3c25d2e4c9"
    const uni_abi = require("./LiquidityExamples.json");
    
// const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${apiKey}`)
// const signer = new ethers.Wallet(privateKey, provider)

const provider = new ethers.providers.Web3Provider(window.ethereum);
await provider.send("eth_requestAccounts", []);
const signer = provider.getSigner();

    const Uni_addr="0xff8130b97dEb2677ef7970971dBC97CBf153945D"

    const Uniswap_s = new ethers.Contract(Uni_addr,uni_abi,signer)
    const Uniswap_p = new ethers.Contract(Uni_addr,uni_abi,provider)

    const owner = "0x8131B9FdEFB33E428E0FA33DbdA6C842BcD58439";
    console.log("1")
    use(Web3ClientPlugin);

    const posClient = new POSClient();
    await posClient.init({
        network: 'testnet',
        version: 'mumbai',
        parent: {
          provider:signer,
          defaultConfig: {
            from : owner
          }
        },
        child: {
          provider: signer,
          defaultConfig: {
            from : owner      }
        }
    });



//     // const token0="0x1F98431c8aD98523631AE4a59f267346ea31F984"
//     // const token1="0x6B175474E89094C44Da98b954EedeAC495271d0F"
    const fee="3000"

    const tick_lower="1740"
    const tick_upper="4200"
    

const token0="0x1A7BaF78C2F213Cbf1091F648ceC7Bb564Bc98f8"//RA
const erc20Token0 = posClient.erc20(token0,true);
const input0="10"
const decimals0="18"

const amount0=ethers.utils.parseUnits(input0, decimals0)
const amount0hex=ethers.utils.hexlify( amount0)
const approveResult0 = await erc20Token0.approve(amount0hex, {
  spenderAddress: Uni_addr
});
console.log("3")


const token1="0xE4D27Df947A7f6e43df5e28d072dca832A67a15e"//ONI
const erc20Token1 = posClient.erc20(token1,true);
const input1="12.346"
const decimals1="18"
const amount5=ethers.utils.parseUnits(input1, decimals1)
const amount1=ethers.utils.parseUnits(input1, decimals1)

const amount1hex=ethers.utils.hexlify(amount1 )
// const approveResult = await erc20Token1.transfer(amount1hex,Uni_addr);
const approveResult1 = await erc20Token1.approve(amount1hex, {
  spenderAddress: Uni_addr
});

console.log("4")  
    const mint_posn= await Uniswap_s.mintNewPosition(token0,token1,amount0,amount1,tick_lower,tick_upper,fee,{gasLimit:5000000})
    console.log(mint_posn)
console.log("6")


  //   const token_id =""
  //   const c_amount0=""
  //   const c_amount1=""
  //   //collect the fees 
  //   const collect_fees= await Uniswap_s.collectAllFees(token_id,c_amount0,c_amount1)
  //   console.log(collect_fees)


  //   const btk_id=""
  //   //balance fee
  //   const feesowned= await Uniswap_p.feesOwed(btk_id)
  //   console.log(feesowned)
  //   const tk_id=""
  //   const liq_out=""
  //   const decrease_liquidity= await Uniswap_s.decreaseLiquidity(tk_id,liq_out)

  //  const a_tkid=""
  //  const amount0add=""
  //  const amount1add=""
  //  const increase_liquidity= await Uniswap_s.increaseLiquidity()

   
  }
  // Uniswap()
  //   .then(() => process.exit(0))
  //   .catch((error) => {
  //     console.error(error);
  //     process.exit(1);
  //   });


  export default UniswapV2;