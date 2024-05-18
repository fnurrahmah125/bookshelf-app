import { GoCheckCircle, GoSortAsc, GoSortDesc } from "react-icons/go";
import { truncateString } from "../utils/helpers";
import TableButton from "./TableButton";

const Table = ({
  data,
  onHandleEdit,
  onHandleDelete,
  onHandleSortBy,
  sortOrder,
}) => {
  const getDuration = (startDate, endDate) => {
    const date1 = new Date(startDate * 1000);
    const date2 = new Date(endDate * 1000);
    const differenceTime = date2.getTime() - date1.getTime();
    const differenceDays = Math.round(differenceTime / (1000 * 3600 * 24));
    return `${differenceDays} days`;
  };

  return (
    <table className="border-collapse border border-slate-400 min-w-full text-center">
      <thead>
        <tr>
          <th className="border border-slate-300 whitespace-nowrap px-6 py-4">
            #
          </th>
          <th className="border border-slate-300 whitespace-nowrap px-6 py-4">
            <TableButton
              label="title"
              sortBy="title"
              sortOrder={sortOrder}
              onHandleSortBy={onHandleSortBy}
            />
          </th>
          <th className="border border-slate-300 whitespace-nowrap px-6 py-4">
            <TableButton
              label="author"
              sortBy="author"
              sortOrder={sortOrder}
              onHandleSortBy={onHandleSortBy}
            />
          </th>
          <th className="border border-slate-300 whitespace-nowrap px-6 py-4">
            <TableButton
              label="year"
              sortBy="year"
              sortOrder={sortOrder}
              onHandleSortBy={onHandleSortBy}
            />
          </th>
          <th className="border border-slate-300 whitespace-nowrap px-6 py-4">
            <TableButton
              label="created at"
              sortBy="startDate"
              sortOrder={sortOrder}
              onHandleSortBy={onHandleSortBy}
            />
          </th>
          <th className="border border-slate-300 whitespace-nowrap px-6 py-4">
            <TableButton
              label="Last Updated"
              sortBy="endDate"
              sortOrder={sortOrder}
              onHandleSortBy={onHandleSortBy}
            />
          </th>
          <th className="border border-slate-300 whitespace-nowrap px-6 py-4">
            <TableButton
              label="Current Page"
              sortBy="currentPage"
              sortOrder={sortOrder}
              onHandleSortBy={onHandleSortBy}
            />
          </th>
          <th className="border border-slate-300 whitespace-nowrap px-6 py-4">
            <TableButton
              label="Total Pages"
              sortBy="totalPages"
              sortOrder={sortOrder}
              onHandleSortBy={onHandleSortBy}
            />
          </th>
          <th className="border border-slate-300 whitespace-nowrap px-6 py-4">
            Status
          </th>
          <th className="border border-slate-300 whitespace-nowrap px-6 py-4">
            Duration
          </th>
          <th className="border border-slate-300 whitespace-nowrap px-6 py-4">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            <td className="border border-slate-300 whitespace-nowrap px-6 py-4 font-medium">
              {index + 1}
            </td>
            <td className="border border-slate-300 whitespace-nowrap px-6 py-4 text-wrap">
              {truncateString(item.title, 25)}
            </td>
            <td className="border border-slate-300 whitespace-nowrap px-6 py-4 text-wrap">
              {truncateString(item.author, 25)}
            </td>
            <td className="border border-slate-300 whitespace-nowrap px-6 py-4">
              {item.year}
            </td>
            <td className="border border-slate-300 whitespace-nowrap px-6 py-4">
              {new Date(item.startDate.seconds * 1000).toLocaleDateString(
                "id-ID"
              )}
            </td>
            <td className="border border-slate-300 whitespace-nowrap px-6 py-4">
              {new Date(item.endDate.seconds * 1000).toLocaleDateString(
                "id-ID"
              )}
            </td>

            <td className="border border-slate-300 whitespace-nowrap px-6 py-4">
              {item.currentPage}
            </td>
            <td className="border border-slate-300 whitespace-nowrap px-6 py-4">
              {item.totalPages}
            </td>
            <td className="border border-slate-300 whitespace-nowrap px-6 py-4">
              <GoCheckCircle
                className={`leading-2 mr-1 inline-block ${item.isFinished ? "text-green-500" : "text-orange-500"}`}
              />
              {item.isFinished ? "finished" : "in progress"}
            </td>
            <td className="border border-slate-300 whitespace-nowrap px-6 py-4">
              {getDuration(item.startDate.seconds, item.endDate.seconds)}
            </td>
            <td className="border border-slate-300 whitespace-nowrap px-6 py-4">
              <button
                className="bg-green-600 text-white px-6 rounded-md mr-2 mb-2 xl:mb-0 hover:bg-green-700"
                onClick={() => onHandleEdit(item.id)}
              >
                Edit
              </button>

              <button
                className="bg-red-600 text-white px-6 rounded-md hover:bg-red-700"
                onClick={() => onHandleDelete(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
