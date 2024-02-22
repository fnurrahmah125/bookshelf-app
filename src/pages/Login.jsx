import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configs/firebase-config";
import { GoEyeClosed, GoEye } from "react-icons/go";
import FormWrapper from "../components/FormWrapper";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validation, setValidation] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      const errororCode = error.code;
      const errorMessage = error.message;

      if (errororCode == "auth/invalid-credential") {
        setValidation("The username or password you entered is incorrect");
        return;
      }

      console.log("Error occured: ", errororCode, errorMessage);
    }
  };

  return (
    <FormWrapper>
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
          className="mb-4 inline-block w-full rounded-md border border-slate-300 px-4 py-2 placeholder:font-light"
          onChange={(e) => setEmail(e.target.value)}
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
            minLength="6"
            className=" mb-4 inline-block w-full rounded-md border border-slate-300 px-4 py-2 placeholder:font-light"
            onChange={(e) => setPassword(e.target.value)}
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

        {validation && <p className="mt-4 text-red-600">{validation}</p>}

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
    </FormWrapper>
  );
};

export default Login;
