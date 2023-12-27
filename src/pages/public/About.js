import React from "react";
import image from "../../assets/researchp.jpeg";

const About = () => {
  return (
    <div className=" mt-[50px] w-main flex mb-[100px] ">
      <div className="w-2/5 px-2 animate-pulse">
        <img src={image} alt="research" />
      </div>
      <div className=" w-4/5 font-thin text-gray-800 flex flex-col px-4 justify-center">
        <span className=" font-thin text-gray-800 animate-slide-top">
          SOACAN was established in 2019 by Isabel Theissen. Focusing on the
          best nature offers for our bodies and minds, SOACAN creates
          all-natural products and experiences with a modern aesthetic that
          embrace natural beauty and well-being. SOACAN products are developed
          by experienced pharmacists and handmade by artisan craftsmen. Each
          product and experience is based on uncompromising quality.
        </span>
        <span className=" ml-4 text-sm font-thin mt-10 animate-slide-top-sm">
          “Nor is there anyone who loves or pursues or desires to obtain pain of
          itself, because it is pain, but occasionally circumstances occur in
          which toil and pain can procure him some great pleasure.”
        </span>
      </div>
    </div>
  );
};

export default About;
