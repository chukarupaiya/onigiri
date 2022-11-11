const { ethers } = require("ethers");
async function price_oracleV3() {
    const apiKey="wg5INmNXJo1JEtEAtKWqkZIjAwSze_Ol"
    // const privateKey="5c63fbb44131a60aeb99f7a18c004bdc8ae3407418ab46aa6b116d3c25d2e4c9"
    const priceV3abi = require("./UniswapV3Twap.json");
    
const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${apiKey}`)
    // const signer=new ethers.Wallet(  [ privateKey, provider ] )
    const priV3_addr="0x7e6D50835df668D13172d810a1723567C9d250D8"

    const UniswapV3Twap = new ethers.Contract(priV3_addr,priceV3abi,provider)
    const token0="0x1F98431c8aD98523631AE4a59f267346ea31F984"
    const token1="0x6B175474E89094C44Da98b954EedeAC495271d0F"
    const fee="100"
    const input="1"
    const decimals="18"
    const amount=ethers.utils.parseUnits(input, decimals)
    const secondsago=10
    

    const price= await UniswapV3Twap.estimateAmountOut(token0,token1,fee,amount,secondsago)

    console.log(price)

   
  }
  // price_oracleV3()
  //   .then(() => process.exit(0))
  //   .catch((error) => {
  //     console.error(error);
  //     process.exit(1);
  //   });

  export default price_oracleV3;