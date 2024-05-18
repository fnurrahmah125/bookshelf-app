import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import Loading from "../components/Loading";
import CardStatus from "../components/CardStatus";
import CardUser from "../components/CardUser";
import CardProgress from "../components/CardProgress";

const Profile = () => {
  const { data } = useContext(GlobalContext);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (data) {
      const total = data.reduce((acc, object) => {
        return acc + Number(object["currentPage"]);
      }, 0);

      setTotalPages(total);
    }
  }, [data]);

  if (data === null) {
    return <Loading />;
  }

  return (
    <div className="bg-slate-200 px-4 pt-4 text-slate-800 sm:px-8">
      <div className="m-auto min-h-screen w-full max-w-[90rem] rounded-tl-md rounded-tr-md bg-white p-4 pt-6  shadow-md md:p-6">
        <CardUser />

        <div className="mb-12">
          <h2 className="mb-4 text-lg font-bold">Readings Stats</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <CardStatus bakcground="from-cyan-500 to-blue-500">
              <p className="text-2xl font-bold">{totalPages}</p>
              <p className="text-sm font-light">Total Pages</p>
            </CardStatus>

            <CardStatus bakcground="from-purple-500 to-pink-500">
              <p className="text-2xl font-bold">{data.length}</p>
              <p className="text-sm font-light">Total Books</p>
            </CardStatus>

            <CardStatus bakcground="from-yellow-500 to-orange-500">
              <p className="text-2xl font-bold">
                {data.filter((item) => item.isFinished === true).length}
              </p>
              <p className="text-sm font-light">Finished Reading</p>
            </CardStatus>

            <CardStatus bakcground="from-lime-500 to-emerald-500">
              <p className="text-2xl font-bold">
                {data.filter((item) => item.isFinished === false).length}
              </p>
              <p className="text-sm font-light">Continue Reading</p>
            </CardStatus>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="mb-4 text-lg font-bold">Current Readings</h2>
          {data &&
            data.map((item) => {
              if (!item.isFinished) {
                return <CardProgress key={item.id} data={item} />;
              }
            })}

          {data.length === 0 && (
            <div className="my-32 text-center">
              <h2 className="text-3xl font-light text-slate-300">
                The booklist is empty
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
