import React from "react";

const Footer = () => {
  return (
      <div className="flex p-2 text-md bg-base-300 items-center justify-center">
          <p className="text-sm text-gray-700">
            Copyright © 2026-{new Date().getFullYear()} - All right reserved by <a href="https://www.facebook.com/yalog.dev" target="blank" className="font-bold cursor-pointer hover:underline">Yalog & Elina</a>
          </p>
      </div>
  );
};

export default Footer;
