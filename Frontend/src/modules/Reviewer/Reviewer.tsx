import { useEffect, useState } from "react";
import Header from "@modules/Shared/layout/Header";
import { ReviewerSummary } from "./features/reviewerSummary";
import { ReviewList } from "./features/reviewList";
import { useParams } from "react-router-dom";
import {
  getReviewerInfo,
  getReviewerReportInfo,
} from "@modules/Shared/Services";
interface IData {
  name: string;
  description: string;
  verification_method: string;
  email: string;
  location: string;
  expertise: string[];
}

export function Reviewer() {
  let { id } = useParams();
  const [data, setData] = useState<IData>({
    name: "",
    description: "",
    verification_method: "",
    email: "",
    location: "",
    expertise: [""],
  });

  const getInfo = async () => {
    const info = await getReviewerInfo(Number(id));
    const reports = await getReviewerReportInfo(Number(id) + 1);
    console.log(reports);
    setData(info);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="h-full w-full flex flex-col  ">
      <Header />
      <main className="w-full h-[90%]">
        <ReviewerSummary data={data} />
        <ReviewList />
      </main>
    </div>
  );
}
