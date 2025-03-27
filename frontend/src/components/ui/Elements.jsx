import { cn } from "../../utils/cn";

export function Card({ className, children }) {
  return (
    <div className={cn("bg-white shadow-lg rounded-2xl p-4", className)}>
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}

export function Button({ className, children, ...props }) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Input({ className, ...props }) {
  return (
    <input
      className={cn(
        "w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500",
        className
      )}
      {...props}
    />
  );
}

export function Tabs({ value, onValueChange, children }) {
  return <div className="flex gap-2 border-b pb-2">{children}</div>;
}

export function Tab({ value, label, onClick }) {
  return (
    <button
      className={cn(
        "px-4 py-2 text-gray-700 border-b-2",
        value ? "border-blue-500 text-blue-500" : "border-transparent"
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
