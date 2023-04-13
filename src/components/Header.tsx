import React from "react";

function Header() {
  return (
    <div className="fixed top-20 right-32 z-10">
      <div className="flex">
        <h1 className="cursor-pointer mx-5">Collab</h1>
        <h1 className="cursor-pointer mx-5">Studio</h1>
      </div>
    </div>
  );
}

export default Header;
