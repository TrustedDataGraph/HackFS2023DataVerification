export const ReviewerSummary = () => {
  return (
    <div className="h-[60%] w-full relative bg-white">
      <h2 className="font-bold text-5xl h-[15%] bg-white relative pt-3">
        {" "}
        Kyoto University
      </h2>
      <div className="h-[85%]   relative overflow-y-auto pb-4">
        <p className="text-xl py-6 ">
          Kyoto University is a public research university located in Kyoto,
          Japan. Founded in 1897, it is one of the former Imperial Universities
          and the second oldest university in Japan. KyotoU is consistently
          ranked amongst the top two in Japan, the top ten in Asia, and the
          world's top fifty institutions of higher education.
        </p>

        <div className="w-full  flex gap-6">
          <div className="flex py-2">
            <div className=" font-bold text-lg">Location: </div>
            <div className="text-lg pl-3"> Kyoto, Japan</div>
          </div>
        </div>
        <div className="w-full  flex gap-6">
          <div className="flex py-2">
            <div className=" font-bold text-lg">Email: </div>
            <div className="text-lg pl-3"> contact@kyoto-u.ac.jp Reviewer</div>
          </div>
        </div>
        <div className="w-full  flex gap-6">
          <div className="flex py-2">
            <div className=" font-bold text-lg">
              Reviewer Verified Through:{" "}
            </div>
            <div className="text-lg pl-3"> Email</div>
          </div>
        </div>

        <div className="flex py-2">
          <div className=" font-bold text-lg">Expertise: </div>
        </div>
        <div className="flex py-2 text-lg pl-2 ">
          <div className="">1.</div>
          <div className=" pl-3">Pharmaceutical Sciences </div>
        </div>
        <div className="flex py-2 text-lg pl-2 ">
          <div className="">2.</div>
          <div className=" pl-3">Agriculture </div>
        </div>
        <div className="flex py-2 text-lg pl-2 ">
          <div className="">3.</div>
          <div className=" pl-3">Economics </div>
        </div>
        <div className="flex py-2 text-lg pl-2 ">
          <div className="">4.</div>
          <div className=" pl-3">Bio Studies </div>
        </div>
      </div>
    </div>
  );
};
