import React from "react";

function ModalPayment(props) {
  return (
    <div
      className={`relative ${!props.show ? "hidden" : ""}`}
      onClick={() => props.setShowPay(!props.show)}
    >
      <div className="absolute z-10 bg-[#191919ad] h-[100vh] w-[100vw] flex items-center justify-center">
        <div className="bg-white w-[400px] h-[300px] flex items-center justify-center rounded-2xl">
          Please scan your card...
        </div>
      </div>
    </div>
  );
}

export default ModalPayment;
