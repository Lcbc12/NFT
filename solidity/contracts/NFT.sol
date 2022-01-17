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
    uint256[] private _ids;
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
        _ids.push(id);
    }

    function getURI(uint256 tokenId) public view returns(string memory) {
        require(!_compareStrings(_tokenURIs[tokenId], ""), "Search URI for an inexistant token");
        return _tokenURIs[tokenId];
    }

    function getIds() public view returns(uint256[] memory) {
        return _ids;
    }

    function _compareStrings(string memory a, string memory b)
    internal pure returns (bool) {
        return (
            keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b)))
        );
    }
}