// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;
import "./sushi_interface.sol";
import "./sushiDB.sol";

contract OnigiriRouter {
  address private constant FACTORY = 0xc35DADB65012eC5796536bD9864eD8773aBc74C4;
  address private constant ROUTER = 0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506;
  address public owner;

  sushiDB public db;

  constructor(address dbAddr) {
    owner = payable(msg.sender);
    db = sushiDB(dbAddr);
    db.CreateTable();
  }

  event Log(string message, uint val);

  mapping(address => mapping (address => uint)) Position_bal;

  function addLiquidity(address _tokenA, address _tokenB, uint _amountA, uint _amountB) external {
    
    IERC20(_tokenA).transferFrom(msg.sender, address(this), _amountA);
    IERC20(_tokenB).transferFrom(msg.sender, address(this), _amountB);

    IERC20(_tokenA).approve(ROUTER, _amountA);
    IERC20(_tokenB).approve(ROUTER, _amountB);
    
    bool update = false;
    uint value=0;
    if(Position_bal[msg.sender][IUniswapV2Factory(FACTORY).getPair(_tokenA, _tokenB)] > 0){
      update = true;
    }

    (uint amountA, uint amountB, uint liquidity) =
      IUniswapV2Router(ROUTER).addLiquidity(
        _tokenA,
        _tokenB,
        _amountA,
        _amountB,
        0,
        0,
        address(this),
        block.timestamp + 5 minutes
    );
    address _pair = IUniswapV2Factory(FACTORY).getPair(_tokenA, _tokenB);

    Position_bal[msg.sender][_pair] += liquidity;
    value = Position_bal[msg.sender][_pair];

    uint balanceA; uint balanceB;
    balanceA = _amountA - amountA;
    balanceB = _amountB - amountB;
    if (balanceA == 0){
      IERC20(_tokenB).transfer(msg.sender, balanceB);
    }else{
      IERC20(_tokenA).transfer(msg.sender, balanceA);
    }

    if(update = true){
      db.UpdateToTable(
          msg.sender,
          _pair,
          value
        );
    }else{
      db.InsertToTable(
        msg.sender,
        _pair, 
        value,
        _tokenA,
        _tokenB
      );
    }

    emit Log("amountA", amountA);
    emit Log("amountB", amountB);
    emit Log("liquidity", liquidity);
  }

  function removeLiquidity(address _tokenA, address _tokenB, uint _liq) external {
    address _pair = IUniswapV2Factory(FACTORY).getPair(_tokenA, _tokenB);
    require(_liq <= Position_bal[msg.sender][_pair]);
    // uint liquidity = IERC20(_pair).balanceOf(address(this));
    // IERC20(_pair).approve(ROUTER, liquidity);
    IERC20(_pair).approve(ROUTER, _liq);

    (uint amountA, uint amountB) =
      IUniswapV2Router(ROUTER).removeLiquidity(
        _tokenA,
        _tokenB,
        _liq,
        1,
        1,
        msg.sender,
        block.timestamp
    );

    uint value = 0;
    Position_bal[msg.sender][_pair] -= _liq; 
    value = Position_bal[msg.sender][_pair];

    db.UpdateToTable(
          msg.sender,
          _pair,
          value
        );   

    emit Log("amountA", amountA);
    emit Log("amountB", amountB);
  }

  function PoolShare(address _tokenA, address _tokenB) external view returns(uint totalLiq, uint userLiq){
    address _pair = IUniswapV2Factory(FACTORY).getPair(_tokenA, _tokenB);
    uint TotalSupply = IERC20(_pair).totalSupply();
    return (TotalSupply, Position_bal[msg.sender][_pair]);
  }
  // frontend poolshare calc (userliq*100)/totalLiq

}
