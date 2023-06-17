import { useState, useEffect } from "react";
import listIcon from "@assets/images/list-icon.png";
import icon1 from "@assets/images/icon1.png";
import icon2 from "@assets/images/icon2.png";
import { Link } from "react-router-dom";
import { getDataset } from "@modules/Shared/Services";
interface IProps {
  data: any;
}
export const FileList = ({ data }: IProps) => {
  const [dataList, setDataList] = useState<any>([]);

  const getData = async () => {
    try {
      setDataList(data.files)
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
      <h2 className="font-bold text-5xl h-[10%]"> Explore Dataset files</h2>
      <section className="h-[90%] w-full overflow-auto px-2">
        <div className="flex min-w-[1200px] text-md lg:text-2xl ">
          <div className="font-bold  w-[10%]  px-2">Logo</div>
          <div className="font-bold  w-[20%] px-2">file Name</div>
          <div className="font-bold  w-[15%] px-2">size</div>
          <div className="font-bold  w-[15%] px-2">DealID</div>
          <div className="font-bold  w-[10%] px-2">link</div>
        </div>
        {dataList.length == 0 && (
          <div className="text-md font-bold text-center mt-10">
            Loading Files...
          </div>
        )}

        {dataList.length > 0 &&
          dataList.map((item: any, idx: any) => (
            <Link to={`/dataset/${idx + 1}`} key={idx}>
              <div className="flex min-w-[1200px] text-md my-4 border-2 border-gray-300 py-5 cursor-pointer hover:shadow-md  shadow-black">
                <div className="  w-[10%]  px-2">
                  <img src={listIcon} />
                </div>
                <div className="text-lg flex items-center w-[20%] px-2">
                  {item.filename}
                </div>
                <div className="text-lg flex items-center  w-[15%] px-2">
                  {formatBytes(item.data_size)}
                </div>
                <div className="text-lg flex items-center  w-[15%] px-2">
                  {item.deal_id}
                </div>
                <div className=" text-lg flex space-x-2 overflow-x-auto items-center w-[10%]  px-2">
                  Download!
                </div>
              </div>
            </Link>
          ))}
      </section>
    </div>
  );
};
