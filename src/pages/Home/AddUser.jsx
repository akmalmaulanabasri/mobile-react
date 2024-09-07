import axios from "axios";
import React, { useEffect, useState } from "react";
import User from "./User";
import { useNavigate } from "react-router-dom";
import {
  MdLogout,
  MdOutlineLogin,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import Swal from "sweetalert2";

function Home() {
  const Navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const apiUrl = "https://api-karyawan.dytech.my.id/api";

  const saveUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const nik = e.target.nik.value;
    const password = e.target.nik.value;

    axios
      .post(`${apiUrl}/users`, {
        name: name,
        email: email,
        nik: nik,
        password: password,
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data karyawan berhasil ditambahkan",
        });
        Navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
        });
      });
  };

  return (
    <>
      <div className="p-5 container h-[100px]  bg-gradient-to-r from-indigo-600 to-blue-400">
        <h1 className="text-2xl text-white">Hello, Admin</h1>
        <h1 className="text-1xl text-white">Selamat datang di PT DYTECH</h1>
      </div>

      <div className="container shado">
        <div className="border-b flex justify-between items-center px-3 py-5 bg-white w-100 mt-8 rounded-t-[26px] border h-[100%]">
          <h1 className="text-xl">Tambah karyawan</h1>
        </div>
        <form onSubmit={saveUser} className="p-3">
          <div className="flex flex-col">
            <label htmlFor="name">Nama</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Silahkan masukkan nama karyawan"
              className="border border-black rounded-md p-1 w-full mt-1"
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Silahkan masukkan email karyawan"
              className="border border-black rounded-md p-1 w-full mt-1"
            />
          </div>
          <div className="flex flex-col mt-3">
            <label htmlFor="nik">NIK</label>
            <input
              type="text"
              name="nik"
              id="nik"
              placeholder="Silahkan masukkan NIK karyawan"
              className="border border-black rounded-md p-1 w-full mt-1"
            />
          </div>

          <input
            type="submit"
            className="bg-blue-500 px-2 py-1 rounded-md mt-3 text-white text-center"
            value={"Simpan"}
          />
        </form>
      </div>
    </>
  );
}

export default Home;
