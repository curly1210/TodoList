import "./FilterPanel.css";
import PropTypes from "prop-types";

const FilterPanel = ({ selectedFilterId, setSelectedFilterId }) => {
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

  return (
    <div className="filter-panel">
      <input name="search-text" />
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
              <p>22</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
  selectedFilterId: PropTypes.string,
  setSelectedFilterId: PropTypes.func,
};

export default FilterPanel;
