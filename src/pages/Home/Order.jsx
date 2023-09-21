import React from "react";

function Order() {
  return (
    <div>
      <div id="order" className="mt-2 flex justify-between items-center">
        <div id="detail" className="flex items-center">
          <div className="bg-yellow-400 w-[50px] h-[50px] rounded"></div>
          <div className="item ms-3">
            <h1 className="text-xl">Kantin</h1>
            <h1 className="text-md">Risol + Roti</h1>
          </div>
        </div>
        <div id="price">
          <h1 className="text-md">Rp. 10.000</h1>
        </div>
      </div>
    </div>
  );
}

export default Order;
