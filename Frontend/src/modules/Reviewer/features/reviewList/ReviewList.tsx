import { RiErrorWarningLine } from "react-icons/ri";
import { AiFillCheckCircle } from "react-icons/ai";

export const ReviewList = () => {
  return (
    <div className="h-[40%] w-full lg:w-[50%]  border-2 border-black pt-4 py-2 px-4 rounded-lg ">
      <h2 className="font-bold text-3xl h-[10%] "> Datasets Verified</h2>
      <ol className="block h-[90%] list-decimal w-full py-4 pt-6 overflow-y-auto ">
        <li className="flex space-x-4">
          <div className="w[10%] text-lg">1.</div>
          <div className="w-[55%] text-lg">Encyclopedia of DNA Elements</div>
          <div className="w-[10%] flex items-center text-green-500 ">
            <AiFillCheckCircle size={20} />
          </div>
          <div className="w-[25%] text-sm flex justify-between items-center">
            <small className="text-sm text-linkBlue font-semibold  underline">
              View Report
            </small>
            <small className="text-sm text-linkBlue font-semibold  underline">
              View Dataset
            </small>
          </div>
        </li>
        <li className="flex space-x-4">
          <div className="w[10%] text-lg">2.</div>
          <div className="w-[55%] text-lg">Agriculture Output of Japan</div>
          <div className="w-[10%] flex items-center text-green-500 ">
            <AiFillCheckCircle size={20} />
          </div>
          <div className="w-[25%] text-sm flex justify-between items-center">
            <small className="text-sm text-linkBlue font-semibold  underline">
              View Report
            </small>
            <small className="text-sm text-linkBlue font-semibold  underline">
              View Dataset
            </small>
          </div>
        </li>

        <li className="flex space-x-4">
          <div className="w[10%] text-lg">3.</div>
          <div className="w-[55%] text-lg">Fastest Growing Cities in Asia</div>
          <div className="w-[10%] flex items-center text-yellow-500 ">
            <RiErrorWarningLine size={20} />
          </div>
          <div className="w-[25%] text-sm flex justify-between items-center">
            <small className="text-sm text-linkBlue font-semibold  underline">
              View Report
            </small>
            <small className="text-sm text-linkBlue font-semibold  underline">
              View Dataset
            </small>
          </div>
        </li>
      </ol>
    </div>
  );
};
