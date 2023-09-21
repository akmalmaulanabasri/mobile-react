import axios from "axios";
import React, { useEffect, useState } from "react";
import Order from "./Order";
import { useNavigate } from "react-router-dom";

function Home() {
  const Navigate = useNavigate();
  const [user, setUser] = useState({
    name: "user",
    email: "",
    role: "",
  });
  const apiUrl = "https://be.wikrama.shop/api/v1";
  const handleLogout = () => {
    sessionStorage.removeItem("auth_token");
    window.location.reload();
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/auth/me`, {
        headers: {
          "auth-token": sessionStorage.getItem("auth_token"),
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.status === 401) {
          sessionStorage.removeItem("auth_token");
          window.location.reload();
          console.log("401");
        }
      });
    console.log(user);
  }, []);
  return (
    <>
      <div className="p-5 container h-[200px]  bg-gradient-to-r from-indigo-600 to-blue-400 rounded-bl-[20px] rounded-br-[20px]">
        <h1 className="text-2xl text-white">Hello, Admin</h1>
        <h1 className="text-1xl text-white">Transaksi hari ini</h1>
        <h1 className="text-5xl text-white mt-3 font-extrabold">Rp50.000</h1>

        <div className="w-[100%] flex items-center justify-evenly h-[68px] relative bg-white rounded-[10px] shadow translate-y-[50%]">
          <div className="text-center text-blue-800 text-[11px] font-medium">
            Top Up
          </div>
          <div
            className="text-center text-blue-800 text-[11px] font-medium"
            onClick={() => Navigate("/order")}
          >
            New Order
          </div>
          <div className="text-center text-blue-800 text-[11px] font-medium">
            Account
          </div>
        </div>
      </div>

      <div className="container shado">
        <div className="border-b flex justify-between items-center px-3 py-5 bg-white w-100 mt-16 rounded-t-[26px] border h-[100%]">
          <h1 className="text-xl">Recent Transaction</h1>
          <h1 className="text-md">See All</h1>
        </div>
        <div className="p-3">
          <span className="text-md">Today</span>
          <Order />
        </div>
      </div>
    </>
  );
}

export default Home;
