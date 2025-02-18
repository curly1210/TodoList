import { useMemo } from "react";
import "./FilterPanel.css";
import PropTypes from "prop-types";
import CategoryList from "./CategoryList";
import { useAppContext } from "../context/AppProvider";

const FILTER_ITEMS = [
  {
    id: "all",
    label: "All",
    iconPath: "./public/inbox.png",
  },
  {
    id: "important",
    label: "Important",
    iconPath: "./public/flag.png",
  },
  {
    id: "completed",
    label: "Completed",
    iconPath: "./public/check.png",
  },
  {
    id: "deleted",
    label: "Delete",
    iconPath: "./public/delete.png",
  },
];

const FilterPanel = () => {
  const {
    todoList,
    searchText,
    setSearchText,
    selectedFilterId,
    setSelectedFilterId,
  } = useAppContext();

  const countByFilterType = useMemo(() => {
    return todoList.reduce(
      (acc, cur) => {
        let newAcc = { ...acc };
        if (cur.isCompleted) {
          newAcc = { ...newAcc, completed: acc.completed + 1 };
        }
        if (cur.isImportant) {
          newAcc = { ...newAcc, important: acc.important + 1 };
        }
        if (cur.isDeleted) {
          newAcc = { ...newAcc, deleted: acc.deleted + 1 };
        }
        return newAcc;
      },
      { all: todoList.length, important: 0, completed: 0, deleted: 0 }
    );
  }, [todoList]);

  // console.log({ countByFilterType });

  return (
    <div className="filter-panel">
      <input
        name="search-text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <div className="filter-container">
        {FILTER_ITEMS.map((item) => {
          return (
            <div
              key={item.id}
              className={`filter-item ${
                item.id === selectedFilterId ? "selected" : ""
              }`}
              onClick={() => setSelectedFilterId(item.id)}
            >
              <div className="filter-name">
                <img src={item.iconPath} alt="" />
                <p>{item.label}</p>
              </div>
              <p>{countByFilterType[item.id]}</p>
            </div>
          );
        })}
      </div>
      <CategoryList />
    </div>
  );
};

FilterPanel.propTypes = {
  selectedFilterId: PropTypes.string,
  setSelectedFilterId: PropTypes.func,
  todoList: PropTypes.array,
  setSearchText: PropTypes.func,
  searchText: PropTypes.string,
};

export default FilterPanel;
