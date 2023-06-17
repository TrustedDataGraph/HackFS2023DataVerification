interface IData {
  name: string;
  description: string;
  dataset_size: number;
  file_format: string;
}
export const DataSummary = ({ data }: { data: IData }) => {
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

  return (
    <div className="h-[60%] w-full  ">
      <h2 className="font-bold text-5xl h-[15%] pt-3"> Explore Datasets</h2>
      <div className="h-[85%]">
        <p className="text-xl py-6">{data.description}</p>

        <div className="w-full lg:w-[50%] flex gap-6">
          <div className="w-[50%]">
            <div className="flex py-2">
              <div className="w-[70%] font-bold text-lg">Size</div>
              <div className="w-[30%] text-lg">
                {formatBytes(data.dataset_size)}
              </div>
            </div>
            <div className=" flex py-2">
              <div className="w-[70%] font-bold text-lg">File type</div>
              <div className="w-[30%] text-lg">{data.file_format}</div>
            </div>
            <div className=" flex py-2">
              <div className="w-[70%] font-bold text-lg">Storage providers</div>
              <div className="w-[30%] text-lg">40</div>
            </div>
          </div>
          <div className="w-[20%] border-2 border-black rounded-lg flex flex-col justify-center items-center">
            <small className="text-textGreen text-3 font-semibold">
              Data Accuracy Score
            </small>
            <p className="text-2xl font-bold">9/10</p>
          </div>
          <div className="w-[30%]">
            <button className="bg-primaryLight rounded-lg text-2xl font-bold h-full px-3">
              Show Report of Verifier(TBD)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
