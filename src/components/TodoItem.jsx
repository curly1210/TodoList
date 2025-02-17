import PropTypes from "prop-types";

const TodoItem = (props) => {
  return (
    <div
      className="todo-item"
      onClick={() => props.handleTodoItemClick(props.id)}
    >
      <div style={{ display: "flex", gap: 4 }}>
        <input
          type="checkbox"
          checked={props.isCompleted}
          onChange={() => props.handleCompleCheckboxChange(props.id)}
          onClick={(e) => e.stopPropagation()}
        />
        <p className="todo-item-text">{props.name}</p>
      </div>
      {props.isImportant && <p>⭐</p>}
    </div>
  );
};

TodoItem.propTypes = {
  handleTodoItemClick: PropTypes.func,
  handleCompleCheckboxChange: PropTypes.func,
  name: PropTypes.string,
  isCompleted: PropTypes.bool,
  isImportant: PropTypes.bool,
  id: PropTypes.number,
};

export default TodoItem;
