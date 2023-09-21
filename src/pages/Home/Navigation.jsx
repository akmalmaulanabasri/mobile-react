import React from "react";

function Navigation() {
  return (
    <div className="flex items-center justify-evenly bottom-0 w-full h-[50px] border shadow absolute">
      <div className="text-center text-blue-800 text-[11px] font-medium">
        Home
      </div>
      <div className="text-center text-blue-800 text-[11px] font-medium">
        Orders
      </div>
      <div className="text-center text-blue-800 text-[11px] font-medium">
        Items
      </div>
    </div>
  );
}

export default Navigation;
