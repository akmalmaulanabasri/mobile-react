import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MdArrowBack,
  MdCheck,
  MdLogout,
  MdOutlineLogin,
  MdOutlineThumbUp,
} from "react-icons/md";
import Swal from "sweetalert2";

function Home() {
  const { user_id } = useParams();
  const Navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [task, setTask] = useState([]);
  const apiUrl = "https://api-karyawan.dytech.my.id/api";

  const saveTask = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    axios
      .post(`${apiUrl}/newTask/` + user_id, {
        task_name: name,
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Berhasil menambahkan tugas baru",
        });

        Navigate("/detailUser/" + user_id);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err,
        });
      });
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/users/` + user_id)
      .then((res) => {
        console.log(res.data.data.task);
        setUsers(res.data.data);
        setTask(res.data.data.task);
        console.log(task);
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
      <div className="p-5 container h-[150px]  bg-gradient-to-r from-indigo-600 to-blue-400 rounded-bl-[20px] rounded-br-[20px]">
        <h1 className="text-2xl text-white">Hello, {users.name}</h1>
        <h1 className="text-1xl text-white">Selamat datang di PT DYTECH</h1>

        <div className="w-[100%] flex items-center justify-evenly h-[68px] relative bg-white rounded-[10px] shadow translate-y-[50%]">
          <div
            className="text-center text-blue-800 text-[11px] font-medium flex items-center justify-center flex-col"
            onClick={() => Navigate("/detailUser/" + user_id)}
          >
            <MdArrowBack size={30} />
            Back
          </div>
        </div>
      </div>

      <div className="container shado">
        <div className="border-b flex justify-between items-center px-3 py-5 bg-white w-100 mt-16 rounded-t-[26px] border h-[100%]">
          <h1 className="text-xl">Tambah tugas untuk : {users.name}</h1>
        </div>
        <form onSubmit={saveTask} className="p-3">
          <div className="flex flex-col">
            <label htmlFor="name">Nama</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Silahkan masukkan nama tugas"
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
