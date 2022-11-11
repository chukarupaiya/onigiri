const { ethers } = require("ethers");
async function sushi_oracle(token0,token1) {
    const apiKey="wg5INmNXJo1JEtEAtKWqkZIjAwSze_Ol"
    // const privateKey="5c63fbb44131a60aeb99f7a18c004bdc8ae3407418ab46aa6b116d3c25d2e4c9"
    const oracle_abi = require("./sushi_oracle.json");
    
const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.g.alchemy.com/v2/${apiKey}`)
    // const signer=new ethers.Wallet(  [ privateKey, provider ] )
    const oracle_addr="0x168B0A7fD0624c99a0DB27d48409C6E3E4dA6Ed5"
    
    const sushi_oracle = new ethers.Contract(oracle_addr,oracle_abi,provider)
    // const token0="0x1F98431c8aD98523631AE4a59f267346ea31F984"
    // const token1="0x6B175474E89094C44Da98b954EedeAC495271d0F"

    const input="1"
    const decimals="18"
    const amount=ethers.utils.parseUnits(input, decimals)
   
    

    const price= await sushi_oracle.getEquiAmount(token0,token1,amount)

    //console.log(price)

    return price;

   
  }
  export default sushi_oracle;