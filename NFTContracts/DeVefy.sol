// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "contracts/2_Owner.sol";

contract DeVefy is ERC721URIStorage, Owner {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => string) private verifiedData;

    constructor() ERC721("DeVefy", "DVF") {}

    function awardVerifier(address verifier, string memory tokenURI)
        external   
        isOwner
        returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();
        _mint(verifier, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
        return newItemId;
    }

    function getExtraData(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return verifiedData[tokenId];
    }
}

