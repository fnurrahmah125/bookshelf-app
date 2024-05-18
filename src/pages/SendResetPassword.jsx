import { Link } from "react-router-dom";

const SendResetPassword = () => {
  return (
    <>
      <h1 className="mb-2 text-center text-xl font-bold">
        Email has been sent!
      </h1>
      <p className="mb-6 text-center text-sm font-light text-slate-400">
        Please check your inbox and click in the received link to reset a
        password
      </p>
      <div className="text-sm">
        <Link to="/login">
          <button
            type="button"
            className="inline-block w-full rounded-md bg-blue-600 py-2 tracking-wide text-white transition duration-300 hover:bg-blue-800"
          >
            Login
          </button>
        </Link>
        <p className="mt-4 text-center">
          Didn&apos;t receive the link?{" "}
          <Link to="/reset-password" className="text-blue-600 ">
            Resend
          </Link>
        </p>
      </div>
    </>
  );
};

export default SendResetPassword;
