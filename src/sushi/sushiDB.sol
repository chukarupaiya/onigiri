// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol"; // Required for contracts to receive ERC721 tokens
import "@openzeppelin/contracts/utils/Strings.sol"; // Useful for working with strings (not shown below)
import "@tableland/evm/contracts/ITablelandTables.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract sushiDB is ERC721Holder {
    ITablelandTables private _tableland;
    string internal _tablePrefix;
    string public tableName;
    uint256 Table_id;
    //0x4b48841d4b32C4650E4ABc117A03FE8B51f38F68--mumbai

    using Counters for Counters.Counter;
    Counters.Counter private id;

    constructor() {
        _tableland = ITablelandTables(0x4b48841d4b32C4650E4ABc117A03FE8B51f38F68);
          _tablePrefix="sushiDB";
    }

	function CreateTable() public payable {
        (Table_id)=_tableland.createTable(address(this),
        string.concat(
            "CREATE TABLE ",
            _tablePrefix,
            "_",
             Strings.toString(block.chainid),
             " (id text primary key, user_addr text, pair_addr text, liquidity text, tokenA text, tokenB text);"
        ));

        tableName = string.concat(
            _tablePrefix,
            "_",
            Strings.toString(block.chainid),
            "_",
            Strings.toString(Table_id)
        );
	}

	function InsertToTable( address user_addr, address pair_addr, uint liquidity, address tokenA, address tokenB) public payable {
        _tableland.runSQL(
        address(this),
        Table_id,
            string.concat(
                "INSERT INTO ",
                tableName,
                " VALUES ( '",
                Strings.toString(id.current()),    
                "', '",
                Strings.toHexString(user_addr),
                "', '",
                Strings.toHexString(pair_addr),
                "', '",
                Strings.toString(liquidity),
                "', '",
                Strings.toHexString(tokenA),
                "', '",
                Strings.toHexString(tokenB),
                "' )"
            )
        );
        id.increment();
	}

    function UpdateToTable(address user_addr, address pair_addr,uint NewLiquidity) public payable {
        _tableland.runSQL(
        address(this),
        Table_id,
            string.concat(
                "UPDATE ", 
                tableName, 
                " SET ", 
                "liquidity = ", 
                "'", Strings.toString(NewLiquidity), "'",
                " WHERE ",
                "user_addr = ",
                "'", Strings.toHexString(user_addr), "'",
                " AND ",
                "pair_addr = ",
                "'", Strings.toHexString(pair_addr), "'"
            )
        );
    }
}
