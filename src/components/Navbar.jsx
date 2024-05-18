import { signOut } from "firebase/auth";
import { useContext, useState } from "react";
import { GoX, GoPerson, GoSignOut, GoHome, GoKey } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../configs/firebase-config";
import { AuthContext } from "../context/AuthContext";
import Loading from "../components/Loading";
import photoProfile from "../assets/profile.png";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [display, setDisplay] = useState("hide");

  const navigate = useNavigate();

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(37 99 235)",
      cancelButtonColor: "rgb(220 38 38)",
      confirmButtonText: "Yes, I want to log out!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await signOut(auth);
          Cookies.remove("token");
          navigate("/login");
        } catch (error) {
          console.log("Error occured: ", error.code, error.message);
        }
      }
    });
  };

  if (currentUser === null) {
    return <Loading />;
  }

  return (
    <div className="relative w-full bg-white px-4 py-4 shadow-md sm:px-8">
      <div className="m-auto flex max-w-[90rem] items-center justify-between">
        <Link to="/">
          <h1 className="text-2xl font-medium">Bookshelf App</h1>
        </Link>
        <div className="flex items-center">
          <img
            src={currentUser.photoURL ? currentUser.photoURL : photoProfile}
            alt="profile"
            className="h-10 w-10 cursor-pointer rounded-full object-cover md:h-12 md:w-12"
            onClick={() => setDisplay("show")}
          />
        </div>
        <div
          className={`fixed -bottom-0 left-0 right-0 top-0 z-50 h-screen bg-slate-700/50 ${display}`}
          onClick={() => setDisplay("hide")}
        ></div>
        <div
          className={`fixed right-0 top-0 z-50 ml-auto h-screen w-80 rounded-bl-xl rounded-tl-xl bg-white p-6 drop-shadow-md duration-300 ease-in ${display}`}
        >
          <div className="mb-4 flex items-center justify-between border-b border-slate-300 pb-4">
            <div className="flex items-center gap-2">
              <img
                src={currentUser.photoURL ? currentUser.photoURL : photoProfile}
                alt="profile image"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="font-medium">
                {currentUser && currentUser.displayName}
              </div>
            </div>
            <button>
              <GoX
                className="text-3xl text-slate-400 duration-300 hover:text-slate-500"
                onClick={() => setDisplay("hide")}
              />
            </button>
          </div>
          <ul>
            <li className="mb-3">
              <Link
                to="/"
                className="item flex w-full gap-2 rounded-md px-3 py-2 hover:bg-blue-600 hover:text-white"
                onClick={() => setDisplay("hide")}
              >
                <GoHome className="text-xl" />
                <span>Home</span>
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="/profile"
                className="item flex w-full gap-2 rounded-md px-3 py-2 hover:bg-blue-600 hover:text-white"
                onClick={() => setDisplay("hide")}
              >
                <GoPerson className="text-xl" />
                <span>Profile</span>
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="/change-password"
                className="item flex w-full gap-2 rounded-md px-3 py-2 hover:bg-blue-600 hover:text-white"
                onClick={() => setDisplay("hide")}
              >
                <GoKey className="text-xl" />
                <span>Change Password</span>
              </Link>
            </li>
            <li className="">
              <Link
                onClick={handleLogout}
                className="item flex w-full gap-2 rounded-md px-3 py-2 hover:bg-blue-600 hover:text-white"
              >
                <GoSignOut className="text-xl" />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
