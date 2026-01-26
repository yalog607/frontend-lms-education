import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  let cssText =
    "px-4 py-2 rounded-md text-rose-400 hover:text-rose-600 transition-colors duration-150";
  let activeLink =
    "px-4 py-2 rounded-md text-rose-400 hover:text-rose-600 hover:decoration-rose-500 transition-colors duration-150 underline decoration-rose-400 decoration-2 underline-offset-4";

  return (
    <div className="w-full bg-base-200 p-3 md:p-4 text-gray-800 font-bold flex flex-row justify-between md:justify-around items-center shadow-md px-4 md:px-6">
      <div className="cursor-pointer">
        <h1
          className="font-bold text-4xl bg-linear-to-r from-rose-600 to-rose-400 text-transparent bg-clip-text hover:from-rose-700 hover:to-rose-500 transition-colors duration-100"
          onClick={handleLogoClick}
        >
          Yalina
        </h1>
      </div>

      <div className="hidden lg:flex lg:justify-around w-2/5 gap-4 text-rose-400">
        <NavLink
          exact
          to="/"
          className={({ isActive }) => (isActive ? activeLink : cssText)}
        >
          Home
        </NavLink>
        <NavLink
          exact
          to="/login"
          className={({ isActive }) => (isActive ? activeLink : cssText)}
        >
          About Us
        </NavLink>
        <NavLink
          exact
          to="/login"
          className={({ isActive }) => (isActive ? activeLink : cssText)}
        >
          Contact
        </NavLink>
      </div>

      <div className="lg:justify-between hidden lg:flex gap-4">
        <button
          onClick={handleLoginClick}
          className="btn px-12 py-1 rounded-lg border-rose-500 bg-rose-50 text-rose-500 hover:bg-rose-600 hover:text-base-100 transition-colors duration-300"
        >
          Login
        </button>
        <button
          onClick={handleRegisterClick}
          className="btn px-12 py-1 rounded-lg bg-rose-500 text-base-100 hover:bg-rose-600 transition-colors duration-300"
        >
          Sign up
        </button>
      </div>

      <div className="lg:hidden">
        <button
          className="btn btn-square btn-ghost"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            {" "}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>{" "}
          </svg>
        </button>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 backdrop-blur z-30 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 min-h-screen w-64 bg-rose-50 shadow-lg z-40 transform transition-all duration-300 ease-out ${isMenuOpen ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0"} lg:hidden`}
      >
        <div className="p-6">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="btn btn-sm btn-ghost mb-6"
          >
            ✕
          </button>

          <nav className="flex flex-col gap-4">
            <NavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition-colors duration-150 ${isActive ? "bg-rose-400 text-white" : "text-gray-800 hover:bg-rose-100"}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition-colors duration-150 ${isActive ? "bg-rose-400 text-white" : "text-gray-800 hover:bg-rose-100"}`
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition-colors duration-150 ${isActive ? "bg-rose-400 text-white" : "text-gray-800 hover:bg-rose-100"}`
              }
            >
              Contact
            </NavLink>

            <div className="divider my-4"></div>

            <button
              onClick={handleLoginClick}
              className="btn btn-outline border-rose-400 text-rose-400 hover:bg-rose-400 hover:text-white"
            >
              Login
            </button>
            <button
              onClick={handleRegisterClick}
              className="btn btn-outline border-rose-400 text-rose-400 hover:bg-rose-400 hover:text-white"
            >
              Sign up
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
