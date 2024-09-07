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

  useEffect(() => {
    axios
      .get(`${apiUrl}/users`)
      .then((res) => {
        setUsers(res.data.data);
        console.log(users);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
        });
      });
  }, []);
  return (
    <>
      <div className="p-5 container h-[100px]  bg-gradient-to-r from-indigo-600 to-blue-400">
        <h1 className="text-2xl text-white">Hello, Admin</h1>
        <h1 className="text-1xl text-white">Selamat datang di PT DYTECH</h1>
      </div>

      <div className="container shado">
        <div className="border-b flex justify-between items-center px-3 py-5 bg-white w-100 mt-8 rounded-t-[26px] border h-[100%]">
          <h1 className="text-xl">Data karyawan</h1>
          <h1
            className="text-md bg-blue-400 px-2 py-1 rounded-md text-white"
            onClick={() => Navigate("/addUser")}
          >
            Tambah karyawan baru
          </h1>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-6 text-left">Nama</th>
              <th className="py-3 px-6 text-left">NIK</th>
              <th className="py-3 px-6 text-center">Email</th>
              <th className="py-3 px-6 text-center">Detail</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr>
                  <td className="py-3 px-6 text-left">{user.name}</td>
                  <td className="py-3 px-6 text-left">{user.nik}</td>
                  <td className="py-3 px-6 text-center">{user.email}</td>
                  <td
                    className="py-3 px-6 text-center flex justify-center cursor-pointer"
                    onClick={() => Navigate("/detailUser/" + user.id)}
                  >
                    <MdOutlineRemoveRedEye size={20} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
