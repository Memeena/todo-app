import React from "react";

export default function ToDO({
  item,
  index,
  onDelete,
  onUpdateStatus,
  darkMode,
  onDragStart,
  onDragEnter,
  onDrop,
}) {
  const darkComplete = item.status === "completed" && darkMode;
  const darkActive = item.status === "active" && darkMode;

  const lightComplete = item.status === "completed" && !darkMode;
  const lightActive = item.status === "active" && !darkMode;

  const colorStyle = {
    color:
      (darkComplete && "#4d5067") ||
      (darkActive && "#C8CBE7") ||
      (lightActive && "#494C6B") ||
      (lightComplete && "#D1D2DA"),
    textDecoration:
      (darkComplete && "line-through #4d5067") ||
      (lightComplete && "line-through #d1d2da"),
  };

  //Drag Item

  return (
    <li
      className="task-item"
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragEnter={(e) => onDragEnter(e, index)}
      onDragEnd={onDrop}
    >
      <label className="container">
        <input
          type="checkbox"
          className="checkbox"
          checked={item.status === "completed" ? "checked" : ""}
          onChange={(e) => onUpdateStatus(item.id, e.target.checked)}
        />
        <span
          className={`checkmark ${darkMode ? "checkmark-dark" : ""}`}
        ></span>
      </label>

      <p className={`task ${darkMode ? "task-dark" : ""}`} style={colorStyle}>
        {item.task}
      </p>
      <img
        src="../images/icon-cross.svg"
        alt="delete-icon"
        className="icon-cross"
        onClick={() => onDelete(item.id)}
      />
    </li>
  );
}
