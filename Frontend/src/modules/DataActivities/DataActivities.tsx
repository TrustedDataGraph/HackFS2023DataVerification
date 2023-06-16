import { useEffect, useState } from "react";
import Header from "@modules/Shared/layout/Header";
import { DataSummary } from "./features/dataSummary";
import { VerificationList } from "./features/verificationList";
import { useParams } from "react-router-dom";
import { getDataset } from "@modules/Shared/Services";

export function DataActivities() {
  let { id } = useParams();

  const [data, setData] = useState<any>({});

  const getData = async () => {
    let data1 = await getDataset(Number(id));

    console.log();

    try {
      let res1 = await fetch(data1[0]);

      let info1 = await res1.json();

      setData(info1);
      console.log(info1);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (typeof id == "string") getData();
  }, [id]);
  return (
    <div className="h-full w-full flex flex-col ">
      <Header />

      <main className="w-full h-[90%]">
        {Object.keys(data).length == 0 && (
          <div className="text-md font-bold text-center mt-10">
            Loading Data detail...
          </div>
        )}
        {Object.keys(data).length > 0 && (
          <>
            <DataSummary data={data} />
            <VerificationList />
          </>
        )}
      </main>
    </div>
  );
}
