// SPDX-License-Identifier: MIT
pragma solidity <=0.6.6;

import "https://github.com/Uniswap/v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol";

contract sushiPriceOracle{
    address private constant FACTORY = 0xc35DADB65012eC5796536bD9864eD8773aBc74C4;

    function getEquiAmount (address tokenA, address tokenB, uint amountA) external view returns(uint){
        (uint resA, uint resB) = UniswapV2Library.getReserves(FACTORY, tokenA, tokenB);
        uint amountBOptimal = UniswapV2Library.quote(amountA, resA, resB);
        
        return amountBOptimal;
    }
}
