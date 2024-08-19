import { useSelector } from "react-redux";

const SelectField = ({ label, options, className, children, ...props }) => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  return (
    <div className="flex flex-col w-full ">
      <label
        htmlFor={name}
        className={`${darkMode ? "text-white" : "text-black"} font-bold mb-1`}
      >
        {label}
      </label>
      <select
        className={`block w-full px-3 py-2 border-2 rounded-md outline-none
      border-[#B81D33] ${darkMode ? "bg-gray-800" : "bg-white"} ${className}`}
        {...props}
      >
        {children ? (
          children
        ) : (
          <><option value="">Select</option>
            {options.map((opt, index) => (
              <option key={index} value={opt}>
                {opt}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};

export default SelectField;
