// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "contracts/2_Owner.sol";

contract Reviewer is ERC721URIStorage, Owner {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("DataTrustedGraph Reviewer", "DTGR") {}

    function issueReviewer(address reviewer, string memory tokenURI)
        external   
        isOwner
        returns (uint256)
    {
        uint256 newReviewerId = _tokenIds.current();
        _mint(reviewer, newReviewerId);
        _setTokenURI(newReviewerId, tokenURI);

        _tokenIds.increment();
        return newReviewerId;
    }
}
