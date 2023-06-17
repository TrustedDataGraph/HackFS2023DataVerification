import { ethers } from "ethers";
import DatasetAbi from "@abi/Dataset.json";
import ReviewerAbi from "@abi/Reviewer.json";
import ReportAbi from "@abi/Report.json";
const DatasetAddr = `${import.meta.env.VITE_DATASET_ADDR}`;
const ReviewerAddr = `${import.meta.env.VITE_REVIEWER_ADDR}`;
const ReportAddr = `${import.meta.env.VITE_REPORT_ADDR}`;

//@ts-ignore
//let provider: any;
const url = `${import.meta.env.VITE_NODE_URL}`;
const provider = new ethers.providers.JsonRpcProvider(url);

const DatasetContract = new ethers.Contract(DatasetAddr, DatasetAbi, provider);

const ReviewerContract = new ethers.Contract(
  ReviewerAddr,
  ReviewerAbi,
  provider
);

const ReportContract = new ethers.Contract(ReportAddr, ReportAbi, provider);

export const getDataset = async (tokenId: number) => {
  const tokenUri = await DatasetContract.functions.tokenURI(tokenId);
  return tokenUri;
};

const reviwerCash = new Map();
export const getReviewer = async (tokenId: number) => {
  if (reviwerCash.get(tokenId)) return reviwerCash.get(tokenId);
  const tokenUri = await ReviewerContract.functions.tokenURI(tokenId);
  reviwerCash.set(tokenId, tokenUri);
  return tokenUri;
};

const reviwerInfoCash = new Map();
export const getReviewerInfo = async (tokenId: number) => {
  if (reviwerInfoCash.get(tokenId)) return reviwerInfoCash.get(tokenId);
  const tokenUri = await getReviewer(tokenId);
  const res = await fetch(tokenUri[0]);
  const ret = await res.json();
  reviwerInfoCash.set(tokenId, ret);
  return ret;
};

const reviewerReportCash = new Map();
export const getReviewerReports = async (tokenId: number) => {
  if (reviewerReportCash.get(tokenId)) return reviewerReportCash.get(tokenId);
  const reports = await ReportContract.functions.getReportsByReviewer(tokenId);
  reviewerReportCash.set(tokenId, reports);
  return reports;
};


export const getReportsByDataset = async (datasetId: number) => {
  const reportIds = await ReportContract.functions.getReportsByDataset(
    datasetId
  );
  return reportIds;
};

export const getReport = async (id: number) => {
  const uri = await ReportContract.functions.tokenURI(id);
  return uri;
};
