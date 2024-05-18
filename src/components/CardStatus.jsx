import { GoBook } from "react-icons/go";

const CardStatus = ({ children, bakcground }) => {
  return (
    <div
      className={`flex gap-4 rounded-md bg-gradient-to-br ${bakcground} p-6`}
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/35">
        <GoBook className="inline-block text-3xl text-white" />
      </span>
      <div className="text-white">{children}</div>
    </div>
  );
};

export default CardStatus;
