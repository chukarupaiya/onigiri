async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const _uniswap = await ethers.getContractFactory("LiquidityExamples");
    const uniswap = await _uniswap.deploy();
    console.log("uniswap address:", uniswap.address);


    // const _sushi = await ethers.getContractFactory("Sushi");
    // const sushi = await _sushi.deploy();
    // console.log("sushi address:", sushi.address);


    const _UniswapV3Twap = await ethers.getContractFactory("UniswapV3Twap");
    const UniswapV3Twap = await _UniswapV3Twap.deploy();
    console.log("UniswapV3Twap address:", UniswapV3Twap.address);


  }


  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });