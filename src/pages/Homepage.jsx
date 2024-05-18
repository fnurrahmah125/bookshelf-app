import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link, useNavigate } from "react-router-dom";
import { GoSearch, GoPlus } from "react-icons/go";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../configs/firebase-config";
import Loading from "../components/Loading";
import Filter from "../components/Filter";
import Table from "../components/Table";
import Swal from "sweetalert2";

const Homepage = () => {
  const { data, setFetchStatus } = useContext(GlobalContext);
  const [filteredData, setFilteredData] = useState(data);
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [key, setKey] = useState("name");

  const navigate = useNavigate();

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    if (data === null) {
      return;
    }

    const sortedData = [...data].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });

    setFilteredData(sortedData);
  }, [sortOrder]);

  const handleFilter = (e) => {
    let value = e.target.value;
    let filtered = null;

    if (value === "finished") {
      filtered = data.filter((item) => item.isFinished);
    } else if (value === "unfinished") {
      filtered = data.filter((item) => !item.isFinished);
    } else {
      filtered = data;
    }

    setFilteredData(filtered);
    setCategory(value);
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    let filtered = data.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
    setCategory("all");
  };

  const handleEdit = (id) => {
    navigate(`/edit-book/${id}`);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this book?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(37 99 235)",
      cancelButtonColor: "rgb(220 38 38)",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "bookshelf", id));
          let filtered = data.filter((item) => item.id !== id);
          setFilteredData(filtered);
          setFetchStatus(true);
        } catch (error) {
          console.log("Error occured: ", error.code, error.message);
        }
      }
    });
  };

  const handleSortBy = (e) => {
    const key = e.target.value;
    setKey(key);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setCategory("all");
  };

  if (filteredData === null) {
    return <Loading />;
  }

  return (
    <div className="bg-slate-200 px-4 text-slate-800 sm:px-8">
      <div className="m-auto w-full max-w-[90rem]">
        <Filter onHandleFilter={handleFilter} category={category} />

        <div className="min-h-screen rounded-tl-md rounded-tr-md bg-white p-4 shadow-md md:p-6">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:justify-between lg:mb-12">
            <div className="flex items-center rounded-lg border border-slate-300 px-4 py-2">
              <GoSearch className="mr-2 inline-block text-lg text-slate-400" />
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search books"
                className="md:w-70 w-40 text-sm font-light placeholder:text-slate-400 focus:outline-none sm:w-56 md:text-base lg:w-96"
                onChange={handleSearch}
              />
            </div>
            <Link to="/add-book">
              <button className="rounded-md bg-blue-600 py-1 pl-2 pr-3 text-white shadow-md transition duration-300 hover:bg-blue-800 md:pr-4">
                <GoPlus className="inline-block text-2xl md:text-3xl" />
                <span className="text-sm md:text-base">Add new book</span>
              </button>
            </Link>
          </div>

          <div className="overflow-x-auto">
            {filteredData && (
              <Table
                data={filteredData}
                onHandleEdit={handleEdit}
                onHandleDelete={handleDelete}
                onHandleSortBy={handleSortBy}
                sortOrder={sortOrder}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
