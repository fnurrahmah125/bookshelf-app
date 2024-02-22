import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const NotFound = () => {
  const user = useSelector((state) => state.auth.value);
  const [page, setPage] = useState("");

  useEffect(() => {
    if (user === undefined) {
      setPage("/login");
    } else {
      setPage("/home");
    }
  }, [user]);

  return (
    <div className="grid min-h-screen place-items-center">
      <div className="rounded-md px-4 py-12 text-center text-slate-800 sm:px-12">
        <h1 className="tracking wide mb-2 text-9xl font-light text-slate-300">
          404
        </h1>
        <p className="mb-2 text-4xl">Whoops!</p>
        <p className="mb-6 font-medium">
          The page you are looking for is not found.
        </p>
        <button className="rounded-md bg-blue-600 px-8 py-2 text-white drop-shadow-lg duration-500 ease-in hover:bg-blue-800">
          <Link to={page}>Go Back</Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
