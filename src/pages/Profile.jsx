import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchBooksFromFirestore } from "../store/slices/bookSlice";
import { GoBook, GoClock } from "react-icons/go";
import Navbar from "../components/Navbar";

const Profile = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.value);
  const books = useSelector((state) => state.books.books);

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    dispatch(fetchBooksFromFirestore(auth.uid));
  }, [auth, dispatch]);

  useEffect(() => {
    const total = books.reduce((acc, object) => {
      return acc + Number(object["currentPages"]);
    }, 0);

    setTotalPages(total);
  }, [books]);

  return (
    <>
      <Navbar />
      <div className="bg-slate-200 px-4 pt-4 text-slate-800 sm:px-8">
        <div className="m-auto min-h-screen w-full max-w-[90rem] rounded-tl-md rounded-tr-md bg-white p-4 pt-6  shadow-md md:p-6">
          <div className="mb-12 text-center">
            <img
              src="../profile.jpg"
              alt="profile image"
              className="mx-auto mb-2 w-32 rounded-full border border-slate-500"
            />
            <p className="mb-1 text-2xl font-medium">Hi, {auth.displayName}!</p>
            <p className="font-light text-slate-500">{auth.email}</p>
          </div>
          <div className="mb-12">
            <h2 className="mb-4 text-lg font-bold">Readings Stats</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex gap-4 rounded-md bg-gradient-to-br from-cyan-500 to-blue-500 p-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/35">
                  <GoBook className="inline-block text-3xl text-white" />
                </span>
                <div className="text-white">
                  <p className="text-2xl font-bold">{totalPages}</p>
                  <p className="text-sm font-light">Total Pages</p>
                </div>
              </div>

              <div className="flex gap-4 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 p-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/35">
                  <GoBook className="inline-block text-3xl text-white" />
                </span>
                <div className="text-white">
                  <p className="text-2xl font-bold">{books.length}</p>
                  <p className="text-sm font-light">Total Books</p>
                </div>
              </div>

              <div className="flex gap-4 rounded-md bg-gradient-to-br from-yellow-500 to-orange-500 p-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/35">
                  <GoBook className="inline-block text-3xl text-white" />
                </span>
                <div className="text-white">
                  <p className="text-2xl font-bold">
                    {books.filter((book) => book.isFinished === true).length}
                  </p>
                  <p className="text-sm font-light">Finished Reading</p>
                </div>
              </div>

              <div className="flex gap-4 rounded-md bg-gradient-to-br from-lime-500 to-emerald-500 p-6">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/35">
                  <GoBook className="inline-block text-3xl text-white" />
                </span>
                <div className="text-white">
                  <p className="text-2xl font-bold">
                    {books.filter((book) => book.isFinished === false).length}
                  </p>
                  <p className="text-sm font-light">Continue Reading</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="mb-4 text-lg font-bold">Current Readings</h2>
            {books.map((book) => {
              if (!book.isFinished) {
                const date = new Date(book.startDate.seconds * 1000);
                const options = {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                };
                const width = Math.round(
                  (book.currentPages / book.totalPages) * 100,
                );

                return (
                  <div
                    key={book.id}
                    className="card mb-4 rounded-md bg-slate-50 p-4 md:grid md:grid-cols-6"
                  >
                    <div className="mb-4 grid grid-cols-5 items-center gap-4 md:col-start-1 md:col-end-3 md:gap-12 lg:grid-cols-8">
                      <div className="card-title-custom h-10 w-10 rounded-full text-center text-2xl font-semibold leading-10">
                        {book.title[0]}
                      </div>
                      <div className="col-span-4 col-end-6 lg:col-span-6 lg:col-end-8">
                        <h3 className="tex-lg mb-1 line-clamp-2 font-bold md:mb-2 md:line-clamp-1 ">
                          {book.title}
                        </h3>
                        <p className="text-sm font-light text-slate-400">
                          <GoClock className="mr-1 inline-block" />
                          {date.toLocaleDateString("id-ID", options)}
                        </p>
                      </div>
                    </div>

                    <div className="md:col-start-4 md:col-end-7 lg:col-start-5">
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-sm text-slate-400">
                          progress ({book.currentPages}/{book.totalPages})
                        </span>
                        <span className="text-xl font-bold">{width}%</span>
                      </div>
                      <div className="w-full rounded-full bg-slate-200">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-green-500 to-green-300"
                          style={{ width: `${width}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
