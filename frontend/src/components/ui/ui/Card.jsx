import { cn } from "../../../utils/cn";

export const Card = ({ className, children }) => (
  <div className={cn("bg-white shadow-lg rounded-xl p-6", className)}>{children}</div>
);

export const CardHeader = ({ className, children }) => (
  <div className={cn("text-center mb-4", className)}>{children}</div>
);

export const CardContent = ({ className, children }) => (
  <div className={cn("p-4", className)}>{children}</div>
);
