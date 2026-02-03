import { useState } from "react";
import { useNavigate } from "react-router-dom";
import avatarImg from "../assets/images/icon.png";
import Footer from "../Components/Footer";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash  } from "react-icons/fa";

const hasValue = (content) => {
  return content && content.trim().length > 0;
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHide, setIsHide] = useState(true);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const { login, isLoggingIn } = useAuth();

  const handleLoginButtonClick = () => {
    if (!email || !password){
      toast.error('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    const data = { email: email, password };
    login(data);
  };

  return (
    <div>
      <title>Login Page | Yalina</title>

      <div className="h-screen w-full flex flex-col items-center justify-center bg-zinc-50 px-3 sm:px-6 lg:px-8">
        <div className="avatar cursor-pointer" onClick={handleLogoClick}>
          <div className="ring-primary ring-offset-base-100 w-16 sm:w-18 rounded-full ring-2 ring-offset-2">
            <img src={avatarImg} />
          </div>
        </div>

        <h1 className="font-bold text-xl sm:text-2xl md:text-3xl my-3 sm:my-4 text-indigo-700 text-shadow-md">
          Welcome to{" "}
          <span className="bg-linear-to-r from-rose-600 to-rose-400 text-transparent bg-clip-text hover:from-rose-700 hover:to-rose-500 transition-colors duration-100">
            Yalina
          </span>
        </h1>

        <div className="bg-base-200 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg shadow-indigo-300 border border-indigo-200 w-full max-w-full sm:max-w-2xl md:max-w-4xl mt-4 sm:mt-6">
          <div className="flex flex-col md:flex-row w-full gap-4 md:gap-0">
            {/* Left Side - Login Form */}
            <div className="w-full md:w-1/2 flex flex-col gap-3 sm:gap-4 px-4 sm:px-6 md:px-8">
              <div className="w-full flex flex-col mb-2 sm:mb-4">
                <label
                  className="block font-bold text-xs sm:text-sm text-gray-500 mb-2"
                  htmlFor="email"
                >
                  Email:
                </label>
                <input
                  placeholder="Enter your email"
                  type="email"
                  required
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className={`px-3 sm:px-4 py-2 border border-gray-300 rounded-lg w-full font-semibold text-sm sm:text-md focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition ${hasValue(email) ? "border-green-500 outline-green-500" : "border-gray-300"}`}
                />
              </div>
              <div className="w-full flex flex-col relative">
                <div className="w-full flex justify-between items-center mb-2">
                  <label
                    className="block font-bold text-xs sm:text-sm text-gray-500"
                    htmlFor="password"
                  >
                    Password:
                  </label>
                  <button className="cursor-pointer text-lg hover:text-indigo-800 duration-300" onClick={() => setIsHide(!isHide)}>
                    {isHide ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <input
                  placeholder="Enter your password"
                  type={isHide ? "password" : "text"}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className={`px-3 sm:px-4 py-2 border border-gray-300 rounded-lg w-full font-semibold text-sm sm:text-md focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition ${hasValue(password) ? "border-green-500 outline-green-500" : "border-gray-300"}`}
                />
              </div>
              <div className="w-full">
                <button
                  onClick={handleLoginButtonClick}
                  className={`outline-none btn drop-shadow-md w-full mt-3 sm:mt-4  text-white font-bold py-2 px-4 rounded-xl hover:bg-indigo-600 transition-colors duration-250 text-sm sm:text-base bg-indigo-500`}
                  disabled = {isLoggingIn}
                >
                  {!isLoggingIn ? "Log in" : <span className="loading loading-spinner loading-md"></span>}
                </button>
              </div>

              <p className="text-center text-sm mt-2">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-indigo-500 hover:text-indigo-700 font-semibold cursor-pointer"
                >
                  Sign up
                </button>
              </p>
            </div>

            {/* Divider */}
            <div className="divider md:hidden m-0 text-xs font-bold my-2 text-gray-500">
              Or log in with
            </div>
            <div className="hidden md:flex divider divider-horizontal m-0 text-xs font-bold text-gray-500">
              OR
            </div>

            {/* Right Side - Social Login */}
            <div className="w-full md:w-1/2 flex flex-col justify-center gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 md:py-0 py-4">
              {/* Google */}
              <button className="btn btn-sm sm:btn-md rounded-full hover:drop-shadow-lg transition-all duration-250 bg-white text-black border border-gray-300 font-medium text-xs sm:text-sm md:text-base">
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                <span className="">Google</span>
              </button>

              {/* Facebook */}
              <button className="btn btn-sm sm:btn-md rounded-full hover:drop-shadow-lg transition-all duration-250 bg-[#1A77F2] text-white font-medium text-xs sm:text-sm md:text-base border-[#005fd8]">
                <svg
                  aria-label="Facebook logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                >
                  <path
                    fill="white"
                    d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"
                  ></path>
                </svg>
                <span className="">Facebook</span>
              </button>

              {/* GitHub */}
              <button className="btn btn-sm sm:btn-md rounded-full hover:drop-shadow-lg transition-all duration-250 bg-black text-white font-medium text-xs sm:text-sm md:text-base border-black">
                <svg
                  aria-label="GitHub logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                >
                  <path
                    fill="white"
                    d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                  ></path>
                </svg>
                <span className="">GitHub</span>
              </button>

              {/* Microsoft */}
              <button className="btn btn-sm sm:btn-md rounded-full hover:drop-shadow-lg transition-all duration-250 bg-[#2F2F2F] text-white font-medium text-xs sm:text-sm md:text-base border-black">
                <svg
                  aria-label="Microsoft logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                >
                  <path d="M96 96H247V247H96" fill="#f24f23"></path>
                  <path d="M265 96V247H416V96" fill="#7eba03"></path>
                  <path d="M96 265H247V416H96" fill="#3ca4ef"></path>
                  <path d="M265 265H416V416H265" fill="#f9ba00"></path>
                </svg>
                <span className="">Microsoft</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Login;
