import { useState, useEffect } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { AiFillCheckCircle } from "react-icons/ai";
import { getReportsByDataset, getReport } from "@modules/Shared/Services";
import { ReviewDisplayList } from "@modules/DataActivities/components/ReviewList";
interface IProps {
  data: any;
  datasetid: number;
}
export const VerificationList = ({ data, datasetid }: IProps) => {
  const [dataList, setDataList] = useState<any>([]);
  const [idList, setIdList] = useState<number[]>([]);
  //console.log(datasetid);
  const getData = async () => {
    try {
      const ids = await getReportsByDataset(datasetid);
      // console.log(ids);
      setIdList([Number(ids)]);

      const data = [];
      for (let i = 0; i < ids.length; i++) {
        const uri = await getReport(Number(ids[i]));
        // console.log(uri);
        //const res = await fetch(uri[0]);
        //console.log(res);
        data.push(uri);
      }
      //console.log(data);
      setDataList(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="h-[40%] w-full lg:w-[50%]  border-2 border-black pt-4 py-2 px-4 rounded-lg">
      <ol className="block h-[90%] list-decimal w-full py-4 pt-6 overflow-y-auto ">
        {idList.map((id, idx) => (
          <ReviewDisplayList key={idx} reviewId={id} />
        ))}
      </ol>
    </div>
  );
};
