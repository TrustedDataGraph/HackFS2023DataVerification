import heroImg from "@assets/images/hero.png";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <div className="h-full w-full flex items-center">
      <section className="h-full w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className="font-bold text-6xl">
          Find the most Authentic Data on Filecoin.
        </h2>
        <p className="font-semibold text-2xl mt-10">
          In the world of free datasets on Filecoin, we need a way to verify the
          authenticity of the data.
        </p>
        <div className="flex space-x-6 mt-6">
          <Link to="/dataset">
            <button className="bg-primary rounded-md text-white font-semibold text-lg px-3 py-2 ">
              Explore Datasets
            </button>
          </Link>
          <button className="border-2 border-black rounded-md text-black font-semibold text-lg px-3 py-2 ">
            Become A verifier
          </button>
        </div>
      </section>
      <section className="h-full hidden lg:block w-[50%] ">
        <img src={heroImg} alt="" className="h-full w-full" />
      </section>
    </div>
  );
};
