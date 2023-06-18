import { clearReportCache, getDatasetInfo, getReviewerInfo, getReviewerOwner, isWallectConnected, mintReport } from "@modules/Shared/Services";
import { useGlobalState } from "@modules/Shared/store";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { storeFiles } from "@modules/Shared/Services/Storage";
import { ethers } from "ethers";

export const ReportForm = () => {
  const fileElement = useRef<HTMLInputElement>(null);
  const [currentFile, setCurrentFile] = useState<File>();
  const [data, setData] = useState<any>({});
  const [reviewerId, setReviewerId] = useState(-1);
  const [reviewerInfo, setReviewerInfo] = useState<any>({});
  const [reportUri, setReportUri] = useState("");
  const { datasetId } = useParams();
  const [connectedAddress] = useGlobalState("connectedAddress");

  type UserState = "notconnected" | "connected" | "verified" | "reportReady" | "completed" ;
  const [userState, setUserState] = useState<UserState>("notconnected");
  const updateUserState = async () => {
    if(connectedAddress){
      if(0 <= reviewerId){
        if(0 < reportUri.length){
          setUserState("reportReady");
          console.log(userState);
        }else {
          setUserState("verified");
          console.log(userState);
        }
      } else {
        setUserState("connected");
        console.log(userState);        
      }
    } else {
      setUserState("notconnected");
      console.log(userState);
    }
  }
  
  const getData = async () => {
    try {
      const info1 = await getDatasetInfo (Number(datasetId));
      console.log(info1);
      setData(info1);
      console.log(info1);
    } catch (error) {
      console.log(error);
    }
  };

  //get uploaded file
  const selectFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setCurrentFile(selectedFiles?.[0]);
    const uri = await storeFiles(selectedFiles) as string;
    console.log(uri);
    setReportUri(uri);
  };

  const [number, setNumber] = useState('');
  const handleNumberChange = (event) => {
    setNumber(event.target.value);
  };

  const [verifyState, setVerifyState] = useState("");
  const checkReviewerId = async () => {
    console.log("check token:",number);
    const id = Number(number);
    const owner = await getReviewerOwner(id);
    if(ethers.utils.getAddress(owner) == ethers.utils.getAddress(connectedAddress)){
      setReviewerId(id);
      const info = await getReviewerInfo(id);
      setReviewerInfo(info);
      setVerifyState("token verified");
    } else {
      setVerifyState(" failed");
    }
  }

  const mint = async () => {
    try{
      console.log("mint", reviewerId, datasetId, reportUri);
      await mintReport(reviewerId, Number(datasetId),reportUri);
      setUserState("completed");
      clearReportCache();
    }catch(errro){
      console.error(errro)
    }
  }

  useEffect(() => {
    isWallectConnected();
    getData();
    updateUserState();
  }, [connectedAddress,reviewerId,reportUri]);
  return (
    <div className="h-full w-full flex flex-col ">
      <h2 className="font-bold text-5xl h-[10%] ">Submitting Report for:</h2>
      <div className="h-[85%]">
        <h3 className="text-3xl font-normal">{data.name}</h3>
        <div className="w-full lg:w-[50%]  mt-10">
          <div className="w-full flex">
            <div className="w-[50%] text-xl font-semibold ">
              Connected Reviewer:
            </div>
            {userState=="notconnected" && (
              <div className="w-[50%] font-normal text-xl">
                Please Connect Wallet{" "}
              </div>
            )}
            {userState=="connected" && (
              <div className="w-[50%] font-normal text-xl">
                Please Veiry your ReviwerNFT id
              </div>
            )}
            {(userState=="verified" || userState =="reportReady" || userState=="completed" ) && (
              <div className="w-[50%]  font-semibold  text-xl text-black">
                {reviewerInfo.name}
              </div>
            )}
          </div>
          <div className="w-full flex">
            <div className="w-[50%] text-xl font-semibold ">Dataset NFT:</div>
            <div className="w-[50%] font-semibold text-xl  text-blue-600">
              #{datasetId}
            </div>
          </div>
          <div className="w-full flex">
            <div className="w-[50%] text-xl font-semibold ">Reviewer NFT:</div>
            {userState=="notconnected" && (
              <div className="w-[50%] font-normal text-xl">
                Please Connect Wallet
              </div>
            )}
            {(userState=="connected" ) && (
              <div className="w-[50%] font-normal font-semibold text-xl text-blue-600">
                <input type="number" value={number} onChange={handleNumberChange} 
                  className="w-16 p-2 border border-gray-300 shadow" 
                />
                <button onClick={checkReviewerId} className="mt-2 border-2 px-3 border-black rounded-xl bg-uploadLight font-semibold text-xl">
                   verify id
                </button>
                {verifyState}
              </div>
            )}
            {(userState=="verified" || userState =="reportReady" || userState=="completed" ) && (
              <div className="w-[50%] font-normal font-semibold text-xl text-blue-600">
                #{reviewerId} {verifyState}
              </div>
            )}
          </div>
          <input
            className="hidden"
            type="file"
            ref={fileElement}
            onChange={selectFile}
            accept=".pdf"
          />
          {(userState=="verified" || userState=="reportReady") ? (
            <button
              onClick={() => fileElement.current?.click()}
              className="mt-10 border-2 px-3 py-3 border-black rounded-xl bg-uploadLight font-semibold text-xl"
            >
              Upload The Report
            </button>
          ):(
            <button className="mt-10 border-2 px-4 py-2 border-black rounded-xl bg-gray-300 font-semibold text-xl">
              Upload The Report
            </button>

          )}

          <div className="w-full flex gap-10 my-10">
            <div className="text-xl font-semibold ">File Uploaded:</div>
            <div className="font-normal text-xl text-blue-600 underline">
              {currentFile?.name}
            </div>
          </div>
          {userState=="reportReady" && (
           <button 
            onClick={mint}
            className="mt-10 border-2 px-3 py-3 border-black rounded-xl bg-uploadLight font-semibold text-xl"
            >
            Submit Report
           </button>
          )}
          {(userState=="connected" || userState=="notconnected" || userState=="verified" )&& (
            <button className="mt-10 border-2 px-4 py-2 border-black rounded-xl bg-gray-300 font-semibold text-xl">
            Submit Report
            </button>
            )}
          {userState=="completed" && (
            <div className="font-normal text-xl text-blue-600 underline">
            Complete! Thank you for your subbmit.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
