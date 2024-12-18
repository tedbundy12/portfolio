import React from "react";

import logo from "../assets/logo.svg";
import twitter from "../assets/twitter.svg";
import git from "../assets/git-footer.svg";

function Footer() {
  return (
    <div className="px-[160px] large:px-0 flex justify-center p:">
      <div className="flex gap-[224px] textsmall:gap-[100px]">
        <div className="p:hidden">
          <img src={logo} alt="" className="w-[160px] h-[31px] mb-8" />

          <div className="flex gap-[24px]">
            <img src={twitter} alt="" />
            <img src={git} alt="" />
          </div>
        </div>

        <div className="flex gap-[140px] l:gap-[100px] u:flex-wrap u:justify-center">
          <div className="">
            <p className="font-custom font-normal text-[15px] text-[#666666] mb-[16px]">Product</p>
            <p className="text-[#fff] font-custom font-normal text-[14px] mb-3">Database</p>
            <p className="text-[#fff] font-custom font-normal text-[14px] mb-3">Authentication</p>
            <p className="text-[#fff] font-custom font-normal text-[14px] mb-3">Storage</p>
            <p className="text-[#fff] font-custom font-normal text-[14px] mb-1">Functions</p>
            <p className="text-[#BBBBBB] font-custom font-normal text-[14px] mb-3">Coming soon</p>
            <p className="text-[#fff] font-custom font-normal text-[14px] mb-3">Pricing</p>
          </div>
          <div className="">
            <p className="font-custom font-normal text-[15px] text-[#666666] mb-[16px]">Resources</p>
            <p className="text-[#fff] font-custom font-normal text-[14px] mb-3">Support</p>
            <p className="text-[#fff] font-custom font-normal text-[14px] mb-3">Case Studies</p>
            <p className="text-[#fff] font-custom font-normal text-[14px] mb-3">System Status</p>
            <p className="text-[#fff] font-custom font-normal text-[14px] mb-3">Terms of service</p>
          </div>
          <div className="">
            <p className="font-custom font-normal text-[15px] text-[#666666] mb-[16px]">Developers</p>
            <p className="text-[#fff] font-custom font-normal text-[14px] mb-3">Documentation</p>
            <p className="text-[#fff] font-custom font-normal text-[14px] mb-3">API Reference</p>
            <p className="text-[#fff] font-custom font-normal text-[14px] mb-3">Guides</p>
          </div>
          <div className="">
            <p className="font-custom font-normal text-[15px] text-[#666666] mb-[16px]">Company</p>
            <p className="text-[#fff] font-custom font-normal text-[14px] mb-3">Blog</p>
            <p className="text-[#fff] font-custom font-normal text-[14px] mb-3">Open Source</p>
            <p className="text-[#fff] font-custom font-normal text-[14px] mb-3">Humans.txt</p>
            <p className="text-[#fff] font-custom font-normal text-[14px] mb-3">Lawyers.txt</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
