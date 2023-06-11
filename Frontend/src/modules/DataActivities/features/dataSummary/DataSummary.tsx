export const DataSummary = () => {
  return (
    <div className="h-[60%] w-full ">
      <h2 className="font-bold text-5xl h-[10%]"> Explore Datasets</h2>
      <p className="text-xl py-6">
        The Encyclopedia of DNA Elements (ENCODE) Consortium is an international
        collaboration of research groups funded by the National Human Genome
        Research Institute (NHGRI).
      </p>

      <div className="w-full lg:w-[50%] flex gap-6">
        <div className="w-[50%]">
          <div className="flex py-2">
            <div className="w-[70%] font-bold text-lg">Size</div>
            <div className="w-[30%] text-lg">2.62 PiB</div>
          </div>
          <div className=" flex py-2">
            <div className="w-[70%] font-bold text-lg">File type</div>
            <div className="w-[30%] text-lg">.tar</div>
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
            Access the Data
          </button>
        </div>
      </div>
    </div>
  );
};
