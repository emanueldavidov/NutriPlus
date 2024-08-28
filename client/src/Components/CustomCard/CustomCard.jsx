// CustomCard Component: Custom card component to display various types of content in a card layout.
// 
// Key Features:
// - Accepts children props to render dynamic content inside the card.
// - Designed with Tailwind CSS for consistent spacing and layout.
// - Can be extended to support different themes or modes (e.g., dark mode).


export default function CustomCard({ title, text, children, color,wrapperClasses }) {
  return (
    <div className={`flex flex-col items-center justify-center border rounded-2xl w-72 ${wrapperClasses}`}>
      <div className="flex flex-col items-center justify-center w-72 p-4">
        <h4 className="text-2xl">{title}</h4>
        <p className={`text-center ${color}`}>{text}</p>
        {children}
      </div>
      <div className="card-actions"></div>
    </div>
  );
}
