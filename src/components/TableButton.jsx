import { GoSortAsc, GoSortDesc } from "react-icons/go";

const TableButton = ({ label, sortBy, sortOrder, onHandleSortBy }) => {
  return (
    <button value={sortBy} className="capitalize" onClick={onHandleSortBy}>
      {label}
      {sortOrder === "asc" ? (
        <GoSortAsc className="inline-block ml-2 text-lg" />
      ) : (
        <GoSortDesc className="inline-block ml-2 text-lg" />
      )}{" "}
    </button>
  );
};

export default TableButton;
