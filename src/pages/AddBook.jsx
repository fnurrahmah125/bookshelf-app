import { useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addBookToFireStore } from "../store/slices/bookSlice";
import Navbar from "../components/Navbar";

const AddBook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPages, setCurrentPages] = useState(0);

  const user = useSelector((state) => state.auth.value);

  const handleAddBook = (e) => {
    e.preventDefault();

    try {
      const payload = {
        title,
        author,
        year,
        totalPages,
        currentPages,
        userId: user.uid,
        isFinished: Number(currentPages) === Number(totalPages),
        startDate: Timestamp.now(),
        endDate: Timestamp.now(),
        display: "visible",
      };

      dispatch(addBookToFireStore(payload));
      navigate("/");
    } catch (error) {
      const errororCode = error.code;
      const errorMessage = error.message;
      console.log("Error occured: ", errororCode, errorMessage);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-slate-200 px-4 pt-4 text-slate-800 sm:px-8 sm:pt-8">
        <div className="m-auto min-h-screen w-full max-w-[90rem] rounded-tl-md rounded-tr-md bg-white p-4 shadow-md md:p-6">
          <h2 className="mb-6 mt-3 text-center text-2xl font-medium md:mb-8">
            Add new book
          </h2>
          <form
            className="m-auto max-w-[35rem] text-sm"
            onSubmit={handleAddBook}
          >
            <label htmlFor="title" className="mb-2 block font-bold">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="mb-5 block w-full rounded-md border border-slate-300 bg-slate-50 px-2 py-2 md:mb-7"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="author" className="mb-2 block font-bold">
              Author
            </label>
            <input
              type="text"
              name="author"
              id="author"
              className="mb-5 block w-full rounded-md border border-slate-300 bg-slate-50 px-2 py-2 md:mb-7 "
              required
              onChange={(e) => setAuthor(e.target.value)}
            />
            <label htmlFor="year" className="mb-2 block font-bold">
              Year
            </label>
            <input
              type="number"
              name="year"
              id="year"
              className="mb-5 block w-full rounded-md border border-slate-300 bg-slate-50 px-2 py-2 md:mb-7 lg:col-start-2 lg:col-end-4"
              required
              onChange={(e) => setYear(e.target.value)}
            />
            <label htmlFor="total" className="mb-2 block font-bold">
              Total Pages
            </label>
            <input
              type="number"
              name="total"
              id="total"
              className="mb-5 block w-full rounded-md border border-slate-300 bg-slate-50 px-2 py-2 md:mb-7 lg:col-start-2 lg:col-end-4"
              required
              onChange={(e) => setTotalPages(e.target.value)}
            />
            <label htmlFor="current" className="mb-2 block font-bold">
              Current Page
            </label>
            <input
              type="number"
              name="current"
              id="current"
              min="0"
              max={totalPages}
              className="mb-5 block w-full rounded-md border border-slate-300 bg-slate-50 px-2 py-2 md:mb-7 lg:col-start-2 lg:col-end-4"
              required
              onChange={(e) => setCurrentPages(e.target.value)}
            />
            <div className="mt-8 grid grid-cols-3 gap-4 md:mt-12">
              <button
                className="rounded-md border border-blue-500 py-2 tracking-wide text-blue-500 transition duration-300 hover:border-blue-700 hover:text-blue-700 md:col-start-2"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-blue-600 tracking-wide text-white transition duration-300 hover:bg-blue-800"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBook;
