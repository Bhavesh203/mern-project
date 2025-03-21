import React from "react";
import Subscribe from "./Subscribe";

const Footer = () => {
  return (
    <>
      <div>
        <Subscribe />
        <div className="container">
          <div className="flex justify-between py-6">
            <ul>
              <p className="font-bold uppercase border-b-2">Customer Care</p>
            </ul>
            <ul>
              <p className="font-bold uppercase border-b-2">About Us</p>
            </ul>
            <ul>
              <p className="font-bold uppercase border-b-2">Categories</p>
            </ul>
            <ul>
              <p className="font-bold uppercase border-b-2">Leagal</p>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-black text-[#C8A96A] p-2 text-center">
        Copyright © 2013-present Dolphin Web Solution, Inc. All rights reserved.
      </div>
    </>
  );
};

export default Footer;
