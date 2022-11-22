import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [dataLogin, setdataLogin] = useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    const { username, password } = dataLogin;

    if (!username || !password) {
      toast.error("username/password is required!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }


  };

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="w-[500px] p-8 rounded-xl bg-gray-500 bg-opacity-10">
        <div className="flex flex-col py-2">
          <label className="uppercase text-sm py-2" htmlFor="username">
            Username <span className="text-red-600">*</span>
          </label>
          <input
            className="border-2 rounded-lg p-3 flex border-gray-300 focus:outline-0"
            type="text"
            id="username"
            name="username"
            required
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="uppercase text-sm py-2" htmlFor="password">
            Password <span className="text-red-600">*</span>
          </label>
          <input
            className="border-2 rounded-lg p-3 flex border-gray-300 focus:outline-0"
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <button onClick={handleLogin} className="w-full p-4 text-gray-100 mt-4">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
