import { useSelector } from "react-redux";

// SelectField Component: A reusable select dropdown component with support for dark mode styling.
//
// Key Features:
// - Displays a label and a dropdown list of options.
// - Supports dark mode by adapting the text and background colors.
// - Allows for custom classes and additional props to be passed to the select element.

const SelectField = ({ label, options, className, children, ...props }) => {
  // useSelector hook retrieves the dark mode setting from the Redux store.
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <div className="flex flex-col w-full">
      {/* Label for the select field, with styling based on dark mode */}
      <label
        htmlFor={name}
        className={`${darkMode ? "text-white" : "text-black"} font-bold mb-1`}
      >
        {label}
      </label>

      {/* Select dropdown element */}
      <select
        className={`block w-full px-3 py-2 border-2 rounded-md outline-none
      border-[#B81D33] ${darkMode ? "bg-gray-800" : "bg-white"} ${className}`}
        {...props}
      >
        {/* Renders either custom children passed to the component or default options */}
        {children ? (
          children
        ) : (
          <>
            <option value="">Select</option>
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
