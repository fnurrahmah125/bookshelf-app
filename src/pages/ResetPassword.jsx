import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../configs/firebase-config";
import { Link, useNavigate } from "react-router-dom";
import FormWrapper from "../components/FormWrapper";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        navigate("/reset-password/sent");
      })
      .catch((error) => {
        const errororCode = error.code;
        const errorMessage = error.message;
        console.log("Error occured: ", errororCode, errorMessage);
      });
  };

  return (
    <FormWrapper>
      <h1 className="mb-2 text-center text-xl font-bold">
        Forgot your password?
      </h1>
      <p className="mb-6 text-center text-sm font-light text-slate-400">
        Enter your registered email below to receive password reset instruction
      </p>
      <form className="text-sm" onSubmit={handleReset}>
        <label htmlFor="email" className="mb-2 inline-block w-full font-bold">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="mb-6 inline-block w-full rounded-md border border-slate-300 px-4 py-2 placeholder:font-light"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <p className="mb-4 text-center">
          Remember password?{" "}
          <Link to="/login" className="text-blue-600 ">
            Login
          </Link>
        </p>

        <button
          type="submit"
          className="inline-block w-full rounded-md bg-blue-600 py-2 tracking-wide text-white transition duration-300 hover:bg-blue-800"
        >
          Send
        </button>
      </form>
    </FormWrapper>
  );
};

export default ResetPassword;
