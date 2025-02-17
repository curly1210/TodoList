import { useState } from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";

const Sidebar = (props) => {
  const data = props.todoItem;

  const [name, setName] = useState(data.name);
  const [isImportant, setIsImportant] = useState(data.isImportant);
  const [isCompleted, setIsCompleted] = useState(data.isCompleted);

  const handleSave = () => {
    const newTodo = { ...data, name, isImportant, isCompleted };
    props.handleTodoItemChange(newTodo);
    props.setShowSidebar(false);
  };

  return (
    <div className="sidebar">
      <form className="sb-form">
        <div className="sb-form-field">
          <label htmlFor="sb-name">Todo Name</label>
          <input
            id="sb-name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => {
              // console.log(e);
              setName(e.target.value);
              // props.handleTodoNameChange(data.id, e.target.value);
            }}
          />
        </div>
        <div className="sb-form-field">
          <label htmlFor="sb-important">Is important?</label>
          <input
            id="sb-important"
            name="isImportant"
            type="checkbox"
            checked={isImportant}
            onChange={() => {
              setIsImportant(!isImportant);
            }}
          />
        </div>
        <div className="sb-form-field">
          <label htmlFor="sb-completed">Is completed</label>
          <input
            id="sb-completed"
            name="isCompleted"
            type="checkbox"
            checked={isCompleted}
            onChange={() => {
              setIsCompleted(!isCompleted);
            }}
          />
        </div>
      </form>
      <div className="sb-footer">
        <button onClick={handleSave}>Save</button>
        <button onClick={() => props.setShowSidebar(false)}>Cancel</button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  setShowSidebar: PropTypes.func,
  handleTodoItemChange: PropTypes.func,
  todoItem: {
    name: PropTypes.string,
    isImportant: PropTypes.bool,
    isCompleted: PropTypes.bool,
  },
};

export default Sidebar;
