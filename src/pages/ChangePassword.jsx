import { updatePassword } from "firebase/auth";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const [input, setInput] = useState({
    new_password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmPassword = input.confirm_password;
    const newPassword = input.new_password;

    if (newPassword === confirmPassword) {
      await updatePassword(currentUser, newPassword)
        .then(() => {
          Swal.fire({
            text: "Your password has been successfully changed.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });

          navigate("/");
        })
        .catch((error) => {
          console.log("Error occured: ", error.code, error.message);
        });
    } else {
      Swal.fire({
        text: "New password and confirm password do not match.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div className="bg-slate-200 px-4 pt-4 text-slate-800 sm:px-8 sm:pt-8">
      <div className="m-auto min-h-screen w-full max-w-[90rem] rounded-tl-md rounded-tr-md bg-white p-4 shadow-md md:p-6">
        <h2 className="mb-6 mt-3 text-center text-2xl font-medium md:mb-8">
          Change Password
        </h2>
        <form className="m-auto max-w-md text-sm" onSubmit={handleSubmit}>
          <div className="relative inline-block w-full">
            <label htmlFor="new_password" className="mb-2 block font-bold">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="new_password"
              id="new_password"
              minLength="6"
              value={input.new_password}
              className="mb-5 block w-full rounded-md border border-slate-300 bg-slate-50 px-2 py-2 md:mb-7 "
              required
              onChange={handleChange}
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

          <div className="relative inline-block w-full">
            <label htmlFor="confirm_password" className="mb-2 block font-bold">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              id="confirm_password"
              minLength="6"
              value={input.confirm_password}
              className="mb-5 block w-full rounded-md border border-slate-300 bg-slate-50 px-2 py-2 md:mb-7 "
              required
              onChange={handleChange}
            />
            <span
              className="cursor-pointer"
              onClick={() =>
                setShowConfirmPassword(
                  (showConfirmPassword) => !showConfirmPassword
                )
              }
            >
              {showConfirmPassword ? (
                <GoEye className="absolute right-[10px] top-[38px] text-lg" />
              ) : (
                <GoEyeClosed className="absolute right-[10px] top-[38px] text-lg" />
              )}
            </span>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 md:mt-12">
            <button className="rounded-md border border-blue-500 py-2 tracking-wide text-blue-500 transition duration-300 hover:border-blue-700 hover:text-blue-700 md:col-start-2">
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

export default ChangePassword;
