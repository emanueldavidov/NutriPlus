import { useSelector } from "react-redux";

// TextField Component: A reusable input field component with support for dark mode styling.
//
// Key Features:
// - Displays a labeled input field with adaptive styling for dark mode.
// - Provides a flexible and reusable text input for forms.
// - Integrates with Redux to apply the current dark mode theme.

const TextField = ({ label, ...props }) => {
  // Retrieves the dark mode setting from the Redux store.
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <div className="flex flex-col w-full">
      {/* Label for the text field, styled according to the current theme */}
      <label
        className={`${darkMode ? "text-white" : "text-black"} font-bold mb-1`}
      >
        {label}
      </label>

      {/* Input field, with styles that adapt to dark mode and other props spread onto it */}
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
