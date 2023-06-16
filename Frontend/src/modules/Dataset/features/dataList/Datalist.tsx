import { useState, useEffect } from "react";
import listIcon from "@assets/images/list-icon.png";
import icon1 from "@assets/images/icon1.png";
import icon2 from "@assets/images/icon2.png";
import { Link } from "react-router-dom";
import { getDataset } from "@modules/Shared/Services";
import { Dataset } from "@modules/Dataset";

export const Datalist = () => {
  const [dataList, setDataList] = useState<any>([]);

  const getData = async () => {
    let data1 = await getDataset(1);
    let data2 = await getDataset(2);
    //let data3 = await getDataset(3);
    console.log();

    try {
      let res1 = await fetch(data1[0]);
      let res2 = await fetch(data2[0]);
      let info1 = await res1.json();
      let info2 = await res2.json();
      setDataList([info1, info2]);
      console.log(info1);
    } catch (error) {
      console.log(error);
    }
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (!+bytes) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
      "Bytes",
      "KiB",
      "MiB",
      "GiB",
      "TiB",
      "PiB",
      "EiB",
      "ZiB",
      "YiB",
    ];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="h-full w-full flex flex-col gap-10">
      <h2 className="font-bold text-5xl h-[10%]"> Explore Datasets</h2>
      <section className="h-[90%] w-full overflow-auto px-2">
        <div className="flex min-w-[1200px] text-md lg:text-2xl ">
          <div className="font-bold  w-[10%]  px-2">Logo</div>
          <div className="font-bold  w-[40%] px-2">Dataset Name</div>
          <div className="font-bold  w-[15%] px-2">size</div>
          <div className="font-bold  w-[25%] px-2">Reviewers</div>
          <div className="font-bold  w-[10%] px-2">DV Score</div>
        </div>
        {dataList.length == 0 && (
          <div className="text-md font-bold text-center mt-10">
            Loading Dataset...
          </div>
        )}

        {dataList.length > 0 &&
          dataList.map((item: any, idx: any) => (
            <Link to={`/dataset/${idx + 1}`} key={idx}>
              <div className="flex min-w-[1200px] text-md my-4 border-2 border-gray-300 py-5 cursor-pointer hover:shadow-md  shadow-black">
                <div className="  w-[10%]  px-2">
                  <img src={listIcon} />
                </div>
                <div className="text-lg flex items-center w-[40%] px-2">
                  {item.name}
                </div>
                <div className="text-lg flex items-center  w-[15%] px-2">
                  {formatBytes(item.dataset_size)}
                </div>
                <div className=" text-lg flex space-x-2 overflow-x-auto items-center w-[25%]  px-2">
                  <img src={icon1} />
                  <img src={icon2} />
                </div>
                <div className="text-lg flex items-center  w-[10%] px-2">
                  DV Score
                </div>
              </div>
            </Link>
          ))}
      </section>
    </div>
  );
};
