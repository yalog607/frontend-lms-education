import { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import avatarImg from "../assets/images/icon.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isHide, setIsHide] = useState(true);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const haveValue = (content) => {
    return content && content.trim().length > 0;
  };
  return (
    <div>
      <Helmet>
        <title>Login | Yalina</title>
      </Helmet>

      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-50 px-4 sm:px-8 lg:px-16">
        <div className="avatar cursor-pointer" onClick={handleLogoClick}>
          <div className="ring-primary ring-offset-base-100 w-18 rounded-full ring-2 ring-offset-2">
            <img src={avatarImg} />
          </div>
        </div>

        <h1 className="font-bold text-2xl my-2 text-indigo-700 text-shadow-md">
          Login
        </h1>

        <div className="bg-base-200 p-6 rounded-lg shadow-lg shadow-indigo-300 border border-indigo-200 w-full md:max-w-3/4 mt-6">
          <div className="flex w-full">
            <div className="w-full md:max-w-1/2 flex flex-col gap-4">
              <div className="w-full flex flex-col items-center justify-center px-16 mb-4">
                <label
                  className="block font-bold text-sm self-start text-gray-500"
                  htmlFor="username"
                >
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  className={`px-4 py-2 border border-gray-300 rounded-lg w-full mt-1 font-semibold text-md ${haveValue(username) ? "border-green-500 outline-green-500" : "border-gray-300"}`}
                />
              </div>
              <div className="w-full flex flex-col items-center justify-center px-16 relative">
                <div className="w-full flex justify-between items-center">
                  <label
                    className="block font-bold text-sm self-start text-gray-500"
                    htmlFor="password"
                  >
                    Password:
                  </label>
                  <label className="label">
                    Hide
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm"
                      checked={isHide}
                      onChange={() => setIsHide(!isHide)}
                    />
                  </label>
                </div>
                <input
                  type={isHide ? "password" : "text"}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className={`px-4 py-2 border border-gray-300 rounded-lg w-full mt-1 font-semibold text-md ${haveValue(password) ? "border-green-500 outline-green-500" : "border-gray-300"}`}
                />
              </div>
              <div className="w-full flex flex-col items-center justify-center px-16">
                <button className="btn mt-4 w-full bg-indigo-500 text-base-100 font-bold py-2 px-4 rounded-xl hover:bg-indigo-600 transition-colors duration-250">
                  Login
                </button>
              </div>
              <p className="w-full  text-center text-sm text-gray-500 font-semibold">
                Secure login with{" "}
                <span className="font-bold">Google Term & Privacy</span>
              </p>
            </div>
            <div className="hidden md:flex divider divider-horizontal text-xs font-bold">
              OR
            </div>
            <div className="w-full md:max-w-1/2 grow mt-6 md:mt-0 flex flex-col justify-center gap-4 px-24">
              {/* Google */}
              <button className="btn rounded-full hover:drop-shadow-lg transition-all duration-250 bg-white text-black border-[#e5e5e5]">
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
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
                Login with Google
              </button>

              {/* Facebook */}
              <button className="btn rounded-full hover:drop-shadow-lg transition-all duration-250 bg-[#1A77F2] text-white border-[#005fd8]">
                <svg
                  aria-label="Facebook logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="white"
                    d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"
                  ></path>
                </svg>
                Login with Facebook
              </button>

              <button className="btn rounded-full hover:drop-shadow-lg transition-all duration-250 bg-black text-white border-black">
                <svg
                  aria-label="GitHub logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                  ></path>
                </svg>
                Login with GitHub
              </button>

              <button className="btn rounded-full hover:drop-shadow-lg transition-all duration-250 bg-[#2F2F2F] text-white border-black">
                <svg
                  aria-label="Microsoft logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M96 96H247V247H96" fill="#f24f23"></path>
                  <path d="M265 96V247H416V96" fill="#7eba03"></path>
                  <path d="M96 265H247V416H96" fill="#3ca4ef"></path>
                  <path d="M265 265H416V416H265" fill="#f9ba00"></path>
                </svg>
                Login with Microsoft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
