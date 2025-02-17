import { useRef, useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import Sidebar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";

function App() {
  const [todoList, setTodoList] = useState([
    {
      id: 1,
      name: "Đi học thêm",
      isImportant: false,
      isCompleted: true,
      isDeleted: false,
    },
    {
      id: 2,
      name: "Đi chợ",
      isImportant: true,
      isCompleted: false,
      isDeleted: false,
    },
    {
      id: 3,
      name: "Đi ngủ",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
    },
  ]);

  const [selectedFilterId, setSelectedFilterId] = useState("all");

  const [activeTodoItemId, setActiveTodoItemid] = useState();

  const [showSidebar, setShowSidebar] = useState(false);

  const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);

  const inputRef = useRef();

  const handleCompleCheckboxChange = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  // console.log({ todoList });
  const handleTodoItemClick = (todoId) => {
    setShowSidebar(true);
    setActiveTodoItemid(todoId);
  };

  const handleTodoItemChange = (newTodo) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  const filterTodos = todoList
    .filter((todo) => {
      switch (selectedFilterId) {
        case "all":
          return true;
        case "important":
          return todo.isImportant;
        case "completed":
          return todo.isCompleted;
        case "deleted":
          return todo.isDeleted;
        default:
          return true;
      }
    })
    .map((todo) => {
      return (
        <TodoItem
          id={todo.id}
          name={todo.name}
          key={todo.id}
          isImportant={todo.isImportant}
          isCompleted={todo.isCompleted}
          handleCompleCheckboxChange={handleCompleCheckboxChange}
          handleTodoItemClick={handleTodoItemClick}
        />
      );
    });

  // console.log(todos);

  return (
    <div className="container">
      <FilterPanel
        selectedFilterId={selectedFilterId}
        setSelectedFilterId={setSelectedFilterId}
      />
      <div className="main-content">
        <input
          ref={inputRef}
          type="text"
          name="add-new-task"
          placeholder="Add new task"
          className="task-input"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const value = e.target.value;
              setTodoList([
                ...todoList,
                {
                  id: crypto.randomUUID(),
                  name: value,
                  isImportant: false,
                  isCompleted: false,
                  isDeleted: false,
                },
              ]);
              inputRef.current.value = "";
            }
          }}
        />
        <div>{filterTodos}</div>
        {showSidebar && (
          <Sidebar
            key={activeTodoItemId}
            todoItem={activeTodoItem}
            handleTodoItemChange={handleTodoItemChange}
            setShowSidebar={setShowSidebar}
          />
        )}
      </div>
    </div>
  );
}

export default App;
