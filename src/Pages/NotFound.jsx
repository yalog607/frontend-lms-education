import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <title>
        404 Not Found
      </title>
      <div className="h-screen w-full flex flex-col gap-4 bg-base-300 justify-center items-center p-6">
        <p className="font-mono text-lg text-secondary">
          404 Not Found
        </p>
        <h1 className="font-display font-semibold text-4xl text-gray-800">
          Oops! Page Not Found
        </h1>
        <p className="text-lg text-gray-700 font-mono">
          The page you are looking for doesn't exist. Click the below button to
          go to the previous page.
        </p>
        <button onClick={() => navigate(-1)} className="btn btn-secondary">
          Go back
        </button>
      </div>
    </>
  );
};

export default NotFound;
