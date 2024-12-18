import React from "react";

import frame2 from '../assets/Frame (2).svg'
import git from '../assets/git.svg'
import supabase from '../assets/Rectangle.svg'

function Sleek() {
  return (
    <div>
      <section className="px-[160px] for:px-0 mb-48">
        <div className="">
          <p className="text-[#fff] text-[48px] font-custom font-normal leading-[57.6px] mb-[16px] textsmall:text-center verysmall:text-[40px] verysmall:px-4">
            Sleek dashboard for managing your media
          </p>
        </div>

        <div className="">
          <p className="text-[#E0E0E0] text-[18px] font-custom font-normal mb-[16px] textsmall:text-center verysmall:px-2">
            A complete Object Explorer so that any of your team can use.
          </p>
        </div>
        <div className="">
          <p className="font-custom text-[#E0E0E0] text-[14px] mb-[64px] textsmall:text-center int:px-2">
            Drag and drop uploading, moving objects, and multiple object
            selection. As easy as working on your desktop.
          </p>
        </div>

        <div className="flex gap-[187px] img:flex-col img:items-center img:text-center verysmall:gap-20">
          <div className="">
            <img src={frame2} alt="" className='verysmall:w-full' />
          </div>

          <div>
            <p className="text-[#fff] text-[17px] font-normal font-custom mb-[16px] verysmall:text-[25px] ">
              File Preview
            </p>
            <p className="text-[#E0E0E0] text-[16px] font-custom font-normal mb-[48px] verysmall:px-2">
              Preview any media type, including video and <br className="verysmall:hidden"/>
              audio.
            </p>

            <p className="text-[18px] text-[#fff] font-custom font-normal mb-[16px]">
              Check out our example app
            </p>

            <div className="w-[373px] verysmall:w-full h-[175px] px-[21px] py-[21px] mb-[21px] bg-[#1f1f1f]">
              <p className="text-[#fff] font-custom mb-[14px] font-normal text-[18px]">
                Profile management example
              </p>
              <p className="leading-[20px] text-[14px] mb-[16px] text-[#E0E0E0] font-custom font-normal">
                Update a user account with public profile <br />
                information, including uploading a profile image.
              </p>
              <p className="text-[#fff] font-custom font-normal text-[14px] flex gap-[10px]">
                Created by: <img src={supabase} alt="" /> supabase
              </p>
            </div>

            <div className="px-[25px]">
              <p className="text-desc font-custom font-normal mb-[12px] flex gap-[10px">
                nextjs-ts-user-management <img src={git} alt="" className="px-[10px]"/>
              </p>
              <button className="flex items-center bg-[#1374EF] text-[#fff] border-none w-[100px] h-[35px] text-[14px] rounded-[8px] cursor-pointer mb-[21px] font-custom justify-center">
                <span className="icon mr-[10px]">▲</span>
                <span className="text font-custom text-[14px] font-normal text-center">
                  Deploy
                </span>
              </button>
            </div>
            <hr className="border-[#1f1f1f] border=[1px] border-solid" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sleek;
