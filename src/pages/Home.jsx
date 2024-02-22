import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoSearch,
  GoPlus,
  GoClock,
  GoCheckCircle,
  GoTrash,
  GoPencil,
} from "react-icons/go";
import {
  deleteBookFromFireStore,
  fetchBooksFromFirestore,
} from "../store/slices/bookSlice";

import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [term, setTerm] = useState("");
  const [status, setStatus] = useState("all");

  const books = useSelector((state) => state.books.books);
  const auth = useSelector((state) => state.auth.value);
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    dispatch(fetchBooksFromFirestore(auth.uid));
  }, [auth, dispatch]);

  useEffect(() => {
    setUserBooks(books);
  }, [books]);

  useEffect(() => {
    setStatus("all");
  }, []);

  const handleFilterBook = (status) => {
    setStatus(status);

    if (status === "all") {
      setUserBooks((books) =>
        books.map((book) => {
          return { ...book, display: "visible" };
        }),
      );
    }

    if (status === "finished") {
      setUserBooks((books) =>
        books.map((book) =>
          book.isFinished
            ? { ...book, display: "visible" }
            : { ...book, display: "hidden" },
        ),
      );
    }

    if (status === "unfinished") {
      setUserBooks((books) =>
        books.map((book) =>
          !book.isFinished
            ? { ...book, display: "visible" }
            : { ...book, display: "hidden" },
        ),
      );
    }
  };

  const handleSearchBook = (value) => {
    setStatus("all");

    setTerm(value);

    const editUserBooks = userBooks.map((book) => {
      const title = book.title.toLowerCase().includes(value.toLowerCase());
      return title
        ? { ...book, display: "visible" }
        : { ...book, display: "hidden" };
    });

    setUserBooks(editUserBooks);
  };

  return (
    <>
      <Navbar />

      <div className="bg-slate-200 px-4 text-slate-800 sm:px-8">
        <div className="m-auto w-full max-w-[90rem]">
          <div className="flex items-end justify-between pb-4 pt-8 text-sm md:text-base">
            <div className="flex">
              <button
                className={status == "all" ? "active" : "inactive"}
                onClick={() => handleFilterBook("all")}
              >
                All ({books.length})
              </button>
              <button
                className={status == "finished" ? "active" : "inactive"}
                onClick={() => handleFilterBook("finished")}
              >
                Finished (
                {books.filter((item) => item.isFinished == true).length})
              </button>
              <button
                className={status == "unfinished" ? "active" : "inactive"}
                onClick={() => handleFilterBook("unfinished")}
              >
                Unfinished (
                {books.filter((item) => item.isFinished == false).length})
              </button>
            </div>
          </div>

          <div className="min-h-screen rounded-tl-md rounded-tr-md bg-white p-4 shadow-md md:p-6">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:justify-between lg:mb-12">
              <div className="flex items-center rounded-lg border border-slate-300 px-4 py-2">
                <GoSearch className="mr-2 inline-block text-lg text-slate-400" />
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={term}
                  placeholder="Search books"
                  className="md:w-70 w-40 text-sm font-light placeholder:text-slate-400 focus:outline-none sm:w-56 md:text-base lg:w-96"
                  onChange={(e) => handleSearchBook(e.target.value)}
                />
              </div>
              <button
                className="rounded-md bg-blue-600 py-1 pl-2 pr-3 text-white shadow-md transition duration-300 hover:bg-blue-800 md:pr-4"
                onClick={() => navigate("/add-book")}
              >
                <GoPlus className="inline-block text-2xl md:text-3xl" />
                <span className="text-sm md:text-base">Add new book</span>
              </button>
            </div>

            <div className="mb-4 hidden grid-cols-12 px-6 lg:grid">
              <strong className="col-span-4">Title</strong>
              <div className="col-span-7 grid grid-cols-7 text-center">
                <strong>Author</strong>
                <strong>Year</strong>
                <strong>Created At</strong>
                <strong>Last Updated</strong>
                <strong>Status</strong>
                <strong>Current Page</strong>
                <strong>Duration</strong>
              </div>
              <strong className="text-end">Actions</strong>
            </div>
            <div className="flex flex-col">
              {userBooks.map((book, index) => {
                const date1 = new Date(book.startDate.seconds * 1000);
                const date2 = new Date(book.endDate.seconds * 1000);
                const differenceTime = date2.getTime() - date1.getTime();
                const differenceDays = Math.round(
                  differenceTime / (1000 * 3600 * 24),
                );

                return (
                  <div
                    key={index}
                    data-display={book.display}
                    className="card relative mb-6 gap-3 rounded-lg bg-slate-50 px-4 py-4 drop-shadow-sm data-[display=visible]:grid data-[display=hidden]:hidden lg:grid-cols-12 lg:items-center lg:gap-5 lg:px-6"
                  >
                    <div className="my-2 flex flex-wrap items-center gap-4 lg:col-span-4 lg:my-0 lg:grid lg:grid-cols-5 lg:gap-x-4 xl:grid-cols-7">
                      <div className="card-title-custom h-10 w-10 rounded-full text-center text-2xl font-semibold leading-10">
                        {book.title[0]}
                      </div>
                      <h2 className="text-lg font-bold lg:col-start-2 lg:col-end-6 lg:line-clamp-1 lg:text-base xl:col-end-8">
                        {book.title}
                      </h2>
                    </div>

                    <div className="flex flex-col gap-2.5 lg:col-span-7 lg:grid lg:grid-cols-7 lg:flex-row lg:text-center">
                      <p className="inline-block text-sm font-light lg:line-clamp-2">
                        <strong className="font-medium lg:hidden ">
                          Author:{" "}
                        </strong>
                        {book.author}
                      </p>
                      <p className="text-sm font-light">
                        <strong className="font-medium lg:hidden">
                          Year:{" "}
                        </strong>
                        {book.year}
                      </p>
                      <p className="text-sm font-light">
                        <strong className="font-medium lg:hidden">
                          Created at:{" "}
                        </strong>
                        {date1.toLocaleDateString("id-ID")}
                      </p>
                      <p className="text-sm font-light">
                        <strong className="font-medium lg:hidden">
                          Last updated:{" "}
                        </strong>
                        {date2.toLocaleDateString("id-ID")}
                      </p>
                      <p className="text-sm font-light">
                        <strong className="font-medium lg:hidden">
                          Status:{" "}
                        </strong>

                        {book.isFinished ? (
                          <GoCheckCircle className="leading-2 mr-1 inline-block text-green-500" />
                        ) : (
                          <GoClock className="leading-2 mr-1 inline-block text-orange-500" />
                        )}
                        {book.isFinished ? "finished" : "in progress"}
                      </p>
                      <p className="text-sm font-light">
                        <strong className="font-medium lg:hidden">
                          Current page:{" "}
                        </strong>
                        {book.currentPages}/{book.totalPages}
                      </p>
                      <p className="text-sm font-light">
                        <strong className="font-medium lg:hidden">
                          Duration:{" "}
                        </strong>
                        {differenceDays} days
                      </p>
                    </div>

                    <div className="ml-auto">
                      <button
                        type="button"
                        onClick={() => navigate(`/edit/${book.id}`)}
                        className="group relative"
                      >
                        <GoPencil className="mr-4 inline-block text-xl text-slate-700 lg:text-lg" />
                        <span className="invisible absolute right-[0] top-[35px] rounded-md bg-slate-800 px-4 py-1 text-center text-sm text-white after:absolute after:-top-[15px] after:right-[20px] after:rotate-180 after:border-8 after:border-transparent after:border-t-slate-800 after:content-[''] group-hover:visible">
                          Edit
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          dispatch(deleteBookFromFireStore(book.id));
                        }}
                        className="group relative"
                      >
                        <GoTrash className="inline-block text-xl text-red-500 lg:text-lg" />
                        <span className="invisible absolute -right-[29px] top-[35px] rounded-md bg-slate-800 px-4 py-1.5 text-center text-sm text-white after:absolute after:-top-[15px] after:right-[29px] after:rotate-180 after:border-8 after:border-transparent after:border-t-slate-800 after:content-[''] group-hover:visible">
                          Delete
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {userBooks.length === 0 && (
              <div className="my-32 text-center lg:my-52">
                <h2 className="text-3xl font-light text-slate-300">
                  The booklist is empty
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
