// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "contracts/2_Owner.sol";

contract Dataset is ERC721URIStorage{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("DataTrustedGraph Dataset", "DTGD") {}

    function mintDataset(string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 newDatasetId = _tokenIds.current();
        _mint(msg.sender, newDatasetId);
        _setTokenURI(newDatasetId, tokenURI);

        _tokenIds.increment();
        return newDatasetId;
    }

    function _transfer(address from, address to, uint256 tokenId) internal virtual override {
        require(false, "ERC721: this is a soulbound token");
    }
}
