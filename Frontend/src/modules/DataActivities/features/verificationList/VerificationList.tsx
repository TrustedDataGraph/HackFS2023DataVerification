import { RiErrorWarningLine } from "react-icons/ri";
import { AiFillCheckCircle } from "react-icons/ai";

export const VerificationList = () => {
  return (
    <div className="h-[40%] w-full lg:w-[50%]  border-2 border-black pt-4 py-2 px-4 rounded-lg">
      <ol className="block h-[90%] list-decimal w-full py-4 pt-6 overflow-y-auto ">
        <li className="flex space-x-4">
          <div className="w[10%] text-lg">1.</div>
          <div className="w-[55%] text-lg">University of Waterloo</div>
          <div className="w-[10%] flex items-center text-green-500 ">
            <AiFillCheckCircle size={20} />
          </div>
          <div className="w-[25%] text-sm flex justify-between items-center">
            <small className="text-sm text-linkBlue font-semibold  underline">
              View Report
            </small>
            <small className="text-sm text-linkBlue font-semibold  underline">
              View Verifier
            </small>
          </div>
        </li>
        <li className="flex space-x-4">
          <div className="w[10%] text-lg">1.</div>
          <div className="w-[55%] text-lg">University of Waterloo</div>
          <div className="w-[10%] flex items-center text-green-500 ">
            <AiFillCheckCircle size={20} />
          </div>
          <div className="w-[25%] text-sm flex justify-between items-center">
            <small className="text-sm text-linkBlue font-semibold  underline">
              View Report
            </small>
            <small className="text-sm text-linkBlue font-semibold  underline">
              View Verifier
            </small>
          </div>
        </li>
        <li className="flex space-x-4">
          <div className="w[10%] text-lg">2.</div>
          <div className="w-[55%] text-lg">Verifier Dao</div>
          <div className="w-[10%] flex items-center text-green-500 ">
            <AiFillCheckCircle size={20} />
          </div>
          <div className="w-[25%] text-sm flex justify-between items-center">
            <small className="text-sm text-linkBlue font-semibold  underline">
              View Report
            </small>
            <small className="text-sm text-linkBlue font-semibold  underline">
              View Verifier
            </small>
          </div>
        </li>
        <li className="flex space-x-4">
          <div className="w[10%] text-lg">3.</div>
          <div className="w-[55%] text-lg">UCLA</div>
          <div className="w-[10%] flex items-center text-yellow-500 ">
            <RiErrorWarningLine size={20} />
          </div>
          <div className="w-[25%] text-sm flex justify-between items-center">
            <small className="text-sm text-linkBlue font-semibold  underline">
              View Report
            </small>
            <small className="text-sm text-linkBlue font-semibold  underline">
              View Verifier
            </small>
          </div>
        </li>
      </ol>
    </div>
  );
};
