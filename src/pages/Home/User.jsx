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

  const doneTask = (id) => {
    axios
      .post(`${apiUrl}/doneTask/` + id)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Tugas sudah selesai",
        });
        setTask(
          task.map((task) => {
            if (task.id === id) {
              return {
                ...task,
                status: true,
              };
            }
            return task;
          })
        );
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

  const clock = (type) => {
    axios
      .post(`${apiUrl}/clock${type}/${user_id}`)
      .then((res) => {
        if (res.data.status != 200) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.message,
          });
          return;
        }
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Berhasil melakukan clock" + type,
        });
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
      <div className="p-5 container h-[150px]  bg-gradient-to-r from-indigo-600 to-blue-400 rounded-bl-[20px] rounded-br-[20px]">
        <h1 className="text-2xl text-white">Hello, {users.name}</h1>
        <h1 className="text-1xl text-white">Selamat datang di PT DYTECH</h1>

        <div className="w-[100%] flex items-center justify-evenly h-[68px] relative bg-white rounded-[10px] shadow translate-y-[50%]">
          <div
            className="text-center text-blue-800 text-[11px] font-medium flex items-center justify-center flex-col"
            onClick={() => Navigate("/")}
          >
            <MdArrowBack size={30} />
            Back
          </div>
          <div
            className="text-center text-blue-800 text-[11px] font-medium flex items-center justify-center flex-col"
            onClick={() => clock("In")}
          >
            <MdOutlineLogin size={"30"} />
            Clock In
          </div>
          <div
            className="text-center text-blue-800 text-[11px] font-medium flex items-center justify-center flex-col"
            onClick={() => clock("Out")}
          >
            <MdLogout size={"30"} />
            Clock Out
          </div>
        </div>
      </div>

      <div className="container shado">
        <div className="border-b flex justify-between items-center px-3 py-5 bg-white w-100 mt-16 rounded-t-[26px] border h-[100%]">
          <h1 className="text-xl">Data Tugas</h1>
          <h1
            className="text-md bg-blue-400 px-2 py-1 rounded-md text-white"
            onClick={() => Navigate("/newTask/" + user_id)}
          >
            Tambah task baru
          </h1>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-3 px-6 text-left">Nama tugas</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {task != 500 &&
              task.map((task) => {
                return (
                  <tr>
                    <td className="py-3 px-6 text-left">{task.task_name}</td>
                    <td className="py-3 px-6 text-left">
                      {task.status ? "Sudah Selesai" : "Belum selesai"}
                    </td>
                    <td className="py-3 px-6 text-center flex justify-center cursor-pointer">
                      {!task.status ? (
                        <span onClick={() => doneTask(task.id)}>
                          <MdCheck size={20} />
                        </span>
                      ) : (
                        <MdOutlineThumbUp size={20} />
                      )}
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
