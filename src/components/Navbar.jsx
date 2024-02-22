import { auth } from "../configs/firebase-config";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { GoX, GoPerson, GoSignOut, GoHome } from "react-icons/go";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.value);
  const [display, setDisplay] = useState("translate-x-full");

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="relative w-full bg-white px-4 py-4 shadow-md sm:px-8">
      <div className="m-auto flex max-w-[90rem] items-center justify-between">
        <h1 className="text-2xl font-medium">Bookshelf App</h1>
        <div className="flex items-center">
          <img
            src="../profile.jpg"
            alt="profile image"
            className="h-10 w-10 cursor-pointer rounded-full md:h-12 md:w-12"
            onClick={() => setDisplay("translate-x-0")}
          />
        </div>

        <div
          className={`fixed -bottom-0 left-0 right-0 top-0 z-50 h-screen bg-slate-700/50 ${display}`}
          onClick={() => setDisplay("translate-x-full")}
        ></div>

        <div
          className={`fixed right-0 top-0 z-50 ml-auto h-screen w-80 rounded-bl-xl rounded-tl-xl bg-white p-6 drop-shadow-md duration-300 ease-in ${display}`}
        >
          <div className="mb-4 flex items-center justify-between border-b border-slate-300 pb-4">
            <div className="flex items-center gap-2">
              <img
                src="../profile.jpg"
                alt="profile image"
                className="h-10 w-10 rounded-full"
              />
              <div>{user.displayName}</div>
            </div>
            <button>
              <GoX
                className="text-3xl text-slate-400 duration-300 hover:text-slate-500"
                onClick={() => setDisplay("translate-x-full")}
              />
            </button>
          </div>
          <ul>
            <li className="mb-3">
              <Link
                to="/home"
                className="item flex w-full gap-2 rounded-md px-3 py-2 hover:bg-blue-600 hover:text-white "
              >
                <GoHome className="text-xl" />
                <span>Home</span>
              </Link>
            </li>
            <li className="mb-3">
              <Link
                to="/profile"
                className="item flex w-full gap-2 rounded-md px-3 py-2 hover:bg-blue-600 hover:text-white"
              >
                <GoPerson className="text-xl" />
                <span>Profile</span>
              </Link>
            </li>
            <li className="">
              <Link
                to="/login"
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
