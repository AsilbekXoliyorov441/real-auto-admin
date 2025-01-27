import React, { useEffect, useState } from "react";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();
  const token = localStorage.getItem("TOKEN");
  const [message] = localStorage.getItem("Message");

  const navigate = useNavigate();

  console.log(number, password);

  const login = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://realauto.limsa.uz/api/auth/signin",
        {
          phone_number: number,
          password: password,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      localStorage.setItem("TOKEN", data.data.tokens.accessToken.token);
      localStorage.setItem("Message", data.success);

      console.log(data.message);

      console.log(data.data.tokens.accessToken.token, data.success);

      if(data.data.tokens.accessToken.token && data.success) {
        navigate("/dashboard")
      }else{
        navigate("login")
      }
    } catch (error) {
      console.error("Login xatosi:", error.response?.data || error.message);
    }
  };



  return (
    <div className="flex flex-col items-center justify-center h-[100vh] px-[20px]">
      <form
        className="flex flex-col  p-[30px] bg-blue-950 rounded-[8px] max-w-[468px] w-full"
        onSubmit={login}
      >
        <h1 className="text-center text-[48px] font-bold mb-[30px] text-white">
          Login
        </h1>
        <label
          className="mb-[2px] cursor-pointer text-white text-[18px] font-bold"
          htmlFor="username"
        >
          Username
        </label>
        <input
          id="username"
          className="outline-none border mb-[15px] bg-white border-white rounded-[2px] p-[5px] text-[18px] w-full text-blue-950"
          onChange={(e) => setNumber(e.target.value)}
          type="number"
          placeholder="Raqam kiriting"
        />
        <label
          className="mb-[2px] cursor-pointer text-white text-[18px] font-bold"
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
          className="outline-none mb-[40px] border bg-white border-white rounded-[2px] p-[5px]  text-blue-950 text-[18px] w-full"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password kiriting"
        />
        <button
          className="outline-none border cursor-pointer bg-orange-600 border-white rounded-[2px] p-[5px] text-white text-[18px] w-full mb-[30px]"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
