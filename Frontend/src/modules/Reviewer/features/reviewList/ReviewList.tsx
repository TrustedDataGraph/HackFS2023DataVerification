import { useState,useEffect } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { AiFillCheckCircle } from "react-icons/ai";
import { getDatasetInfo, getReport, getReportDataset } from "@modules/Shared/Services";
import { Link } from "react-router-dom";

interface IProps {
  reports: any;
}

export const ReviewList = ( {reports }: IProps) => {
  const [dataList, setDataList] = useState<any>([]);
  console.log(reports);

  const getData = async () => {
    try {
      const data = [];
      for (let i=0; i< reports.length; i++){
        const uri = await getReport(reports[i]);
        const datasetId = await getReportDataset(reports[i]);
        const datasetInfo = await getDatasetInfo(datasetId);
        console.log(uri,datasetId)
        data.push({uri,datasetId,datasetInfo});
      }
      setDataList(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, [reports]);

  return (
    <div className="h-[30%] w-full lg:w-[50%]  border-2 border-black pt-4 py-2 px-4 rounded-lg ">
      <h2 className="font-bold text-3xl h-[10%] "> Datasets Verified</h2>
      <ol className="block h-[90%] list-decimal w-full py-4 pt-6 overflow-y-auto ">
        {dataList.length == 0 && (
          <div className="text-md font-bold text-center mt-10">
            Loading Files...
          </div>
        )}
        {dataList.length > 0 &&
          dataList.map((item: any, idx: any) => (
          <li key={idx} className="flex space-x-4">
            <div className="w[10%] text-lg">{idx+1}.</div>
            <div className="w-[55%] text-lg">{item.datasetInfo.name}</div>
            <div className="w-[10%] flex items-center text-green-500 ">
              <AiFillCheckCircle size={20} />
            </div>
      
            <div className="w-[25%] text-sm flex justify-between items-center">
              <small className="text-sm text-linkBlue font-semibold  underline">
                <a href={item.uri} target="_blank" rel="noopener noreferrer">View Report</a>
              </small>
              <small className="text-sm text-linkBlue font-semibold  underline">
                <Link to={`/dataset/${item.datasetId}`}>
                View Dataset
                </Link>
              </small>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
