import { getDatasetInfo, isWallectConnected, mintReport } from "@modules/Shared/Services";
import { useGlobalState } from "@modules/Shared/store";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { storeFiles } from "@modules/Shared/Services/Storage";

export const ReportForm = () => {
  const fileElement = useRef<HTMLInputElement>(null);
  const [currentFile, setCurrentFile] = useState<File>();
  const [data, setData] = useState<any>({});
  const [reviewerId, setReviewerId] = useState(-1);
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

  const checkReviewerId = async () => {
    //XXX temporary
    setReviewerId(1);
  }

  const mint = async () => {
    try{
      console.log("mint", reviewerId, datasetId, reportUri);
      await mintReport(reviewerId, Number(datasetId),reportUri);
      setUserState("completed");
    }catch(errro){
      console.error(errro)
    }
  }

  useEffect(() => {
    checkReviewerId(); // XXX remporary
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
            {!connectedAddress && (
              <div className="w-[50%] font-normal text-xl">
                Please Connect Wallet{" "}
              </div>
            )}
            {connectedAddress && (
              <div className="w-[50%]  font-semibold  text-xl text-blue-600">
                #1
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
            {!connectedAddress && (
              <div className="w-[50%] font-normal text-xl">
                Please Connect Wallet
              </div>
            )}
            {connectedAddress && (
              <div className="w-[50%] font-normal font-semibold text-xl text-blue-600">
                #1
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
          <button
            onClick={() => fileElement.current?.click()}
            className="mt-10 border-2 px-3 py-3 border-black rounded-xl bg-uploadLight font-semibold text-xl"
          >
            Upload The Report
          </button>

          <div className="w-full flex gap-10 my-10">
            <div className="text-xl font-semibold ">File Uploaded:</div>
            <div className="font-normal text-xl text-blue-600 underline">
              {currentFile?.name}
            </div>
          </div>
          {userState=="completed" && (
            <div className="font-normal text-xl text-blue-600 underline">
            Complete! Thank you for your subbmit.
            </div>
          )}
          {userState=="reportReady" ? (
           <button 
            onClick={mint}
            className="mt-10 border-2 px-3 py-3 border-black rounded-xl bg-uploadLight font-semibold text-xl"
            >
            Submit Report
           </button>
           ) : (
            <button className="mt-10 border-2 px-4 py-2 border-black rounded-xl bg-gray-300 font-semibold text-xl">
            Submit Report
            </button>
            )}
        </div>
      </div>
    </div>
  );
};
