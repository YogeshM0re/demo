import React from "react";
import "./Header.css";
import LogoutButton from "../LogoutButton";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">Feed App</h1>

      <LogoutButton />
    </header>
  );
};

export default Header;
