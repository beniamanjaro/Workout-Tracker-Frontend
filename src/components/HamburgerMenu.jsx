import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
const HamburgerMenu = () => {
  const [visible, setVisible] = useState(true);

  const hideWhenVisible = visible ? "hidden" : "";
  const showWhenVisible = visible ? "" : "hidden";

  const handleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div>
      <div className="lg:hidden fixed top-0 right-0 z-50">
        <button className={hideWhenVisible} onClick={handleVisibility}>
          <AiOutlineClose className="text-black w-10 h-10 m-2" />
        </button>

        <button className={showWhenVisible} onClick={handleVisibility}>
          <AiOutlineMenu className="text-black w-10 h-10 m-2" />
        </button>
      </div>
    </div>
  );
};

export default HamburgerMenu;
