import axios from "axios";
import Swal from "sweetalert2";
import React, { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const handleLogin = () => {
    const apiUrl = "https://be.wikrama.shop/api/v1";
    console.log(apiUrl);

    Toast.fire({
      icon: "success",
      title: "Please Wait",
      timer: 5000,
    });
    axios
      .post(`${apiUrl}/auth/login`, {
        email,
        password,
      })
      .then((res) => {
        if (res.data.code === 200) {
          sessionStorage.setItem("auth_token", res.data.data.auth_token);

          Toast.fire({
            icon: "success",
            title: "Signed in successfully",
            timer: 2000,
          });

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          Toast.fire({
            icon: "error",
            title: "Signed in failed",
            timer: 2000,
          });
        }
      })
      .catch((err) => {
        console.log(err.response);
        Toast.fire({
          icon: "error",
          title: err.response.data.message,
        });
      });
  };

  console.log();
  return (
    <>
      <div className="">
        <div className="container px-5 py-10">
          <img
            src="https://smkwikrama.sch.id/assets2/wikrama-logo.png"
            className="w-[90px]"
            alt=""
          />
          <div className="w-[200px] text-blue-800 text-4xl font-semibold">
            Sign in to E-Canteen
          </div>
          <div className="w-[80px] h-[10px] mt-5 bg-gradient-to-r from-blue-800 to-blue-400 rounded-[30px]" />

          <form action="">
            <input
              type="text"
              placeholder="Username"
              className="mt-10 bg-gray-200 text-black w-[100%] h-[50px] rounded-[10px] px-5"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="mt-3 bg-gray-200 text-black w-[100%] h-[50px] rounded-[10px] px-5"
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="button"
              value={"Login"}
              className="cursor-pointer mt-10 bg-gradient-to-r from-indigo-600 to-blue-500 text-white w-[100%] h-[50px] rounded-[21px] px-5"
              onClick={() => handleLogin()}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
