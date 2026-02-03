import React from "react";

const Footer = () => {
  return (
    <div className="">
      <footer className="footer sm:footer-horizontal footer-center bg-base-200 text-base-content p-2">
        <aside>
          <p className="text-sm text-gray-500">
            Copyright © {new Date().getFullYear()} - All right reserved by <a href="https://www.facebook.com/yalog.dev" target="blank" className="font-bold cursor-pointer hover:underline">Yalog & Elina</a>
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
