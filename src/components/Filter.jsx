import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const Filter = ({ onHandleFilter, category }) => {
  const { data } = useContext(GlobalContext);

  return (
    <div className="flex items-end justify-between pb-4 pt-8 text-sm md:text-base">
      <div className="flex">
        <button
          value="all"
          onClick={onHandleFilter}
          className={`px-4 py-1 ${
            category === "all"
              ? "rounded-full bg-blue-600 text-white"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          All ({data.length})
        </button>
        <button
          value="finished"
          onClick={onHandleFilter}
          className={`px-4 py-1 ${
            category === "finished"
              ? "rounded-full bg-blue-600 text-white"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Finished ({data.filter((item) => item.isFinished == true).length})
        </button>
        <button
          value="unfinished"
          onClick={onHandleFilter}
          className={`px-4 py-1 ${
            category === "unfinished"
              ? "rounded-full bg-blue-600 text-white"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Unfinished ({data.filter((item) => item.isFinished == false).length})
        </button>
      </div>
    </div>
  );
};

export default Filter;
