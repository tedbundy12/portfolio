import React from "react";

import wifi from "../assets/wifi.svg";
import markup from "../assets/markup.svg";
import code from "../assets/code.svg";

function Simple() {
  return (
    <div>
      <div className="flex items-center gap-[163px] px-40 simple:flex-col simpletext:px-0 simpletext:text-center simpletext:gap-0 mb-20">
        <div>
          <p className="text-[36px] font-custom font-normal leading-[43.2px] text-[#fff] mb-4 simpletext:mb-8 simpletext:text-[40px]">
            Simple and convenient <br className="simpletext:hidden"/> APIs
          </p>
          <p className="text-desc font-custom font-normal text-[14px] mb-4">
            Built from the ground-up for interoperable authentication.
          </p>
          <p className="text-desc font-custom font-normal text-sm leading-5 mb-[80px]">
            Fast and easy to implement using our powerful library clients.{" "}
            <br /> Asset optimization and image transformation coming soon!
          </p>

          <div className="flex gap-[120px] simpletext:flex-col simpletext:justify-center simpletext:items-center simpletext:gap-15">
            <div className="simpletext:text-center">
              <img src={wifi} alt="" className="mb-4 simpletext:m-0 simpletext:m-auto simpletext:mb-4" />
              <p className="text-[#fff] font-custom text-[18px] mb-4">
                CDN integration
              </p>
              <p className="text-desc font-custom text-sm mb-5">
                Serve from the edge to <br/> reduce latency.
              </p>
              <button className="text-[#4299E1] text-xs font-custom bg-[#3182CE1A] w-[97px] h-5 rounded-[10px]">
                Coming soon
              </button>
            </div>
            <div>
              <img src={markup} alt="" className="mb-4 simpletext:m-0 simpletext:m-auto simpletext:mb-4"/>
              <p className="text-[#fff] text-sm font-custom leading-[28px] mb-5">Auto transformation & <br /> optimisation</p>
              <p className="text-desc text-sm font-custom mb-5">Resize and compress your <br /> media before you serve it.</p>
              <button className="text-[#4299E1] text-xs font-custom bg-[#3182CE1A] w-[97px] h-5 rounded-[10px]">
                Coming soon
              </button>
            </div>
          </div>
        </div>
        <div>
          <img src={code} alt="" className="pt-32"/>
        </div>
      </div>
    </div>
  );
}

export default Simple;
