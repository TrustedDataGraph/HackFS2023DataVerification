import { ethers } from "ethers";
import DatasetAbi from "@abi/Dataset.json";
import ReviewerAbi from "@abi/Reviewer.json";
import ReportAbi from "@abi/Report.json";
const DatasetAddr = "0x09Ec1581C9eE71A03cfc1BFD8264ea729736a873";
const ReviewerAddr = "0x449626731493C906362E1f183295f6A8A766b98f";
const ReportAddr = "0x82A58CB41900ADaDbF82e8c10d4490b063A66180";

//@ts-ignore
//let provider: any;
const url = "https://api.calibration.node.glif.io/rpc/v1";
const provider = new ethers.providers.JsonRpcProvider(url);

const DatasetContract = new ethers.Contract(
  DatasetAddr,
  DatasetAbi,
  provider
);

const ReviewerContract = new ethers.Contract(
  ReviewerAddr,
  ReviewerAbi,
  provider
);

const ReportContract = new ethers.Contract(
  ReportAddr,
  ReportAbi,
  provider
);

export const getDataset = async (tokenId: number) => {
  const tokenUri = await DatasetContract.functions.tokenURI(tokenId);
  return tokenUri;
};

const reviwerCash = new Map();
export const getReviewer = async (tokenId: number) => {
  if(reviwerCash.get(tokenId)) return reviwerCash.get(tokenId);
  const tokenUri = await ReviewerContract.functions.tokenURI(tokenId);
  reviwerCash.set(tokenId,tokenUri);
  return tokenUri;
};

const reviwerInfoCash = new Map();
export const getReviewerInfo = async (tokenId: number) => {
  if(reviwerInfoCash.get(tokenId)) return reviwerInfoCash.get(tokenId);
  const tokenUri = await getReviewer(tokenId);
  const res = await fetch(tokenUri[0]);
  const ret =  await res.json();
  reviwerInfoCash.set(tokenId,ret);
  return ret;
};

export const getReportsByDataset = async (datasetId: number) => {
  const reportIds = await ReportContract.functions.getReportsByDataset(datasetId);
  return reportIds;
};

export const getReport = async (id: number) => {
  const uri = await ReportContract.functions.tokenURI(id);
  return uri;
};

