import React from "react";
import ToDo from "./ToDo";
import Filter from "./Filter";

export default function ToDoList({
  list,
  actualList,
  onDelete,
  onUpdateStatus,
  onClearCompleted,
  darkMode,
  onDragStart,
  onDragEnter,
  onDrop,
  width,
  isSelect,
  onShowAll,
  onShowActive,
  onShowCompleted,
}) {
  const leftItems = actualList
    .slice()
    .filter((item) => item.status === "active").length;

  if (actualList.length === 0)
    return (
      <p className={`todo-list no-task ${darkMode ? "no-task-dark" : ""}`}>
        Add some task!
      </p>
    );

  return (
    <>
      <div className={`todo-list ${darkMode ? "todo-list-dark" : ""}`}>
        <ul className="list">
          {list.map((item, index) => (
            <ToDo
              item={item}
              key={item.id}
              onDelete={onDelete}
              onUpdateStatus={onUpdateStatus}
              darkMode={darkMode}
              onDragStart={onDragStart}
              onDragEnter={onDragEnter}
              onDrop={onDrop}
              index={index}
            />
          ))}
        </ul>

        <p className={`left-items ${darkMode ? "left-items-dark" : ""}`}>
          {leftItems} items left
        </p>
        {width > 500 && (
          <Filter
            darkMode={darkMode}
            isSelect={isSelect}
            onShowAll={onShowAll}
            onShowActive={onShowActive}
            onShowCompleted={onShowCompleted}
          />
        )}
        <p
          className={`clear-completed ${
            darkMode ? "clear-completed-dark" : ""
          }`}
          onClick={onClearCompleted}
        >
          Clear Completed
        </p>
      </div>
    </>
  );
}
