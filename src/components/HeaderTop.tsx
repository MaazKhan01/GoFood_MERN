import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

const HeaderTop = () => {
  return (
    <div className="border-b border-gray-200 hidden sm:block">
      <div className="container py-4">
        <div className="justify-between flex items-center ">
          <div className="hidden lg:flex gap-1">
            <div className="header_top_icon_wrapper">
              <BsFacebook />
            </div>
            <div className="header_top_icon_wrapper">
              <BsTwitter />
            </div>
            <div className="header_top_icon_wrapper">
              <BsInstagram />
            </div>
            <div className="header_top_icon_wrapper">
              <BsLinkedin />
            </div>
          </div>
          <div className="text-gray-500 text-[12px]">
            <b>FREE SHOPPING</b> THIS WEEK ORDER OVER -$ 55
          </div>
          <div className="flex gap-4">
            <select
              className="text-gray-500 text-[12px] w-[70px]"
              name="currency"
              id="currency"
            >
              <option value="US $">US $</option>
              <option value="EU €">EU €</option>
              <option value="PKR">PKR</option>
            </select>
            <select
              className="text-gray-500 text-[12px] w-[70px]"
              name="language"
              id="language"
            >
              <option value="EN">English</option>
              <option value="URDU">Urdu </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
