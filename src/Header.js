import React from "react";

export default function Header({ darkMode, onChangeMode }) {
  const imgSelect = darkMode ? "images/icon-sun.svg" : "images/icon-moon.svg";

  return (
    <div className="header">
      <h1 className="heading">TODO</h1>
      <img
        src={imgSelect}
        onClick={onChangeMode}
        alt="theme-switch-icon"
        className="icon-mode"
      />
    </div>
  );
}
