import { isWallectConnected } from "@modules/Shared/Services";
import { useGlobalState } from "@modules/Shared/store";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getDataset } from "@modules/Shared/Services";

export const ReportForm = () => {
  const fileElement = useRef<HTMLInputElement>(null);
  const [currentFile, setCurrentFile] = useState<File>();
  const [data, setData] = useState<any>({});
  let { id } = useParams();

  const [connectedAddress] = useGlobalState("connectedAddress");

  const getData = async () => {
    let data1 = await getDataset(Number(id));

    try {
      let res1 = await fetch(data1[0]);

      let info1 = await res1.json();
      console.log(info1);
      setData(info1);
      console.log(info1);
    } catch (error) {
      console.log(error);
    }
  };

  //get uploaded file
  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setCurrentFile(selectedFiles?.[0]);
  };

  useEffect(() => {
    isWallectConnected();
    getData();
  }, []);
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
              #{id}
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

          <button className="mt-10 border-2 px-4 py-2 border-black rounded-xl bg-gray-300 font-semibold text-xl">
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};
