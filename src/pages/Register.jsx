import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { auth } from "../configs/firebase-config";
import Swal from "sweetalert2";

const Register = () => {
  const [input, setInput] = useState({
    name: "",
    photo_url: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setInput({ ...input, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, input.email, input.password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: input.name,
          photoURL: input.photo_url,
        });

        Swal.fire({
          text: "You have successfully registered",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/login");
      })
      .catch((error) => {
        if (error.code == "auth/email-already-in-use") {
          Swal.fire({
            text: "The email address is already in use",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
          return;
        }

        console.log("Error occured: ", error.code, error.message);
      });
  };

  return (
    <>
      <h1 className="mb-5 text-center text-4xl">Register</h1>
      <form className="text-sm" onSubmit={handleRegister}>
        <label htmlFor="name" className="mb-2 inline-block w-full font-bold">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          value={input.name}
          className="mb-4 inline-block w-full rounded-md border border-slate-300 px-2.5 py-2 placeholder:font-light"
          onChange={handleChange}
          required
        />
        <label
          htmlFor="photo_url"
          className="mb-2 inline-block w-full font-bold"
        >
          Photo Url
        </label>
        <input
          type="text"
          name="photo_url"
          id="photo_url"
          placeholder="Photo Url"
          value={input.photo_url}
          className="mb-4 inline-block w-full rounded-md border border-slate-300 px-2.5 py-2 placeholder:font-light"
          onChange={handleChange}
        />
        <label htmlFor="email" className="mb-2 inline-block w-full font-bold">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={input.email}
          className="mb-4 inline-block w-full rounded-md border border-slate-300 px-2.5 py-2 placeholder:font-light"
          onChange={handleChange}
          required
        />
        <div className="relative inline-block w-full">
          <label
            htmlFor="password"
            className="mb-2 inline-block w-full font-bold"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            value={input.password}
            minLength="6"
            className="mb-4 inline-block w-full rounded-md border border-slate-300 px-2.5 py-2 placeholder:font-light"
            onChange={handleChange}
            required
          />
          <span
            className="cursor-pointer"
            onClick={() => setShowPassword((showPassword) => !showPassword)}
          >
            {showPassword ? (
              <GoEye className="absolute right-[10px] top-[38px] text-lg" />
            ) : (
              <GoEyeClosed className="absolute right-[10px] top-[38px] text-lg" />
            )}
          </span>
        </div>

        <button
          type="submit"
          className="mb-6 inline-block w-full rounded-md bg-blue-600 py-2 tracking-wide text-white transition duration-300 hover:bg-blue-800"
        >
          Register
        </button>

        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="inline-block text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </>
  );
};

export default Register;
