import { GoClock } from "react-icons/go";

const CardProgress = ({ data }) => {
  const progressPercentage = Math.round(
    (data.currentPage / data.totalPages) * 100
  );

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <div
      key={data.id}
      className="card mb-4 rounded-md bg-slate-50 p-4 md:grid md:grid-cols-6"
    >
      <div className="mb-4 grid grid-cols-5 items-center gap-4 md:col-start-1 md:col-end-3 md:gap-12 lg:grid-cols-8">
        <div className="card-title-custom h-10 w-10 rounded-full text-center text-2xl font-semibold leading-10">
          {data.title[0]}
        </div>
        <div className="col-span-4 col-end-6 lg:col-span-6 lg:col-end-8">
          <h3 className="tex-lg mb-1 line-clamp-2 font-bold md:mb-2 md:line-clamp-1 ">
            {data.title}
          </h3>
          <p className="text-sm font-light text-slate-400">
            <GoClock className="mr-1 inline-block" />
            {new Date(data.startDate.seconds * 1000).toLocaleDateString(
              "id-ID",
              options
            )}
          </p>
        </div>
      </div>

      <div className="md:col-start-4 md:col-end-7 lg:col-start-5">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-sm text-slate-400">
            progress ({data.currentPage}/{data.totalPages})
          </span>
          <span className="text-xl font-bold">{progressPercentage}%</span>
        </div>
        <div className="w-full rounded-full bg-slate-200">
          <div
            className={`h-2 rounded-full bg-gradient-to-r from-green-500 to-green-300`}
            style={{ width: progressPercentage + "%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CardProgress;
