import FormData from 'form-data'
//const FormData = require('form-data');
import axios from 'axios';
import {ethers, utils } from 'ethers';
import edgeURContract from './EdgeURContract.sol/EdgeURContract.json'
//const db = require('diskdb');
require('dotenv').config();

interface errorT {message : string };
interface logT {data : ethers.BytesLike };

async function main() {

  // Get args
  const rpcEndpoint = process.env.rpcEndpoint;
  const apiEndpoint = process.env.apiEndpoint + "/content/fetch-url";
  const contractAddress = process.env.contractAddress;
  const API_KEY = process.env.API_KEY;
  const chainId = Number(process.env.chainId);

  // Open the database
  //db.connect('db', ['storage']);

  // Create a new ethers provider
  //const option: JsonRpcApiProviderOptions = {
  //  batchMaxCount: 1
  //};
  //const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint,chainId,option);
  const provider = new ethers.providers.JsonRpcProvider(rpcEndpoint,chainId);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY || "", provider)
  const contract = new ethers.Contract(contractAddress || "", edgeURContract.abi, wallet);

  console.log(`Listening for events on contract at address: ${contractAddress} at RPC endpoint: ${rpcEndpoint}`);
  //const contractABI = contract.interface.abi;

  // Specify the event name you want to listen to
  const eventName = 'StoreURIEvent(string)';

  // Create an event filter
  const eventFilter = {
    address: contractAddress,
    topics: [utils.id(eventName)]
  };

  // Create an event listener
  const listener = async (log:logT) => {
    // Parse the event data from the log
    const abicoder = new utils.AbiCoder();
    const event = abicoder.decode(
      ['string'],
      log.data
    );

    // New form object
    const formData = new FormData();

    // Construct the form data payload
    console.log(event);
    const uri = event[0];
    formData.append('data_url', uri);

    const postHeaders = {
      headers: {
          Authorization: `Bearer ${API_KEY}`,
          ...formData.getHeaders()
      }
    }

    console.log("Sending payload to: ", apiEndpoint);

    // Make the HTTP API POST request with the event data
    let retData;
    try {
      const response = await axios.post(apiEndpoint, formData, postHeaders);
      retData = response.data
      console.log('API response:', retData);
    } catch (error) {
      console.error('API request failed:', (error as errorT).message);
      return null;
    }

    // Store the data a local database
    let contents;
    try {
      console.log("Storing data locally")
      contents = retData.contents[0];
      console.log(contents);
      //db.storage.save(contents);
      console.log(`Success stored id ${contents.ID}`);
      console.log("Download:", `https://hackfs-coeus.estuary.tech/edge/gw/${contents.cid}`)
      console.log("Status:", `https://hackfs-coeus.estuary.tech/edge/open/status/content/${contents.ID}`)
    } catch (error){
      console.error('Local storage failed:', (error as errorT).message);
      return null;
    }

    // Update smart contract
    console.log("Updating smart contract");
    const transaction = await contract.updateJobId(uri, contents.ID, contents.cid)
    const transactionReceipt = await transaction.wait()
    console.log("Complete!", transactionReceipt)
  };

  // Subscribe to the event
  provider.on(eventFilter, listener);

  // Unsubscribe from the event when the process is terminated
  process.on('SIGINT', async () => {
    try {
      provider.off(eventFilter, listener);
      console.log('Unsubscribed from the event.');
      process.exit(0);
    } catch (error) {
      console.error('Error unsubscribing from the event:', error);
      process.exit(1);
    }
  });
}

main().catch((error) => {
  console.error('An error occurrd:', error);
  process.exit(1);
});
