import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../configs/firebase-config";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import { AuthContext } from "../context/AuthContext";

const Form = () => {
  const { data, setFetchStatus } = useContext(GlobalContext);
  const { currentUser } = useContext(AuthContext);

  const [input, setInput] = useState({
    title: "",
    author: "",
    year: 0,
    totalPages: 0,
    currentPage: 0,
  });

  const navigate = useNavigate();
  const params = useParams();
  const bookId = params.id;

  useEffect(() => {
    if (bookId && data) {
      const book = data?.find((item) => item.id === bookId);
      setInput({
        title: book.title,
        author: book.author,
        year: book.year,
        totalPages: book.totalPages,
        currentPage: book.currentPage,
      });
    }
  }, [bookId, data]);

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docData = {
        title: input.title,
        author: input.author,
        year: input.year,
        totalPages: input.totalPages,
        currentPage: input.currentPage,
        endDate: Timestamp.now(),
        isFinished: Number(input.currentPage) === Number(input.totalPages),
      };

      if (bookId) {
        await updateDoc(doc(db, "bookshelf", bookId), docData);

        Swal.fire({
          text: "Your book has been updated successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await addDoc(collection(db, "bookshelf"), {
          ...docData,
          startDate: Timestamp.now(),
          userId: currentUser.uid,
        });

        Swal.fire({
          text: "Your book has been added successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log("Error occured: ", error.code, error.message);
    }

    setFetchStatus(true);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (data === null) {
    return <Loading />;
  }

  return (
    <div className="bg-slate-200 px-4 pt-4 text-slate-800 sm:px-8 sm:pt-8">
      <div className="m-auto min-h-screen w-full max-w-[90rem] rounded-tl-md rounded-tr-md bg-white p-4 shadow-md md:p-6">
        <h2 className="mb-6 mt-3 text-center text-2xl font-medium md:mb-8">
          {bookId ? "Edit book" : "Add new book"}
        </h2>
        <form className="m-auto max-w-[35rem] text-sm" onSubmit={handleSubmit}>
          <label htmlFor="title" className="mb-2 block font-bold">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={input.title}
            className="mb-5 block w-full rounded-md border border-slate-300 bg-slate-50 px-2 py-2 md:mb-7"
            required
            onChange={handleChange}
          />
          <label htmlFor="author" className="mb-2 block font-bold">
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            value={input.author}
            className="mb-5 block w-full rounded-md border border-slate-300 bg-slate-50 px-2 py-2 md:mb-7 "
            required
            onChange={handleChange}
          />
          <label htmlFor="year" className="mb-2 block font-bold">
            Year
          </label>
          <input
            type="number"
            name="year"
            id="year"
            value={input.year}
            maxLength={4}
            className="mb-5 block w-full rounded-md border border-slate-300 bg-slate-50 px-2 py-2 md:mb-7 lg:col-start-2 lg:col-end-4"
            required
            onChange={handleChange}
          />
          <label htmlFor="totalPages" className="mb-2 block font-bold">
            Total Pages
          </label>
          <input
            type="number"
            name="totalPages"
            id="totalPages"
            min="0"
            value={input.totalPages}
            className="mb-5 block w-full rounded-md border border-slate-300 bg-slate-50 px-2 py-2 md:mb-7 lg:col-start-2 lg:col-end-4"
            required
            onChange={handleChange}
          />
          <label htmlFor="currentPage" className="mb-2 block font-bold">
            Current Page
          </label>
          <input
            type="number"
            name="currentPage"
            id="currentPage"
            min="0"
            max={input.totalPages}
            value={input.currentPage}
            className="mb-5 block w-full rounded-md border border-slate-300 bg-slate-50 px-2 py-2 md:mb-7 lg:col-start-2 lg:col-end-4"
            required
            onChange={handleChange}
          />
          <div className="mt-8 grid grid-cols-3 gap-4 md:mt-12">
            <button
              className="rounded-md border border-blue-500 py-2 tracking-wide text-blue-500 transition duration-300 hover:border-blue-700 hover:text-blue-700 md:col-start-2"
              onClick={handleCancel}
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
  );
};

export default Form;
