interface IData {
  name: string;
  description: string;
  verification_method: string;
  email: string;
  location: string;
  expertise: string[];
}

export const ReviewerSummary = ({ data }: { data: IData }) => {
  return (
    <div className="h-[60%] w-full relative bg-white">
      <h2 className="font-bold text-5xl h-[15%] bg-white relative pt-3">
        {data.name}
      </h2>
      <div className="h-[85%]   relative overflow-y-auto pb-4">
        <p className="text-xl py-6 ">{data.description}</p>

        <div className="w-full  flex gap-6">
          <div className="flex py-2">
            <div className=" font-bold text-lg">Location: </div>
            <div className="text-lg pl-3"> {data.location}</div>
          </div>
        </div>
        <div className="w-full  flex gap-6">
          <div className="flex py-2">
            <div className=" font-bold text-lg">Email: </div>
            <div className="text-lg pl-3"> {data.email}</div>
          </div>
        </div>
        <div className="w-full  flex gap-6">
          <div className="flex py-2">
            <div className=" font-bold text-lg">Reviewer Verified Through:</div>
            <div className="text-lg pl-3"> {data.verification_method}</div>
          </div>
        </div>

        <div className="flex py-2">
          <div className=" font-bold text-lg">Expertise: </div>
        </div>
        {data.expertise.map((item, idx) => (
          <div className="flex py-2 text-lg pl-2 " key={idx}>
            <div className="">{idx + 1}.</div>
            <div className=" pl-3">{item} </div>
          </div>
        ))}
      </div>
    </div>
  );
};
