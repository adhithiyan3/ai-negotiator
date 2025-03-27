import { cn } from "../../../utils/cn";

export const Input = ({ className, ...props }) => (
  <input
    className={cn(
      "w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
      className
    )}
    {...props}
  />
);
