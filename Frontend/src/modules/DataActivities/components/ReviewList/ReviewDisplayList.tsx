import { getReviewer } from "@modules/Shared/Services";
import { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

export const ReviewDisplayList = ({ reviewId }: { reviewId: number }) => {
  const [detail, setDetail] = useState<{}>({});
  const fetchInfo = async (uri: string) => {
    const res = await fetch(uri);
    const detail = await res.json();
    setDetail(detail);
  };

  const getReviewerDetail = async () => {
    let reviewer = await getReviewer(0);
    fetchInfo(reviewer[0]);
  };

  getReviewerDetail();
  return (
    <li className="flex space-x-4">
      <div className="w[10%] text-lg">{reviewId}</div>
      <div className="w-[55%] text-lg">{detail.name}</div>
      <div className="w-[10%] flex items-center text-green-500 ">
        <AiFillCheckCircle size={20} />
      </div>
      <div className="w-[25%] text-sm flex justify-between items-center">
        <small className="text-sm text-linkBlue font-semibold  underline">
          View Report
        </small>
        <Link to={`/reviewer/${reviewId}`}>
          <small className="text-sm text-linkBlue font-semibold  underline">
            View Verifier
          </small>
        </Link>
      </div>
    </li>
  );
};
