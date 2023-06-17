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

const datasetCash = new Map();
export const getDataset = async (tokenId: number) => {
  if (datasetCash.get(tokenId)) return datasetCash.get(tokenId);
  const tokenUri = await DatasetContract.functions.tokenURI(tokenId);
  datasetCash.set(tokenId,tokenUri);
  return tokenUri;
};

const datasetInfoCash = new Map();
export const getDatasetInfo  = async (tokenId: number) => {
  if (datasetInfoCash.get(tokenId)) return datasetInfoCash.get(tokenId);
  const tokenUri = await getDataset(tokenId);
  const res = await fetch(tokenUri[0]);
  const ret = await res.json();
  datasetInfoCash.set(tokenId, ret);
  return ret;
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
export const getReviewerReports = async (reviewerId: number) => {
  if (reviewerReportCash.get(reviewerId)) return reviewerReportCash.get(reviewerId);
  const reports = await ReportContract.functions.getReportsByReviewer(reviewerId);
  reviewerReportCash.set(reviewerId, reports[0]);
  return reports[0];
};


const reportsByDatasetCash = new Map();
export const getReportsByDataset = async (datasetId: number) => {
  if (reportsByDatasetCash.get(datasetId)) return reportsByDatasetCash.get(datasetId);
  const reportIds = await ReportContract.functions.getReportsByDataset(
    datasetId
  );
  reportsByDatasetCash.set(datasetId, reportIds[0]);
  return reportIds[0];
};

const reportsCash = new Map();
export const getReport = async (id: number) => {
  if (reportsCash.get(id)) return reportsCash.get(id);
  const uri = await ReportContract.functions.tokenURI(id);
  reportsCash.set(id, uri[0]);
  return uri[0];
};

const reportReviewerCash = new Map();
export const getReportReviewer = async (reportId: number) => {
  if (reportReviewerCash.get(reportId)) return reportReviewerCash.get(reportId);
  const id = await ReportContract.functions.getReviewer(reportId);
  reportReviewerCash.set(reportId, id[0]);
  return id[0];
};

const reportDatasetCash = new Map();
export const getReportDataset = async (reportId: number) => {
  if (reportDatasetCash.get(reportId)) return reportDatasetCash.get(reportId);
  const id = await ReportContract.functions.getDataset(reportId);
  reportDatasetCash.set(reportId, id[0]);
  return id[0];
};

