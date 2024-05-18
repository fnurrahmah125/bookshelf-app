import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { auth } from "../configs/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const Login = () => {
  const [input, setInput] = useState({
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

  const handleLogin = async (e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, input.email, input.password)
      .then((res) => {
        const user = res.user;
        Cookies.set("token", user.refreshToken);

        Swal.fire({
          text: "You have successfully logged in",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/");
      })
      .catch((error) => {
        if (error.code == "auth/invalid-credential") {
          Swal.fire({
            text: "The username or password you entered is incorrect",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
          return;
        }
        console.log("Error occured: ", error.code, error.message);
      });
  };

  return (
    <>
      <h1 className="mb-5 text-center text-4xl">Login</h1>
      <form className="text-sm" onSubmit={handleLogin}>
        <label htmlFor="email" className="mb-2 inline-block w-full font-bold">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={input.email}
          className="mb-4 inline-block w-full rounded-md border border-slate-300 px-4 py-2 placeholder:font-light"
          onChange={handleChange}
          required
        />

        <div className="relative inline-block w-full">
          <label
            htmlFor="password"
            className="mb-2 inline-block w-full font-bold"
          >
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            value={input.password}
            minLength="6"
            className=" mb-4 inline-block w-full rounded-md border border-slate-300 px-4 py-2 placeholder:font-light"
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

        <p className="text-right">
          <Link to="/reset-password" className="text-blue-600">
            Forgot password?
          </Link>
        </p>

        <button
          type="submit"
          className="mb-6 mt-4 inline-block w-full rounded-md bg-blue-600 py-2 tracking-wide text-white transition duration-300 hover:bg-blue-800"
        >
          Login
        </button>

        <p className="text-center">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="inline-block text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </>
  );
};

export default Login;
