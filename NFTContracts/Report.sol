// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "contracts/2_Owner.sol";


// Import the ERC721 contract
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Report is ERC721URIStorage, Owner {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    ERC721URIStorage public reviewerNFTContract;

    mapping(uint256 => uint256) private _datasetMapping;
    mapping(uint256 => uint256) private _reviewerMapping;

    constructor(address reviewerNFTAddress) ERC721("Report", "RPT") {
        reviewerNFTContract = ERC721URIStorage(reviewerNFTAddress);
    }

    function mintReport(
        uint256 reviewerId,
        uint256 datasetId,
        string memory tokenURI
    ) public {
        require(
            _reviewerOwnsReviewerNFT(reviewerId),
            "Only Reviewer NFT holder can mint Report"
        );

        _tokenIds.increment();
        uint256 newReportId = _tokenIds.current();
        _mint(msg.sender, newReportId);
        _setTokenURI(newReportId, tokenURI);
        _datasetMapping[newReportId] = datasetId;
        _reviewerMapping[newReportId] = reviewerId;
    }

    function getReportsByDataset(uint256 datasetId)
        external
        view
        returns (uint256[] memory)
    {
        uint256[] memory reports = new uint256[](_tokenIds.current());
        uint256 count = 0;

        for (uint256 reportId = 1; reportId <= _tokenIds.current(); reportId++) {
            if (_datasetMapping[reportId] == datasetId) {
                reports[count] = reportId;
                count++;
            }
        }

        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = reports[i];
        }

        return result;
    }

    function getReportsByReviewer(uint256 reviewerId)
        external
        view
        returns (uint256[] memory)
    {
        uint256[] memory reports = new uint256[](_tokenIds.current());
        uint256 count = 0;

        for (uint256 reportId = 1; reportId <= _tokenIds.current(); reportId++) {
            if (_reviewerMapping[reportId] == reviewerId) {
                reports[count] = reportId;
                count++;
            }
        }

        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = reports[i];
        }

        return result;
    }

    function _reviewerOwnsReviewerNFT(uint256 reviewerId)
        private
        view
        returns (bool)
    {
        return (reviewerNFTContract.ownerOf(reviewerId) == msg.sender);
    }
}


