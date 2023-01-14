// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;
pragma abicoder v2;

import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@uniswap/v3-core/contracts/libraries/TickMath.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";
import "@uniswap/v3-periphery/contracts/base/LiquidityManagement.sol";
import "hardhat/console.sol";
import "./interface.sol"

contract LiquidityExamples is IERC721Receiver {


    INonfungiblePositionManager public nonfungiblePositionManager = 
        INonfungiblePositionManager(0xC36442b4a4522E871399CD717aBDD847Ab11FE88);

    Idatabase public db=Idatabase(0x59dBd3c315643E144ecc4A1Cb86A3e276B3c9435);

        //event
        event Mintposn(uint _tokenId , uint128 liquidity,uint amount0,uint amount1);

    // Represents the deposit of an NFT
    struct Deposit {
        address owner;
        uint128 liquidity;
        address token0;
        address token1;
    }

    
    mapping(uint => Deposit) public deposits;
    //mapping should be done address->token id 

    // // Store token id used in this example
    // uint public tokenId;

    // Implementing `onERC721Received` so this contract can receive custody of erc721 tokens
    function onERC721Received(
        address operator,
        address,
        uint _tokenId,
        bytes calldata
    ) external override returns (bytes4) {
        _createDeposit(operator, _tokenId);
        return this.onERC721Received.selector;
    }
       //create deposit
    function _createDeposit(address owner, uint _tokenId) internal {
        (
            ,
            ,
            address token0,
            address token1,
            ,
            ,
            ,
            uint128 liquidity,
            ,
            ,
            ,

        ) = nonfungiblePositionManager.positions(_tokenId);
        //writing to the database
       
        
        //mapping token id to info
       { deposits[_tokenId] = Deposit({
            owner: owner,
            liquidity: liquidity,
            token0: token0,
            token1: token1
        });

         db.writeToTable(_tokenId,deposits[tokenId].owner);
}
        // console.log("owner", owner);

    }

    function mintNewPosition(
       address _token0,
       address _token1,
       uint amount0ToMint,
       uint amount1ToMint,
       int24 _ticklower,
       int24 _tickupper,
      uint24 poolFee 

      
        )
        external
    
        returns (
            uint _tokenId,
            uint128 liquidity,
            uint amount0,
            uint amount1
        )
    {

        {
            IERC20(_token0).transferFrom(msg.sender, address(this), amount0ToMint);
            IERC20(_token1).transferFrom(msg.sender, address(this), amount1ToMint);

        }
        // Approve the position manager
      {  TransferHelper.safeApprove(
            _token0,
            address(nonfungiblePositionManager),
            amount0ToMint
        );
        TransferHelper.safeApprove(
           _token1,
            address(nonfungiblePositionManager),
          amount1ToMint
        );
}
    {INonfungiblePositionManager.MintParams
            memory params = INonfungiblePositionManager.MintParams({
                token0: _token0,
                token1: _token1,
                fee: poolFee,
                tickLower: _ticklower,
                tickUpper: _tickupper,
                amount0Desired: amount0ToMint,  
                amount1Desired: amount1ToMint,
                //needs a slippage estimation process 
                amount0Min:0,
                amount1Min:0,
                recipient: address(this),
                deadline: block.timestamp + 20 minutes
            });

        
        // already be created and initialized in order to mint
        (_tokenId, liquidity, amount0, amount1) = nonfungiblePositionManager
            .mint(params);
            
    }
             emit Mintposn(_tokenId, liquidity, amount0, amount1);


        // Create a deposit
        _createDeposit(msg.sender, _tokenId);

        // Remove allowance and refund in both assets.
     {   if (amount0 < amount0ToMint) {
            TransferHelper.safeApprove(
                _token0,
                address(nonfungiblePositionManager),
                0
            );
            uint refund0 = amount0ToMint - amount0;
            TransferHelper.safeTransfer(_token0, msg.sender, refund0);
        }

        if (amount1 < amount1ToMint) {
            TransferHelper.safeApprove(
                _token1,
                address(nonfungiblePositionManager),
                0
            );
            uint refund1 = amount1ToMint - amount1;
            TransferHelper.safeTransfer(_token1, msg.sender, refund1);
        }
     }
    }


    function collectAllFees(uint Token_id) external returns (uint256 amount0, uint256 amount1) {
        
    {    require(deposits[Token_id].owner==msg.sender,"not the owner");
        INonfungiblePositionManager.CollectParams memory params =
            INonfungiblePositionManager.CollectParams({
                tokenId: Token_id,
                recipient: msg.sender,
                amount0Max: type(uint128).max,
                amount1Max:  type(uint128).max
            });

        (amount0, amount1) = nonfungiblePositionManager.collect(params);
        
    }  
    }
    //function balance 
    function feesOwed(uint b_tk_id)external view returns(address b_token0,address b_token1,uint128 liquidity_present,uint128 tokensOwed0,uint128 tokensOwed1){
     (,,b_token0,b_token1,,,,liquidity_present,,,tokensOwed0, tokensOwed1) = nonfungiblePositionManager.positions(b_tk_id);

    }

     function increaseLiquidity(
        uint256 tokenId,
        uint256 amountAdd0,
        uint256 amountAdd1
       
    )
        external
        returns (
            uint128 liquidity,
            uint256 amount0,
            uint256 amount1
        )
    {
         require(msg.sender == deposits[tokenId].owner, 'Not the owner');
         address token0=deposits[tokenId].token0;
          address token1=deposits[tokenId].token1;

         IERC20(token0).transferFrom(msg.sender, address(this), amountAdd0);
        IERC20(token1).transferFrom(msg.sender, address(this), amountAdd1);

        INonfungiblePositionManager.IncreaseLiquidityParams memory params =
            INonfungiblePositionManager.IncreaseLiquidityParams({
                tokenId: tokenId,
                amount0Desired: amountAdd0,
                amount1Desired: amountAdd1,
                amount0Min: 0,
                amount1Min: 0,
                deadline: block.timestamp + 20 minutes
            });

        (liquidity, amount0, amount1) = nonfungiblePositionManager.increaseLiquidity(params);
  // updating the mapping variable since the liquidity is changed 
         deposits[tokenId] = Deposit({  
            owner:msg.sender,
            liquidity: liquidity,
            token0:token0,
            token1:token1

            
        });
    }
    //decrease liquidity 
    function decreaseLiquidity(uint256 tokenId,uint24 percent) external returns (uint256 amount0, uint256 amount1) {
       //it should be less than 100 percent 
        require(percent<=100,'incorrect input');
         // caller must be the owner of the NFT
        require(msg.sender == deposits[tokenId].owner, 'Not the owner');
       
        INonfungiblePositionManager.DecreaseLiquidityParams memory params =
            INonfungiblePositionManager.DecreaseLiquidityParams({
                tokenId: tokenId,
                liquidity:div(mul(deposits[tokenId].liquidity,percent),100),
                amount0Min: 0,
                amount1Min: 0,
                deadline: block.timestamp + 20 minutes
            });

        (amount0, amount1) = nonfungiblePositionManager.decreaseLiquidity(params);

        //send liquidity back to owner
        _sendToOwner(tokenId, amount0, amount1);
    }


    function _sendToOwner(
        uint256 tokenId,
        uint256 amount0,
        uint256 amount1
    ) internal {
        // get owner of contract
        address owner = deposits[tokenId].owner;

        address token0 = deposits[tokenId].token0;
        address token1 = deposits[tokenId].token1;
        // send collected fees to owner
        TransferHelper.safeTransfer(token0, owner, amount0);
        TransferHelper.safeTransfer(token1, owner, amount1);
    }


    
}
