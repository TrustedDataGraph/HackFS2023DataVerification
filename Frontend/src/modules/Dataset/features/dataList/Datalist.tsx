import listIcon from "@assets/images/list-icon.png";
import icon1 from "@assets/images/icon1.png";
import icon2 from "@assets/images/icon2.png";
import { Link } from "react-router-dom";

export const Datalist = () => {
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
        {
          <Link to={`/dataset/${1}`}>
            <div className="flex min-w-[1200px] text-md my-4 border-2 border-gray-300 py-5 cursor-pointer hover:shadow-md  shadow-black">
              <div className="  w-[10%]  px-2">
                <img src={listIcon} />
              </div>
              <div className="text-lg flex items-center w-[40%] px-2">
                Encyclopedia on DNA Elements
              </div>
              <div className="text-lg flex items-center  w-[15%] px-2">
                2.62 PiB
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
        }
      </section>
    </div>
  );
};
