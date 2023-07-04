import React, { useEffect, useState, useRef } from "react";
import Header from "./Header";
import "./App.css";
import ToDoList from "./ToDoList";
import Filter from "./Filter";
function App() {
  const [userInput, setUserInput] = useState("");
  const [todoList, setTodoList] = useState(
    () => JSON.parse(localStorage.getItem("todoList")) || []
  );
  const [displayList, setDisplayList] = useState(todoList);
  //To set the state for dark mode
  const [darkMode, setDarkMode] = useState(false);
  //To set the state to filter based on All,Active and completed
  const [isSelect, setIsSelect] = useState("All");
  //To identify the width of the screen
  const [width, setWidth] = useState(0);

  //To update the width state based on the device
  function updateWidth() {
    const width = window.innerWidth;
    setWidth(width);
  }

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  //useEffect for local storage and setting the display list in UI to todoList
  useEffect(() => {
    setDisplayList(todoList);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  //Updating the List
  function handleUpdateStatus(id, status) {
    const newStatus = status ? "completed" : "active";
    setTodoList((list) =>
      list.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  }

  //Clearing the completed task and updating the todo List and display list
  function handleClearCompleted() {
    setTodoList((list) => list.filter((el) => el.status !== "completed"));
  }

  //Getting the input from user and pushing the input to todoList array
  function handleSubmit(e) {
    e.preventDefault();

    if (!userInput) return;

    const newTask = {
      id: crypto.randomUUID(),
      task: userInput,
      status: "active",
    };

    setTodoList((list) => [...list, newTask]);
    setUserInput("");
  }

  //Deleting a task based on the id
  function handleDeleteTask(id) {
    setTodoList((list) => list.filter((el) => el.id !== id));
  }

  //Displaying all the tasks
  function handleShowAll() {
    setDisplayList(todoList);
    setIsSelect("All");
  }

  //Displaying only the active tasks in the UI
  function handleShowActive(e) {
    const newArr = [];
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].status === "active") newArr.push(todoList[i]);
    }

    setDisplayList(newArr);
    setIsSelect("Active");
  }

  //Displaying only the completed tasks in the UI
  function handleShowcompleted() {
    setIsSelect(false);
    const newArr = [];
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].status === "completed") newArr.push(todoList[i]);
    }
    setDisplayList(newArr);
    setIsSelect("Completed");
  }

  //Changing the mode to Dark and Light based on user click
  function handleChangeMode() {
    setDarkMode((isDark) => !isDark);
  }

  const darkbg = {
    backgroundColor: darkMode ? "#25273d" : "#fff",
  };

  //Drag and drop tasks
  const dragItem = useRef();
  const dragOverItem = useRef();

  const handleDragStart = (e, position) => {
    dragItem.current = position;
  };

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const handleDrop = (e) => {
    const copyListItems = [...displayList];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setDisplayList(copyListItems);
  };

  return (
    <div className={`${darkMode ? "dark-bg" : ""} App`}>
      <Header darkMode={darkMode} onChangeMode={handleChangeMode} />

      <div className="get-input">
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className={`input ${darkMode ? "input-dark-mode" : ""}`}
            type="text"
            placeholder="Create a new todo"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            style={darkbg}
          />
        </form>
        <div className={`round ${darkMode ? "round-dark-mode" : ""}`}></div>
      </div>

      <ToDoList
        list={displayList}
        actualList={todoList}
        onDelete={handleDeleteTask}
        onUpdateStatus={handleUpdateStatus}
        onClearCompleted={handleClearCompleted}
        darkMode={darkMode}
        onDragStart={handleDragStart}
        onDragEnter={handleDragEnter}
        onDrop={handleDrop}
        width={width}
        isSelect={isSelect}
        onShowAll={handleShowAll}
        onShowActive={handleShowActive}
        onShowCompleted={handleShowcompleted}
      />
      {width < 500 && (
        <Filter
          darkMode={darkMode}
          isSelect={isSelect}
          onShowAll={handleShowAll}
          onShowActive={handleShowActive}
          onShowCompleted={handleShowcompleted}
        />
      )}
    </div>
  );
}

export default App;
