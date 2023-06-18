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

const datasetCache = new Map();
export const getDataset = async (tokenId: number) => {
  if (datasetCache.get(tokenId)) return datasetCache.get(tokenId);
  const tokenUri = await DatasetContract.functions.tokenURI(tokenId);
  datasetCache.set(tokenId,tokenUri);
  return tokenUri;
};

const datasetInfoCache = new Map();
export const getDatasetInfo  = async (tokenId: number) => {
  if (datasetInfoCache.get(tokenId)) return datasetInfoCache.get(tokenId);
  const tokenUri = await getDataset(tokenId);
  const res = await fetch(tokenUri[0]);
  const ret = await res.json();
  datasetInfoCache.set(tokenId, ret);
  return ret;
};

const reviwerCache = new Map();
export const getReviewer = async (tokenId: number) => {
  if (reviwerCache.get(tokenId)) return reviwerCache.get(tokenId);
  const tokenUri = await ReviewerContract.functions.tokenURI(tokenId);
  reviwerCache.set(tokenId, tokenUri);
  return tokenUri;
};

const reviwerInfoCache = new Map();
export const getReviewerInfo = async (tokenId: number) => {
  if (reviwerInfoCache.get(tokenId)) return reviwerInfoCache.get(tokenId);
  const tokenUri = await getReviewer(tokenId);
  const res = await fetch(tokenUri[0]);
  const ret = await res.json();
  reviwerInfoCache.set(tokenId, ret);
  return ret;
};

let reviewerReportCache = new Map();
export const getReviewerReports = async (reviewerId: number) => {
  if (reviewerReportCache.get(reviewerId)) return reviewerReportCache.get(reviewerId);
  const reports = await ReportContract.functions.getReportsByReviewer(reviewerId);
  reviewerReportCache.set(reviewerId, reports[0]);
  return reports[0];
};

let reportsByDatasetCache = new Map();
export const getReportsByDataset = async (datasetId: number) => {
  if (reportsByDatasetCache.get(datasetId)) return reportsByDatasetCache.get(datasetId);
  const reportIds = await ReportContract.functions.getReportsByDataset(
    datasetId
  );
  reportsByDatasetCache.set(datasetId, reportIds[0]);
  return reportIds[0];
};

export const clearReportCache = ()=>{
  //need to clear by filter result , when creating new report.
  reviewerReportCache = new Map();
  reportsByDatasetCache = new Map();
}

const reportsCache = new Map();
export const getReport = async (id: number) => {
  if (reportsCache.get(id)) return reportsCache.get(id);
  const uri = await ReportContract.functions.tokenURI(id);
  reportsCache.set(id, uri[0]);
  return uri[0];
};

const reportReviewerCache = new Map();
export const getReportReviewer = async (reportId: number) => {
  if (reportReviewerCache.get(reportId)) return reportReviewerCache.get(reportId);
  const id = await ReportContract.functions.getReviewer(reportId);
  reportReviewerCache.set(reportId, id[0]);
  return id[0];
};

const reportDatasetCache = new Map();
export const getReportDataset = async (reportId: number) => {
  if (reportDatasetCache.get(reportId)) return reportDatasetCache.get(reportId);
  const id = await ReportContract.functions.getDataset(reportId);
  reportDatasetCache.set(reportId, id[0]);
  return id[0];
};

// Before calling this function, connect metamsk, swith to filecoin network should be done.
export const mintReport = async (reviewerId: number,datasetId: number, reportUri: string) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const ReportSignContract = new ethers.Contract(ReportAddr, ReportAbi, signer);
  await ReportSignContract.functions.mintReport(reviewerId, datasetId,reportUri);
  return;
};
