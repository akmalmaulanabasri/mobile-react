import axios from "axios";
import React, { useEffect, useState } from "react";
import ModalPayment from "./ModalPayment";

function Home() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPay, setSHowPay] = useState(true);
  const [user, setUser] = useState({
    name: "user",
    email: "",
    role: "",
  });

  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const apiUrl = "https://be.wikrama.shop/api/v1";

  const getUser = () => {
    const res = axios
      .get(`${apiUrl}/auth/me`, {
        headers: {
          Accept: "application/json",
          "auth-token": sessionStorage.getItem("auth_token"),
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getItem = async () => {
    try {
      if (getItem.called) {
        return;
      }
      getItem.called = true;
      const res = await axios.get(`${apiUrl}/item`, {
        headers: {
          Accept: "application/json",
          "auth-token": sessionStorage.getItem("auth_token"),
        },
      });

      const itemsData = res.data.data;

      itemsData.map((item) => {
        const i = {
          id: item._id,
          name: item.name,
          price: item.price,
          img_url: item.img_url,
          qty: 0,
        };

        setItems((items) => [...items, i]);
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setCart([]);
    getUser();
    getItem();
  }, []);

  useEffect(() => {
    const totalPrice = items.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0);
    setTotalPrice(totalPrice);
  }, [items]);

  const handleSelect = (item, method) => {
    const updatedItems = items.map((oldItem) => {
      if (oldItem.id === item.id) {
        if (method == "+") {
          return {
            ...oldItem,
            qty: oldItem.qty + 1,
          };
        } else {
          return {
            ...oldItem,
            qty: oldItem.qty - 1,
          };
        }
      }
      return oldItem;
    });
    setItems(updatedItems);
  };

  return (
    <>
      <ModalPayment show={showPay} setShowPay={setSHowPay} />
      <div className="p-5 container h-[200px]  bg-gradient-to-r from-indigo-600 to-blue-400 rounded-bl-[20px] rounded-br-[20px]">
        <h1 className="text-center text-2xl text-white mt-3 font-extrabold">
          List Foods
        </h1>
      </div>
      <div className="p-3 py-3 w-[100%] flex items-center flex-col justify-evenly relative bg-white rounded-[10px] shadow ">
        {items.length > 0 ? (
          items.map((item, key) => (
            <div
              key={key}
              className="mt-3 shadow-xl border w-[100%] flex items-center justify-between h-[68px] bg-white rounded-[10px]"
            >
              <div className="h-[100%] w-full flex items-center">
                <img
                  src="https://picsum.photos/200/300"
                  alt=""
                  className="w-auto aspect-square h-[100%] rounded-[10px]"
                />
                <div className="item ms-3">
                  <h1 className="text-xl">{item.name}</h1>
                  <h1 className="text-md">Rp{item.price}</h1>
                </div>
              </div>
              <div id="select" className="me-5">
                <div className="w-[92px] h-[25px] flex align-middle justify-between">
                  <div
                    className="w-[25px] h-[25px] flex items-center justify-center bg-slate-500 rounded-full"
                    onClick={() => handleSelect(item, "-")}
                  >
                    +
                  </div>
                  <div className="text-center text-blue-800 text-[17px] font-normal">
                    {item.qty}
                  </div>
                  <div
                    className="w-[25px] h-[25px] flex items-center justify-center bg-slate-500 rounded-full"
                    onClick={() => handleSelect(item, "+")}
                  >
                    +
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>null</>
        )}
      </div>
      <div className="flex items-center justify-between shadow-2xl p-5 shadow-gray-950 w-full h-[100px] bottom-0 absolute mt-10 rounded-t-[20px]">
        <div className="flex flex-col">
          <div className="text-blue-800 text-xs font-light font-['Poppins']">
            Total Harga
          </div>
          <div className="text-blue-800 text-xl font-bold font-['Poppins']">
            Rp{totalPrice}
          </div>
        </div>
        <div
          className="cursor-pointer bg-blue-800 rounded-[15px] text-white px-10 py-2 text-[11px] font-normal font-['Poppins']"
          onClick={() => setSHowPay(!showPay)}
        >
          Bayar
        </div>
      </div>
    </>
  );
}

export default Home;
