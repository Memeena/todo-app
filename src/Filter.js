import React from "react";

export default function Filter({
  darkMode,
  isSelect,
  onShowAll,
  onShowActive,
  onShowCompleted,
}) {
  return (
    <ul className={`filter ${darkMode ? "filter-dark" : ""}`}>
      <li
        className="filter-item"
        style={{ color: isSelect === "All" && "#3a7cfd" }}
        onClick={onShowAll}
      >
        All
      </li>
      <li
        className="filter-item"
        onClick={onShowActive}
        style={{ color: isSelect === "Active" && "#3A7CFD" }}
      >
        Active
      </li>
      <li
        className="filter-item"
        style={{ color: isSelect === "Completed" && "#3a7cfd" }}
        onClick={onShowCompleted}
      >
        Completed
      </li>
    </ul>
  );
}
