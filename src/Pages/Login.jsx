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
    navigate('/');
  }

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

        <h1 className="font-bold text-2xl my-2 text-indigo-700 text-shadow-md">Login</h1>

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
              <p className="w-full mt-24 text-center text-sm text-gray-500 font-semibold">Secure login with <span className="font-bold">Google Term & Privacy</span></p>
            </div>
            <div className="hidden md:flex divider divider-horizontal text-xs font-bold">OR</div>
            <div className="w-full md:max-w-1/2 grow mt-6 md:mt-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
