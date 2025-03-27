import { cn } from "../../../utils/cn";

export const Button = ({ className, disabled, ...props }) => (
  <button
    className={cn(
      "bg-blue-500 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200",
      disabled && "opacity-50 cursor-not-allowed",
      className
    )}
    disabled={disabled}
    {...props}
  />
);
