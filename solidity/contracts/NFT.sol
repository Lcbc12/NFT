// SPDX-License-Identifier: MIT
pragma solidity <= 9.0.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * TODO:
 *  - Read ERC721 to understand how the NFT precisely works
 *      https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol
 *  - Add few codes to enable an account to:
 *      > deposit new data
 *      > retrieve all data stored 
 *    It looks like it's already implemented in Enumerable extension of ERC721
 *    Even transfer is done
 */
contract NFT is ERC721 {
    
}