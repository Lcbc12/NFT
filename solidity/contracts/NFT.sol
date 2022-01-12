// SPDX-License-Identifier: MIT
pragma solidity <= 9.0.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * TODO:
 *  - Read ERC721 to understand how the NFT precisely works
 *      https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol
 *  - To call all functions of ERC721
 */
contract NFT is ERC721 {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint256 => string) private _tokenURIs;

    constructor(
        string memory name,
        string memory symbol
    )
    ERC721(name, symbol)
    {
    }

    function mint(address owner, string memory uri) public {
        _tokenIds.increment();

        uint256 id = _tokenIds.current();
        _safeMint(owner, id);
        _tokenURIs[id] = uri;
    }

    function getURI(uint256 tokenId) public view returns(string memory) {
        return _tokenURIs[tokenId];
    }
}