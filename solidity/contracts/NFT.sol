// SPDX-License-Identifier: MIT
pragma solidity <= 9.0.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * Implementation of ERC721 in order to handle NFT
 * v1: minting and retrieving NFT
 * TODO v2: market place where accounts can transfer NFT
 */
contract NFT is ERC721 {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // to display all NFT minted
    uint256[] private _ids;

    // to retrieve URI from token id
    mapping(uint256 => string) private _tokenURIs;

    /**
     * @notice Create the NFT collection
     * @dev The NFT collection inherits from ERC721
     * @param name name of the collection
     * @param symbol symbol of the collection
     */
    constructor(
        string memory name,
        string memory symbol
    )
    ERC721(name, symbol)
    {
    }

    /**
     * @notice Mint a new NFT in the collection
     * @dev gives the NFT an identifier according to the _tokenIds state
     * @param owner owner address of the NFT
     * @param uri Uniform Resource Identifier of the metadata file
     */
    function mint(address owner, string memory uri) public {
        _tokenIds.increment();

        uint256 id = _tokenIds.current();
        _safeMint(owner, id);
        _tokenURIs[id] = uri;
        _ids.push(id);
    }

    /**
     * @notice Returns the URI of the metadata file according to the idenfitier
     *         given in parameter
     * @param tokenId identifier of the NFT
     * @return Uniform Resource Identifier of the NFT
     */
    function getURI(uint256 tokenId) public view returns(string memory) {
        require(
            !_compareStrings(_tokenURIs[tokenId], ""),
            "Search URI for an inexistant token"
        );
        return _tokenURIs[tokenId];
    }

    /**
     * @notice Returns a list of all the identifiers
     * @return a lit of all the identifiers
     */
    function getIds() public view returns(uint256[] memory) {
        return _ids;
    }

    /**
     * @notice compare two strings given in parameter and return if they are
     *         equals or not
     * @param a first string to compare to the other one
     * @param b second string to compare to the first one
     * @return true if a==b, false otherwise
     */
    function _compareStrings(
        string memory a,
        string memory b
    )
    internal
    pure
    returns (bool) {
        return (
            keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b)))
        );
    }
}