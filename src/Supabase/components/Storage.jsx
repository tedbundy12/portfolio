import React from "react";

import trash from "../assets/trash.svg";
import frame from "../assets/Frame.svg";
import int from "../assets/int.svg";
import x from "../assets/x.svg";
import key from "../assets/key.svg";
import burg from "../assets/burg.svg";

function Storage() {
  return (
    <div>
      <section className="flex items-center justify-center mb-[96px]">
        <div className="centryzing flex gap-x-[39px] first:flex-col">
          <div className="left">
            <div className="storage flex items-center gap-x-[12px] mb-[28px] for:justify-center">
              <img src={trash} alt="" />
              <p className="text-[#fff] font-custom text-[16px] font-normal">
                Storage
              </p>
            </div>
            <div className="store mb-[52px]">
              <p className="font-bold text-[#fff] text-[48px] leading-[57px] for:text-center small:text-[40px]">
                Store and serve <br />
                any type of digital content
              </p>
            </div>
            <div className="small-cont">
              <p className="text-[#E0E0E0] text-[14px] font-normal font-custom mb-[21px] leading-[28px] for:text-center small:px-2">
                An open source Object store service with unlimited scalability,
                for <br className="for:hidden"/>
                any file type.
              </p>
              <p className="text-[#E0E0E0] text-[14px] font-custom font-normal mb-[64px] leading-[28px] for:text-center for:px-4">
                With custom policies and permissions that are familiar and easy
                to
                <br className="for:hidden"/>
                implement.
              </p>
            </div>
            <div className="ml-[20px] for:flex for:justify-center for:ml-0">
              <button className="rounded text-[14px] bg-button-green text-[#fff] font-custom px-[17px] w-[133px] h-[38px] [#fff]space-nowrap mb-[80px]">
                Start a project
              </button>
            </div>
          </div>

          <div className="right">
            <img src={frame} alt="" />
          </div>
        </div>
      </section>

      <section class="flex items-center px-[160px] gap-x-[160px] int:px-0 int:flex-col int:items-center for:justify-center for:px-[0px] int:space-y-[80px] mb-[170px] verysmall:mb-30">
        <div class="intt int:flex-grow">
          <div class="flex items-center gap-x-[8px] mb-[18px]">
            <img src={int} alt="" />
            <img src={x} alt="" />
            <img src={key} alt="" />
            <img src={x} alt="" />
            <img src={burg} alt="" />
          </div>
          <p class="text-[#fff] font-normal text-[18px] font-custom mb-[24px]">
            Interopable
          </p>
          <p class="text-[#E0E0E0] font-custom font-normal text-[16px] leading-[28px]">
            Integrates well with the rest of <br />
            Supabase ecosystem, including
            <br />
            Auth and Postgres.
          </p>
        </div>

        <div class="lighting int:flex-grow">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            class="mb-[16px]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 17.5V8.75"
              stroke="#A2A2A2"
              stroke-width="0.875"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.75 17.5V3.5"
              stroke="#A2A2A2"
              stroke-width="0.875"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.25 17.5V14"
              stroke="#A2A2A2"
              stroke-width="0.875"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p class="font-custom font-normal text-[#fff] text-[18px] mb-[24px]">
            Lighting fast
          </p>
          <p class="text-[#E0E0E0] font-custom font-normal text-[16px] leading-[28px]">
            Thin API server layer that <br />
            leverages Postgres' permissions <br />
            and performance.
          </p>
        </div>

        <div class="depend int:flex-grow">
          <svg
            width="21"
            height="21"
            class="mb-[16px]"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.875 9.625L10.5 12.25L19.25 3.5"
              stroke="#A1A1A1"
              stroke-width="0.875"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M18.375 10.5V16.625C18.375 17.0891 18.1906 17.5342 17.8624 17.8624C17.5342 18.1906 17.0891 18.375 16.625 18.375H4.375C3.91087 18.375 3.46575 18.1906 3.13756 17.8624C2.80937 17.5342 2.625 17.0891 2.625 16.625V4.375C2.625 3.91087 2.80937 3.46575 3.13756 3.13756C3.46575 2.80937 3.91087 2.625 4.375 2.625H14"
              stroke="#A1A1A1"
              stroke-width="0.875"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <p class="font-custom font-normal text-[#fff] text-[18px] mb-[24px]">
            Dependable
          </p>
          <p class="text-[#E0E0E0] font-custom font-normal text-[16px] leading-[28px]">
            Thin API server layer that <br />
            leverages Postgres' permissions <br />
            and performance.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Storage;
