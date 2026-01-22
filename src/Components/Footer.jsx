import React from "react";

const Footer = () => {
  return (
    <div className="">
      <footer className="footer sm:footer-horizontal footer-center bg-base-200 text-base-content p-2">
        <aside>
          <p className="text-sm text-gray-500">
            Copyright © {new Date().getFullYear()} - All right reserved by <span className="font-bold">Yalog & Elina</span>
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
