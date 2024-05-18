import { useContext, useState } from "react";
import { MdEdit } from "react-icons/md";
import { updateProfile } from "firebase/auth";
import { auth } from "../configs/firebase-config";
import { AuthContext } from "../context/AuthContext";
import Loading from "./Loading";
import photoProfile from "../assets/profile.png";
import Swal from "sweetalert2";

const CardUser = () => {
  const { currentUser } = useContext(AuthContext);

  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState({
    display_name: currentUser.displayName,
    photo_url: currentUser.photoURL || "",
  });

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setInput({ ...input, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await updateProfile(auth.currentUser, {
      displayName: input.display_name,
      photoURL: input.photo_url,
    })
      .then(() => {
        Swal.fire({
          text: "Your profile has been updated successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) =>
        console.log("Error occured: ", error.code, error.message)
      )
      .finally(() => setEdit(false));
  };

  if (currentUser === null) {
    return <Loading />;
  }

  return (
    <div className="mb-12 text-center">
      <button className="relative group" onClick={() => setEdit(true)}>
        <img
          src={currentUser.photoURL ? currentUser.photoURL : photoProfile}
          alt="profile image"
          className="mx-auto mb-2 w-32 h-32 object-cover rounded-full bg-white"
        />

        <div className="bg-[rgba(0,0,0,0.5)] w-32 h-32 absolute inset-0 rounded-full justify-center items-center hidden group-hover:flex">
          <MdEdit className="text-3xl text-[rgba(255,255,255,0.9)]" />
        </div>
      </button>
      <p className="mb-1 text-2xl font-medium">
        Hi, {currentUser.displayName}!
      </p>
      <p className="font-light text-slate-500">{currentUser.email}</p>

      {edit && (
        <div className="mt-10">
          <form
            onSubmit={handleUpdate}
            className="max-w-96 mx-auto text-left text-sm"
          >
            <div>
              <label
                htmlFor="display_name"
                className="inline-block mb-2 font-bold"
              >
                Name:
              </label>
              <input
                type="text"
                id="display_name"
                name="display_name"
                value={input.display_name}
                className="inline-block w-full rounded-md border border-slate-300 px-4 py-2 mb-4 placeholder:font-light"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="photo_url"
                className="inline-block mb-2 font-bold"
              >
                Photo URL:
              </label>
              <input
                type="text"
                id="photo_url"
                name="photo_url"
                value={input.photo_url}
                className="inline-block w-full rounded-md border border-slate-300 px-4 py-2 mb-4 placeholder:font-light"
                onChange={handleChange}
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="px-2 py-1 rounded-md bg-neutral-200 hover:bg-neutral-300 border border-neutral-400 mr-2"
              >
                Save Changes
              </button>
              <button
                className="px-2 py-1 rounded-md hover:text-neutral-600"
                onClick={() => setEdit(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CardUser;
