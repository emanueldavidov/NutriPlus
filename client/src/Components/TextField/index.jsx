import { useSelector } from "react-redux";

const TextField = ({ label, ...props }) => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <div className="flex flex-col w-full">
      <label
        className={`${darkMode ? "text-white" : "text-black"} font-bold mb-1`}
      >
        {label}
      </label>
      <input
        {...props}
        className={`w-full block border-2 rounded-md px-3 py-2  ${
          darkMode ? "text-white" : "text-black"
        } ${
          darkMode ? "bg-gray-800" : "bg-white"
        } border-[#B81D33] focus:border-[#B81D33] hover:border-[#B81D33]`}
      />
    </div>
  );
};

export default TextField;
