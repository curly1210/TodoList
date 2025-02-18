import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState();

  const [todoList, setTodoList] = useState([
    {
      id: 1,
      name: "Đi học thêm",
      isImportant: false,
      isCompleted: true,
      isDeleted: false,
      category: "personal",
    },
    {
      id: 2,
      name: "Đi chợ",
      isImportant: true,
      isCompleted: false,
      isDeleted: false,
      category: "personal",
    },
    {
      id: 3,
      name: "Đi ngủ",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
      category: "travel",
    },
  ]);

  const [selectedFilterId, setSelectedFilterId] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [activeTodoItemId, setActiveTodoItemid] = useState();
  const [showSidebar, setShowSidebar] = useState(false);

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

  return (
    <AppContext.Provider
      value={{
        selectedCategoryId,
        setSelectedCategoryId,
        todoList,
        setTodoList,
        selectedFilterId,
        setSelectedFilterId,
        searchText,
        setSearchText,
        showSidebar,
        setShowSidebar,
        activeTodoItemId,
        setActiveTodoItemid,
        handleTodoItemClick,
        handleTodoItemChange,
        handleCompleCheckboxChange,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.element,
};

export default AppProvider;

export const useAppContext = () => {
  return useContext(AppContext);
};
