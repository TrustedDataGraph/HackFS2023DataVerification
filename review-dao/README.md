# reviewo-dao  clone from FEVM-Data-DAO-Kit

This is a beta kit to demo how to build a basic Decentralized Autonomous Organization (DAO) on Filecoin. Currently, this kit contains these [OpenZeppelin contracts](https://docs.openzeppelin.com/contracts/4.x/governance): Timelock.sol, Governor.sol, and ERC20Votes. These contracts are used in conjuction with the [Filecoin Client Contract](https://github.com/filecoin-project/fvm-starter-kit-deal-making) to create a DAO that can vote on whether to propose a specific storage deal. This initial version is based on Patrick Collin's excellent repo and tutorial so be sure to check them out to learn more about how this DAO template works!

* [Video](https://www.youtube.com/watch?v=AhJtmUqhAqg)
* [Original Repo](https://github.com/PatrickAlphaC/dao-template)


## Local Development Preparation
clone and run followings.
https://github.com/filecoin-project/filecoin-fvm-localnet

and also fund (faucet) your addres on localnet.

## install

```
yarn install
```

## Get a Private Key

You can get a private key from a wallet provider [such as Metamask](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key).


## Add your Private Key as an Environment Variable

Add your private key as an environment variable by running this command:

 ```
export PRIVATE_KEY='abcdef'
```

If you use a .env file, don't commit and push any changes to .env files that may contain sensitive information, such as a private key! If this information reaches a public GitHub repository, someone can use it to check if you have any Mainnet funds in that wallet address, and steal them!

## Fund the Deployer Address

Go to the [Calibration testnet faucet](https://faucet.calibration.fildev.network/), and paste in the Ethereum address from the previous step. This will send some Calibration testnet FIL to the account.

## Deploy the Contracts

Currently there are 4 contracts in this repo:

* DAO Deal Client: This is the [Filecoin Client Contract](https://github.com/filecoin-project/fvm-starter-kit-deal-making) which can propose deals to storage miners. This contract uses the [OpenZeppelin Ownable.sol contract](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable) to switch the owner of this DealClient to be TimeLock.sol on deployment.

* Data Governance Token: This contract mints [OpenZeppelin ERC20Votes](https://docs.openzeppelin.com/contracts/4.x/api/token/erc20#ERC20Votes) token which are used to vote on DAO proposals (or delegate another person to vote on your behalf).

* Governor Contract: This contract, based on the [OpenZeppelin Governor contract](https://docs.openzeppelin.com/contracts/4.x/api/governance#Governor), manages proposals and votes. This is the "heart" of the DAO.

* Time Lock: This contract, based on the [OpenZeppelin TimeLock contract](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/), creates a buffer between when proposals are passed and queued and when they can be executed. This allows gives users time to leave the DAO if a proposal that they don't agree with is passed.


Type in the following command in the terminal to deploy all contracts:

 ```
yarn hardhat deploy
```

if some error happend, deploy with reset
```
 yarn hardhat deploy --reset
```


This will compile all the contracts in the contracts folder and deploy them automatically! The deployments scripts can be found in the deploy folder. This should also generate a deployments directory which can referenced for the address and details of each deployment.

example:
```shell
(base) review-dao % yarn hardhat deploy
yarn run v1.22.18
$ /Users/takehararyuuji/Desktop/00_DAO/HackFS2023DataVerification/review-dao/node_modules/.bin/hardhat deploy --reset
Nothing to compile
Wallet Ethereum Address: 0x3e7311e0Fc89fA633433076be268ae007A1b827a
deploying "EdgeURContract" (tx: 0xc6b498538f0a3851190f9a3722d1c8635e9d2e43bf492a6fd66bae2974f60f6d)...: deployed at 0x53cFe695C02eCC7a2A10EF07941CcFc976ced88E with 25268460 gas
deploying "DataGovernanceToken" (tx: 0x83e274fc835f39c88e85c9cbba0200da5f1978f403f5fd221e0796b3d1aab5aa)...: deployed at 0x74d1E769774E58FFd82026b4977FC007D102d56D with 64495823 gas
Checkpoints 1
Delegated to deployer wallet!
deploying "TimeLock" (tx: 0x3c9eb3a0e8af7d48740e088d1c952c16d016e3be22f662de41607000da8fa942)...: deployed at 0xdc21b1FDAb45002AFEB117Ba146683AbB01BD040 with 65215879 gas
deploying "GovernorContract" (tx: 0x3c8b5eb0cbf5f1bdee03a6bc4b2e08b6982aef00aef1ee6f2967628cc014788e)...: deployed at 0xefB2A2Ad34848BB02F4E9004A3320F13b2761349 with 108396750 gas
Setting roles in TimeLock.sol
Roles in TimeLock.sol set!
deploying "DaoDealClient" (tx: 0x6b3a09228876b806368f84c8281353a0e5b5655ff0bc7bfdd31456524ee828a6)...: deployed at 0xe61FA37e8e8F2Dd627fB6cEB7C224c81B122cb08 with 127150622 gas
Transferring DaoDealClient Owner to TimeLock.sol
Ownership transferred
✨  Done in 48.17s.
```

## Preparing Data for Storage

Before storing a file with a storage provider, it needs to be prepared by turning it into a .car file and the metadata must be recorded. To do this, the hardhat kit has a [tool submodule](https://github.com/filecoin-project/fevm-hardhat-kit/tree/main/tools), written in the language Go, which can do this for you. You can also use the [FVM Data Depot website](https://data.lighthouse.storage/) will automatically convert files to the .car format, output all the necessary metadata, and act as an HTTP retrieval point for the storage providers.

### How the Client Contract Works

The client contract is an example contract that uses the Filecoin.sol API's to create storage deals via Solidity smart contracts on Filecoin. This works by emitting a Solidity event that [Boost storage providers](https://boost.filecoin.io/) can listen to. To learn more about this contract feel free to [checkout the app kit repo](https://github.com/filecoin-project/fvm-starter-kit-deal-making) which includes a detailed readme and a frontend.


### Aggregation Staore check
store event will be emitted.

```shell
(base) review-dao % yarn hardhat store-data --contract $SCLIENT --uri "https://bafybeiafgae7xlwgkjrm6gjaibse7vn5cxwh5m7vc3paumoohm4mekdpj4.ipfs.w3s.link/review.json"

```