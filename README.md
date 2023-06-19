# HackFS2023DataVerification  DataTrustedGraph+

Data Reputation System
Filecon is a massive source of large datasets. It allows anyone to upload any kind of data in a permissionless manner, which is commendable. However, it's often challenging for people to know where the data came from, when it is located, how to access it and especially, if the data is valid or not.
To address these challenges, we have developed a system to allow verified entities like Universities, DataDAOs to validate Filecoin datasets and write reports on the authenticity of the data and thus allowing users to download verified datasets in a decentralised manner. 

## 3 NFTTokens
Need to deploy 3 smart contract. every data should be stored on NFT and web3 storage.
* [Dataset.sol](NFTContracts/Dataset.sol)
    - Dataset NFTs can be minted by anyone by listing down the CIDs of the dataset along with other vital information to download the data
* [Report.sol](NFTContracts/Report.sol)
* [Reviewer.sol](NFTContracts/Reviewer.sol)
    - Trusted organizations such as universities and DataDAOs are issued ReviewerNFTs after their credentials are verified by our team, thus allowing them to submit reports by minting Report NFTs 

## Frontend

prepare .env file to specify each contract
```
cd Frontend
npm install
mpn run dev
```

## Data CID Preparation
* get original Data list
  - preparation of payload cid list.
  - This hackason, we are using following site data.
    - https://datasets.filecoin.io/
    - we stored the dataset json to followings
    - [fetch-result](DataGenerator/tool/data-fetch-result)

* this step anyone can create for additional dataset.

## Dataset filtering
this step need the lotus client. 
So I prepare special backend. on future would like to use FMV node.
* check access with Lotus
  - [checkDL](DataGenerator/tool/checkDL.mjs)
    - using `lotus client ls`  to see if the data can be reached.

* store the data with StoreProvider details
  - [appendStorageProviderDetails](DataGenerator/tool/appendStorageProviderDetails.mjs)
  - using `lotus state miner-info` to check p2p address and peerId.

## Data Retrieve
* using Saturn L1-node
    * https://github.com/filecoin-saturn/L1-node
* need to modify to make Big data size (more than 2.4GiB) DL
    * https://github.com/filecoin-saturn/L1-node/compare/main...kozayupapa:L1-node:main
    * create our customized node and access it directly
    * on future, need to implrement  DL retry function.
    * currently Saturn team already working Nginx layer: https://github.com/filecoin-saturn/nginx-car-range
    * maybe we need to develop lassie daemon to accept range parameter too.

<!--


```mermaid

```mermaid


```
```

```mermaid

``` -->
