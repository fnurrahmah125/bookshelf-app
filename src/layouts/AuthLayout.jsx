const AuthLayout = ({ children }) => {
  return (
    <div className="grid min-h-screen place-items-center bg-gradient-to-tl from-blue-300 to-blue-100 px-4 text-slate-800">
      <div className="max-w-sm">
        <div className=" rounded-md bg-white p-6 shadow-lg">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
